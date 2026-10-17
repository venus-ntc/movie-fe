"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCinemaById, getRoomsByCinema, Cinema, Room } from "@/lib/api";
import Link from "next/link";

export default function CinemaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const cinemaId = Number(resolvedParams.id);

  const { data: rawCinema, isLoading: isLoadingCinema } = useQuery({
    queryKey: ["public-cinema", cinemaId],
    queryFn: () => getCinemaById(cinemaId),
  });

  const { data: rawRooms, isLoading: isLoadingRooms } = useQuery({
    queryKey: ["public-rooms", cinemaId],
    queryFn: () => getRoomsByCinema(cinemaId),
  });

  const cinema: Cinema | undefined = (rawCinema as unknown as { data: Cinema })?.data ?? (rawCinema as Cinema);
  const rooms: Room[] = Array.isArray(rawRooms)
    ? rawRooms
    : (rawRooms as unknown as { data: Room[] })?.data ?? [];

  if (isLoadingCinema) {
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px", textAlign: "center", color: "#9ca3af" }}>
        Đang tải thông tin rạp chiếu...
      </div>
    );
  }

  if (!cinema) {
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px", textAlign: "center", color: "#ef4444" }}>
        <h2>Không tìm thấy rạp chiếu!</h2>
        <Link href="/cinemas" style={{ color: "#38bdf8", marginTop: "16px", display: "inline-block" }}>
          ← Quay lại danh sách rạp
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: "#0b0b0f", minHeight: "100vh", color: "#e4e4e7", padding: "40px 24px 80px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: "20px" }}>
          <Link href="/cinemas" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>
            ← Tất cả cụm rạp
          </Link>
        </div>

        {/* Header rạp */}
        <div style={{ background: "#121318", border: "1px solid #27272a", borderRadius: "16px", padding: "32px", marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <span style={{ fontSize: "12px", color: "#e50914", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>
                Cụm rạp CineBook
              </span>
              <h1 style={{ fontSize: "32px", fontWeight: "800", color: "#fff", margin: "8px 0 12px 0" }}>
                {cinema.name}
              </h1>
              <p style={{ color: "#a1a1aa", fontSize: "15px", margin: "0 0 8px 0" }}>
                📍 {cinema.address}
              </p>
              <p style={{ color: "#a1a1aa", fontSize: "14px", margin: 0 }}>
                📞 Hotline: <span style={{ color: "#38bdf8", fontWeight: "600" }}>{cinema.phone || "1900 xxxx"}</span>
              </p>
            </div>
            <span style={{ padding: "6px 16px", background: "rgba(229, 9, 20, 0.15)", color: "#f87171", border: "1px solid rgba(229, 9, 20, 0.3)", borderRadius: "20px", fontWeight: "600", fontSize: "14px" }}>
              {cinema.city}
            </span>
          </div>
        </div>

        {/* Danh sách phòng chiếu */}
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#fff", marginBottom: "16px" }}>
          Danh sách Phòng chiếu tại rạp ({rooms.length} phòng)
        </h2>

        {isLoadingRooms ? (
          <p style={{ color: "#71717a" }}>Đang tải danh sách phòng chiếu...</p>
        ) : rooms.length === 0 ? (
          <p style={{ color: "#71717a", background: "#121318", padding: "24px", borderRadius: "12px", border: "1px solid #27272a" }}>
            Rạp này chưa được cấu hình phòng chiếu.
          </p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginBottom: "40px" }}>
            {rooms.map((room) => (
              <div key={room.id} style={{ background: "#121318", border: "1px solid #27272a", borderRadius: "12px", padding: "20px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#fff", margin: "0 0 8px 0" }}>
                  🎬 {room.name}
                </h3>
                <p style={{ color: "#a1a1aa", fontSize: "14px", margin: 0 }}>
                  Sức chứa: <strong style={{ color: "#10b981" }}>{room.totalSeats ?? room.capacity} ghế</strong>
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Lịch chiếu phim */}
        <div style={{ background: "#121318", border: "1px solid #27272a", borderRadius: "16px", padding: "32px", textAlign: "center" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#fff", margin: "0 0 12px 0" }}>
            Lịch chiếu & Đặt vé
          </h3>
          <p style={{ color: "#a1a1aa", marginBottom: "20px", fontSize: "14px" }}>
            Vui lòng chọn suất chiếu từ danh sách phim đang công chiếu để tiến hành đặt vé.
          </p>
          <Link
            href="/movies"
            style={{ display: "inline-block", padding: "12px 28px", background: "#e50914", color: "#fff", textDecoration: "none", borderRadius: "8px", fontWeight: "700" }}
          >
            Xem danh sách Phim đang chiếu →
          </Link>
        </div>
      </div>
    </div>
  );
}