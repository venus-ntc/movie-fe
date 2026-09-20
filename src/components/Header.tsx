"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Logo } from "@/components/Logo";
import { useProfile } from "@/hooks/useProfile";
import { clearTokens, getAccessToken, type Profile } from "@/lib/api";

const NAV = [
  { href: "/", label: "Trang chủ" },
  { href: "/movies", label: "Phim" },
  { href: "/theaters", label: "Rạp" },
  { href: "/tickets", label: "Vé" },
  { href: "/about", label: "Về chúng tôi" },
];

function initialOf(profile?: Profile): string {
  const src = profile?.full_name?.trim() || profile?.email?.trim() || "";
  return src ? src[0].toUpperCase() : "U";
}

function Avatar({ profile, size = 36 }: { profile?: Profile; size?: number }) {
  const pic = profile?.profile_picture;
  if (pic && /^https?:\/\//.test(pic)) {
    return (
      <img
        src={pic}
        alt={profile?.full_name ?? "Avatar"}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="flex items-center justify-center rounded-full text-[15px] font-semibold text-[#f7f6f1]"
      style={{
        width: size,
        height: size,
        backgroundImage: "linear-gradient(135deg, #7a9e7e 0%, #b5764a 100%)",
      }}
    >
      {initialOf(profile)}
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { data: profile, isError } = useProfile();
  const loggedIn = mounted && !!getAccessToken() && !isError;

  useEffect(() => {
    setOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  function handleLogout() {
    clearTokens();
    queryClient.removeQueries({ queryKey: ["profile"] });
    setOpen(false);
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header
      className="sticky top-0 z-50 border-b border-[#e8e6df] bg-[#f7f6f1]/80 backdrop-blur-md"
      style={{ fontFamily: "var(--font-be-vietnam), system-ui, sans-serif" }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" onClick={() => setOpen(false)}>
          <Logo size={32} />
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  active
                    ? "bg-[#1b1b19]/[0.06] font-medium text-[#1b1b19]"
                    : "text-[#6b6b66] hover:text-[#1b1b19]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {!mounted ? (
            <span className="h-9 w-9" aria-hidden />
          ) : loggedIn ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Tài khoản"
                aria-expanded={menuOpen}
                className="flex items-center gap-2 rounded-full p-0.5 transition-opacity hover:opacity-90"
              >
                <Avatar profile={profile} />
              </button>

              {menuOpen && (
                <>
                  <button
                    type="button"
                    aria-hidden
                    tabIndex={-1}
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 z-40 cursor-default"
                  />
                  <div className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-[#e8e6df] bg-white shadow-[0_18px_44px_-20px_rgba(27,27,25,0.3)]">
                    <div className="flex items-center gap-3 border-b border-[#efece4] px-4 py-3.5">
                      <Avatar profile={profile} size={40} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#1b1b19]">
                          {profile?.full_name || "Người dùng"}
                        </p>
                        <p className="truncate text-xs text-[#6b6b66]">
                          {profile?.email}
                        </p>
                      </div>
                    </div>
                    <div className="p-1.5">
                      <Link
                        href="/profile"
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm text-[#1b1b19] transition-colors hover:bg-[#f1f0ea]"
                      >
                        Thông tin cá nhân
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full rounded-xl px-3 py-2 text-left text-sm text-[#a8503a] transition-colors hover:bg-[#f8ece6]"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-medium text-[#6b6b66] transition-colors hover:text-[#1b1b19]"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-[#1b1b19] px-5 py-2 text-sm font-medium text-[#f7f6f1] transition-opacity hover:opacity-85"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label="Mở menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#1b1b19] transition-colors hover:bg-[#1b1b19]/[0.06] md:hidden"
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-5 bg-current transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-[#e8e6df] bg-[#f7f6f1] px-5 py-4 md:hidden">
          {mounted && loggedIn && (
            <div className="mb-3 flex items-center gap-3 rounded-xl bg-white px-4 py-3">
              <Avatar profile={profile} size={40} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#1b1b19]">
                  {profile?.full_name || "Người dùng"}
                </p>
                <p className="truncate text-xs text-[#6b6b66]">{profile?.email}</p>
              </div>
            </div>
          )}

          <nav className="flex flex-col gap-1">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-2.5 text-[15px] transition-colors ${
                    active
                      ? "bg-[#1b1b19]/[0.06] font-medium text-[#1b1b19]"
                      : "text-[#6b6b66] hover:text-[#1b1b19]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {mounted && loggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 rounded-xl px-4 py-2.5 text-left text-[15px] font-medium text-[#a8503a] transition-colors hover:bg-[#f8ece6]"
              >
                Đăng xuất
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-xl px-4 py-2.5 text-center text-[15px] font-medium text-[#6b6b66] transition-colors hover:text-[#1b1b19]"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-[#1b1b19] px-5 py-3 text-center text-[15px] font-medium text-[#f7f6f1]"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
