"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin/movies", label: "Quản lý Phim", icon: "🎬", color: "#e50914" },
    { href: "/admin/cinemas", label: "Quản lý Rạp & Phòng", icon: "🏢", color: "#2563eb" },
    { href: "/admin/seats", label: "Quản lý Ghế (UC3)", icon: "💺", color: "#10b981" },
    { href: "/admin/showtimes", label: "Quản lý Suất Chiếu (UC4)", icon: "📅", color: "#f59e0b" },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#18181b",
        border: "1px solid #27272a",
        padding: "10px 16px",
        borderRadius: "12px",
        marginBottom: "24px",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
        <span
          style={{
            fontSize: "12px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "#a1a1aa",
            marginRight: "6px",
          }}
        >
          Trang Quản Trị:
        </span>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 14px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: isActive ? "700" : "500",
                textDecoration: "none",
                background: isActive ? item.color : "transparent",
                color: isActive ? "#ffffff" : "#d4d4d8",
                border: isActive ? `1px solid ${item.color}` : "1px solid transparent",
                transition: "all 0.15s ease",
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 14px",
          borderRadius: "8px",
          fontSize: "13px",
          fontWeight: "600",
          color: "#a1a1aa",
          background: "#27272a",
          border: "1px solid #3f3f46",
          textDecoration: "none",
        }}
      >
        ← Quay lại trang chủ
      </Link>
    </div>
  );
}
