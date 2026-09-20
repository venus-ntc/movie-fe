"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { readApiError, getAccessToken, type Profile } from "@/lib/api";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import { useToast } from "@/components/Toast";
import { FlameIcon } from "@/components/icons";

const fieldClass =
  "w-full rounded-xl border border-[#e0ddd3] bg-white px-4 py-3 text-[15px] text-[#1b1b19] outline-none transition-colors placeholder:text-[#b0aea6] focus:border-[#1b1b19] focus:ring-2 focus:ring-[#1b1b19]/10";

function initialOf(p?: Profile): string {
  const src = p?.full_name?.trim() || p?.email?.trim() || "";
  return src ? src[0].toUpperCase() : "U";
}

function Avatar({ profile, size = 72 }: { profile?: Profile; size?: number }) {
  const pic = profile?.profile_picture;
  if (pic && /^https?:\/\//.test(pic)) {
    return (
      <img
        src={pic}
        alt={profile?.full_name ?? "Avatar"}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full font-semibold text-[#f7f6f1]"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        backgroundImage: "linear-gradient(135deg, #7a9e7e 0%, #b5764a 100%)",
      }}
    >
      {initialOf(profile)}
    </span>
  );
}

function StatCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#e8e6df] bg-white px-4 py-4 text-center">
      <p className="text-2xl font-bold tracking-tight text-[#1b1b19]">{value}</p>
      <p className="mt-1 text-xs font-medium text-[#6b6b66]">{label}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
      <span className="text-sm text-[#6b6b66]">{label}</span>
      <span className="text-right text-sm font-medium text-[#1b1b19]">
        {value || <span className="font-normal text-[#b0aea6]">Chưa cập nhật</span>}
      </span>
    </div>
  );
}

function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

export default function ProfilePage() {
  const router = useRouter();
  const toast = useToast();
  const [mounted, setMounted] = useState(false);
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [picture, setPicture] = useState("");

  const { data: profile, isLoading, isError } = useProfile();
  const updateMutation = useUpdateProfile();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted && (!getAccessToken() || isError)) {
      router.replace("/login");
    }
  }, [mounted, isError, router]);

  function startEdit() {
    setFullName(profile?.full_name ?? "");
    setPhone(profile?.phone_number ?? "");
    setPicture(profile?.profile_picture ?? "");
    setEditing(true);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    updateMutation.mutate(
      {
        full_name: fullName.trim(),
        phone_number: phone.trim(),
        profile_picture: picture.trim(),
      },
      {
        onSuccess: () => {
          setEditing(false);
          toast.success("Đã cập nhật hồ sơ", "Thông tin của bạn đã được lưu.");
        },
        onError: (err) => toast.error("Cập nhật thất bại", readApiError(err)),
      }
    );
  }

  if (!mounted || isLoading || !profile) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="h-40 animate-pulse rounded-3xl border border-[#e8e6df] bg-white" />
      </div>
    );
  }

  return (
    <div
      className="mx-auto max-w-3xl px-4 py-10"
      style={{ fontFamily: "var(--font-be-vietnam), system-ui, sans-serif" }}
    >
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-[#1b1b19]">
        Thông tin cá nhân
      </h1>

      <div className="rounded-3xl border border-[#e8e6df] bg-white p-6 sm:p-7">
        {!editing ? (
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar profile={profile} />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-semibold text-[#1b1b19]">
                    {profile.full_name || "Người dùng"}
                  </h2>
                  {profile.is_verified && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#cfe0d2] bg-[#eef4ef] px-2.5 py-0.5 text-xs font-medium text-[#4a6b50]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Đã xác thực
                    </span>
                  )}
                </div>
                <p className="mt-0.5 truncate text-sm text-[#6b6b66]">
                  {profile.email}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={startEdit}
              className="shrink-0 self-start rounded-full border border-[#1b1b19] px-5 py-2.5 text-sm font-medium text-[#1b1b19] transition-colors hover:bg-[#1b1b19] hover:text-[#f7f6f1] sm:self-auto"
            >
              Chỉnh sửa
            </button>
          </div>
        ) : (
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Avatar
                profile={{ ...profile, profile_picture: picture, full_name: fullName }}
              />
              <p className="text-sm text-[#6b6b66]">
                Ảnh đại diện lấy theo đường dẫn (URL) bên dưới.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="fullName" className="text-sm font-medium text-[#1b1b19]">
                Họ và tên
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-sm font-medium text-[#1b1b19]">
                Số điện thoại
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09xx xxx xxx"
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="picture" className="text-sm font-medium text-[#1b1b19]">
                Ảnh đại diện (URL)
              </label>
              <input
                id="picture"
                type="url"
                value={picture}
                onChange={(e) => setPicture(e.target.value)}
                placeholder="https://..."
                className={fieldClass}
              />
            </div>

            <div className="mt-2 flex gap-3">
              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="rounded-full bg-[#1b1b19] px-6 py-3 text-sm font-medium text-[#f7f6f1] transition-all hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {updateMutation.isPending ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                disabled={updateMutation.isPending}
                className="rounded-full px-6 py-3 text-sm font-medium text-[#6b6b66] transition-colors hover:text-[#1b1b19] disabled:opacity-60"
              >
                Huỷ
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Cấp độ" value={profile.level ?? 1} />
        <StatCard label="Điểm kinh nghiệm" value={profile.xp ?? 0} />
        <StatCard
          label="Chuỗi hiện tại"
          value={
            <span className="inline-flex items-center justify-center gap-1.5">
              {profile.current_streak ?? 0}
              <FlameIcon size={22} strokeWidth={1.7} className="text-[#b5764a]" />
            </span>
          }
        />
        <StatCard label="Chuỗi dài nhất" value={profile.longest_streak ?? 0} />
      </div>

      <div className="mt-5 overflow-hidden rounded-3xl border border-[#e8e6df] bg-white">
        <div className="border-b border-[#efece4] px-5 py-3.5">
          <h3 className="text-sm font-semibold text-[#1b1b19]">Chi tiết</h3>
        </div>
        <div className="divide-y divide-[#efece4]">
          <InfoRow label="Email" value={profile.email} />
          <InfoRow label="Số điện thoại" value={profile.phone_number} />
          <InfoRow label="Tham gia từ" value={formatDate(profile.created_at)} />
        </div>
      </div>
    </div>
  );
}
