"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCinemas, Cinema, isAdmin } from "@/lib/api";
import Link from "next/link";

const CITIES = ["Tất cả", "Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Cần Thơ", "Hải Phòng"];

export default function PublicCinemasPage() {
  const [selectedCity, setSelectedCity] = useState("Tất cả");

  const { data: rawCinemas, isLoading, isError, error } = useQuery({
    queryKey: ["public-cinemas"],
    queryFn: getCinemas,
  });

  const cinemasList: Cinema[] = Array.isArray(rawCinemas)
    ? rawCinemas
    : (rawCinemas as unknown as { data: Cinema[] })?.data ?? [];

  const filteredCinemas = cinemasList.filter((c) => {
    if (selectedCity === "Tất cả") return true;
    return c.city === selectedCity;
  });

  return (
    <div style={{ background: "#0b0b0f", minHeight: "100vh", color: "#fff", padding: "40px 24px 80px 24px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Banner Title & Nút Admin Quản Lý */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "36px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontSize: "36px", fontWeight: "900", margin: "0 0 8px 0", color: "#ffffff", letterSpacing: "-0.02em" }}>
              Hệ Thống Cụm Rạp CineBook
            </h1>
            <p style={{ color: "#9ca3af", fontSize: "16px", margin: 0 }}>
              Trải nghiệm không gian điện ảnh đẳng cấp với âm thanh & màn hình chuẩn quốc tế
            </p>
          </div>

          {/* 💡 Nút Chuyển Trang Quản Lý Dành Cho Admin */}
          {isAdmin() && (
            <Link
              href="/admin/cinemas"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                background: "#e50914",
                color: "#ffffff",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "700",
                fontSize: "14px",
                boxShadow: "0 4px 14px rgba(229, 9, 20, 0.4)",
                transition: "all 0.2s ease",
              }}
            >
              ⚙ Quản Lý Rạp (Admin) ↗
            </Link>
          )}
        </div>

        {/* Filter Cities */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "40px" }}>
          {CITIES.map((city) => {
            const isActive = selectedCity === city;
            return (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                style={{
                  padding: "9px 22px",
                  borderRadius: "24px",
                  border: "1px solid",
                  borderColor: isActive ? "#e50914" : "#27272a",
                  background: isActive ? "#e50914" : "#121318",
                  color: isActive ? "#ffffff" : "#a1a1aa",
                  fontWeight: isActive ? "700" : "500",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: isActive ? "0 4px 14px rgba(229, 9, 20, 0.4)" : "none",
                }}
              >
                {city}
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        {isLoading ? (
          <p style={{ textAlign: "center", color: "#9ca3af", padding: "60px" }}>Đang tải danh sách cụm rạp...</p>
        ) : isError ? (
          <p style={{ textAlign: "center", color: "#f87171", padding: "60px" }}>Lỗi tải dữ liệu rạp: {(error as Error).message}</p>
        ) : filteredCinemas.length === 0 ? (
          <p style={{ textAlign: "center", color: "#71717a", padding: "60px" }}>Chưa có cụm rạp nào tại khu vực này.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "24px" }}>
            {filteredCinemas.map((cinema) => {
              const roomCount = cinema.rooms?.length ?? cinema._count?.rooms ?? 0;
              return (
                <div
                  key={cinema.id}
                  style={{
                    background: "#121318",
                    border: "1px solid #27272a",
                    borderRadius: "16px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                      <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#ffffff", margin: 0, lineHeight: "1.3" }}>
                        {cinema.name}
                      </h2>
                      <span style={{ fontSize: "12px", background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa", border: "1px solid rgba(59, 130, 246, 0.3)", padding: "4px 12px", borderRadius: "12px", whiteSpace: "nowrap", fontWeight: "600" }}>
                        {cinema.city}
                      </span>
                    </div>

                    <p style={{ color: "#d4d4d8", fontSize: "14px", margin: "0 0 10px 0", lineHeight: "1.5" }}>
                      📍 {cinema.address}
                    </p>

                    <p style={{ color: "#a1a1aa", fontSize: "13px", margin: "0 0 18px 0" }}>
                      📞 Hotline: <span style={{ color: "#f3f4f6", fontWeight: "500" }}>{cinema.phone || "1900 xxxx"}</span>
                    </p>

                    <div style={{ display: "flex", gap: "12px", fontSize: "13px", color: "#a1a1aa", background: "#09090b", padding: "10px 14px", borderRadius: "8px", border: "1px solid #27272a", marginBottom: "24px" }}>
                      <span>🎬 Quy mô: <strong style={{ color: "#10b981" }}>{roomCount} phòng chiếu</strong></span>
                    </div>
                  </div>

                  <Link
                    href={`/cinemas/${cinema.id}`}
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "12px",
                      background: "#e50914",
                      color: "#ffffff",
                      borderRadius: "10px",
                      textDecoration: "none",
                      fontWeight: "700",
                      fontSize: "14px",
                      boxShadow: "0 4px 12px rgba(229, 9, 20, 0.3)",
                    }}
                  >
                    Xem Lịch Chiếu & Đặt Vé
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}