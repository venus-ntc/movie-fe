"use client";

import { use } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "@/lib/api";
import Poster from "@/components/cinema/Poster";
import styles from "@/components/cinema/cinema.module.css";

// Helper chuyển link YouTube thành link nhúng embed
function getEmbedTrailerUrl(url?: string | null) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function MovieDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const movieId = Number(resolvedParams.id);

  const { data: movie, isLoading, isError, error } = useQuery({
    queryKey: ["movie-detail", movieId],
    queryFn: () => getMovieById(movieId),
    enabled: !isNaN(movieId),
  });

  if (isLoading) {
    return (
      <div className={styles.page} style={{ padding: "60px 20px", textAlign: "center", color: "#aaa" }}>
        Đang tải thông tin chi tiết phim...
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className={styles.page} style={{ padding: "60px 20px", textAlign: "center", color: "#fff" }}>
        <h2 style={{ fontSize: "24px", color: "#ff4d4f" }}>Không tìm thấy thông tin phim</h2>
        <p style={{ color: "#aaa", margin: "12px 0 24px 0" }}>{(error as Error)?.message || "Bộ phim không tồn tại hoặc đã bị xóa."}</p>
        <Link href="/movies" style={{ padding: "10px 20px", background: "#e50914", color: "#fff", textDecoration: "none", borderRadius: "6px" }}>
          ← Quay lại danh sách phim
        </Link>
      </div>
    );
  }

  const embedUrl = getEmbedTrailerUrl(movie.trailerUrl);

  return (
    <div className={styles.page}>
      {/* Banner nền Backdrop */}
      <div
        style={{
          width: "100%",
          minHeight: "360px",
          backgroundImage: `linear-gradient(180deg, rgba(16, 13, 17, 0.4) 0%, #100d11 100%), url('${movie.posterUrl || ""}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.8)",
        }}
      />

      <div className={styles.container} style={{ marginTop: "-180px", position: "relative", zIndex: 10 }}>
        {/* Breadcrumb navigation */}
        <div className={styles.breadcrumb} style={{ marginBottom: "20px" }}>
          <Link href="/">Trang chủ</Link>
          <span>/</span>
          <Link href="/movies">Khám phá phim</Link>
          <span>/</span>
          <span>{movie.title}</span>
        </div>

        {/* Thông tin chính Phim */}
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "32px", marginBottom: "40px" }}>
          {/* Poster bọc viền đẹp mắt */}
          <div>
            <Poster src={movie.posterUrl || undefined} title={movie.title} className={styles.poster} />
          </div>

          {/* Chi tiết nội dung */}
          <div style={{ color: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <span style={{ padding: "4px 10px", background: "#e50914", borderRadius: "4px", fontWeight: "bold", fontSize: "13px" }}>
                {movie.ageRating || "P"}
              </span>
              <span style={{ color: "#aaa", fontSize: "14px" }}>{movie.durationMinutes} PHÚT</span>
              {Number(movie.rating) > 0 && (
                <span style={{ color: "#ffc107", fontWeight: "bold", fontSize: "16px" }}>
                  ★ {Number(movie.rating).toFixed(1)} / 10
                </span>
              )}
            </div>

            <h1 style={{ fontSize: "36px", fontWeight: "bold", margin: "0 0 12px 0" }}>{movie.title}</h1>

            <p style={{ color: "#e50914", fontSize: "15px", fontWeight: "600", marginBottom: "16px" }}>
              {movie.genres?.map((g) => g.name).join(" • ") || "Điện ảnh"}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", color: "#ccc", marginBottom: "20px" }}>
              <div>
                <strong>Đạo diễn: </strong>
                <span style={{ color: "#fff" }}>{movie.director || "Chưa cập nhật"}</span>
              </div>
              <div>
                <strong>Diễn viên: </strong>
                <span style={{ color: "#fff" }}>{movie.cast || "Chưa cập nhật"}</span>
              </div>
              <div>
                <strong>Khởi chiếu: </strong>
                <span style={{ color: "#fff" }}>
                  {movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString("vi-VN") : "Đang chiếu"}
                </span>
              </div>
            </div>

            <div style={{ background: "#1a181c", padding: "16px", borderRadius: "8px", borderLeft: "4px solid #e50914", marginBottom: "24px" }}>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", color: "#fff" }}>Nội dung phim</h3>
              <p style={{ color: "#aaa", margin: 0, lineHeight: "1.6" }}>{movie.description || "Chưa có mô tả chi tiết cho bộ phim này."}</p>
            </div>

            <Link
              href={`/booking/seats?movieId=${movie.id}&showtimeId=1`}
              style={{
                display: "inline-block",
                padding: "12px 28px",
                background: "#e50914",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "6px",
                textDecoration: "none",
                boxShadow: "0 4px 12px rgba(229, 9, 20, 0.4)",
              }}
            >
              🎟 Đặt Vé Phim Này
            </Link>
          </div>
        </div>

        {/* Video Trailer YouTube */}
        {embedUrl && (
          <div style={{ marginBottom: "60px" }}>
            <h2 style={{ color: "#fff", fontSize: "22px", marginBottom: "16px", borderLeft: "4px solid #e50914", paddingLeft: "10px" }}>
              Trailer Chính Thức
            </h2>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "10px", border: "1px solid #333" }}>
              <iframe
                src={embedUrl}
                title={`Trailer ${movie.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}