"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  Movie,
  MovieStatusEnum,
  CreateMoviePayload,
  UpdateMoviePayload,
} from "@/lib/api";
import Link from "next/link";

const GENRE_OPTIONS = [
  { id: 1, name: "Khoa học viễn tưởng" },
  { id: 2, name: "Phiêu lưu" },
  { id: 3, name: "Tiểu sử" },
  { id: 4, name: "Lịch sử" },
  { id: 5, name: "Chính kịch" },
  { id: 6, name: "Hành động" },
  { id: 7, name: "Hài hước" },
  { id: 8, name: "Siêu anh hùng" },
  { id: 9, name: "Quái thú" },
  { id: 10, name: "Giả tưởng" },
  { id: 11, name: "Hoạt hình" },
  { id: 12, name: "Gia đình" },
  { id: 13, name: "Giật gân" },
];

export default function AdminMoviesPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [formError, setFormError] = useState("");

  // Form States đầy đủ
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(120);
  const [releaseDate, setReleaseDate] = useState("2026-12-05");
  const [ageRating, setAgeRating] = useState("P");
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [status, setStatus] = useState<MovieStatusEnum>("COMING_SOON");
  const [rating, setRating] = useState(8.0);
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);

  // Lấy danh sách phim từ Backend
  const { data: movies = [], isLoading, isError, error } = useQuery({
    queryKey: ["admin-movies"],
    queryFn: getMovies,
  });

  // Mutation Thêm phim
  const createMutation = useMutation({
    mutationFn: (payload: CreateMoviePayload) => createMovie(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-movies"] });
      closeModal();
      alert("Đã thêm phim mới thành công!");
    },
    onError: (err: Error) => setFormError(err.message),
  });

  // Mutation Sửa phim
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateMoviePayload }) =>
      updateMovie(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-movies"] });
      closeModal();
      alert("Đã cập nhật thông tin phim thành công!");
    },
    onError: (err: Error) => setFormError(err.message),
  });

  // Mutation Xóa phim
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteMovie(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-movies"] });
      alert("Đã xóa phim thành công!");
    },
    onError: (err: Error) => alert(`Xóa phim thất bại: ${err.message}`),
  });

  const openCreateModal = () => {
    setEditingMovie(null);
    setTitle("");
    setDescription("");
    setDurationMinutes(145);
    setReleaseDate("2026-12-05");
    setAgeRating("C18");
    setDirector("");
    setCast("");
    setPosterUrl("");
    setTrailerUrl("");
    setStatus("COMING_SOON");
    setRating(9.2);
    setSelectedGenreIds([6, 11]);
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (movie: Movie) => {
    setEditingMovie(movie);
    setTitle(movie.title);
    setDescription(movie.description || "");
    setDurationMinutes(movie.durationMinutes || 120);
    setReleaseDate(movie.releaseDate ? movie.releaseDate.substring(0, 10) : "2026-12-05");
    setAgeRating(movie.ageRating || "P");
    setDirector(movie.director || "");
    setCast(movie.cast || "");
    setPosterUrl(movie.posterUrl || "");
    setTrailerUrl(movie.trailerUrl || "");
    setStatus((movie.status as MovieStatusEnum) || "NOW_SHOWING");
    setRating(Number(movie.rating) || 8.0);
    setSelectedGenreIds(movie.genres?.map((g) => g.id) || [6, 11]);
    setFormError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMovie(null);
  };

  const toggleGenre = (genreId: number) => {
    setSelectedGenreIds((prev) =>
      prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!title.trim()) {
      setFormError("Vui lòng nhập tên phim.");
      return;
    }

    const payload: CreateMoviePayload = {
      title,
      description: description || undefined,
      durationMinutes: Number(durationMinutes),
      releaseDate,
      ageRating,
      director,
      cast,
      posterUrl,
      trailerUrl,
      status,
      rating: Number(rating),
      genreIds: selectedGenreIds,
    };

    if (editingMovie) {
      updateMutation.mutate({ id: editingMovie.id, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleDelete = (id: number, title: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa phim "${title}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 16px", color: "#fff", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: 0 }}>Quản Lý Phim (Admin)</h1>
          <p style={{ color: "#aaa", margin: "4px 0 0 0" }}>Thêm, sửa đầy đủ thông tin chi tiết phim</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link href="/movies" style={{ padding: "10px 16px", background: "#333", color: "#fff", textDecoration: "none", borderRadius: "6px" }}>
            ← Trang phim khách hàng
          </Link>
          <button
            onClick={openCreateModal}
            style={{ padding: "10px 20px", background: "#e50914", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
          >
            + Thêm Phim Mới
          </button>
        </div>
      </div>

      {isLoading ? (
        <p style={{ color: "#aaa" }}>Đang tải danh sách phim…</p>
      ) : isError ? (
        <p style={{ color: "#ff4d4f" }}>Lỗi tải danh sách phim: {(error as Error).message}</p>
      ) : (
        <div style={{ overflowX: "auto", background: "#181818", borderRadius: "8px", border: "1px solid #333" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #333", background: "#222" }}>
                <th style={{ padding: "14px" }}>ID</th>
                <th style={{ padding: "14px" }}>Poster</th>
                <th style={{ padding: "14px" }}>Tên phim</th>
                <th style={{ padding: "14px" }}>Đạo diễn</th>
                <th style={{ padding: "14px" }}>Thời lượng</th>
                <th style={{ padding: "14px" }}>Trạng thái</th>
                <th style={{ padding: "14px" }}>Đánh giá</th>
                <th style={{ padding: "14px" }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id} style={{ borderBottom: "1px solid #2a2a2a" }}>
                  <td style={{ padding: "14px" }}>{movie.id}</td>
                  <td style={{ padding: "14px" }}>
                    <img
                      src={movie.posterUrl || "https://via.placeholder.com/50x75"}
                      alt={movie.title}
                      style={{ width: "45px", height: "65px", objectFit: "cover", borderRadius: "4px" }}
                    />
                  </td>
                  <td style={{ padding: "14px", fontWeight: "bold" }}>{movie.title}</td>
                  <td style={{ padding: "14px", color: "#ccc" }}>{movie.director || "—"}</td>
                  <td style={{ padding: "14px" }}>{movie.durationMinutes} phút</td>
                  <td style={{ padding: "14px" }}>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        background: movie.status === "NOW_SHOWING" ? "#1b4d2e" : "#5a3e10",
                        color: movie.status === "NOW_SHOWING" ? "#52c41a" : "#faad14",
                      }}
                    >
                      {movie.status === "NOW_SHOWING" ? "Đang chiếu" : "Sắp chiếu"}
                    </span>
                  </td>
                  <td style={{ padding: "14px" }}>★ {movie.rating || "—"}</td>
                  <td style={{ padding: "14px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => openEditModal(movie)}
                        style={{ padding: "6px 12px", background: "#1890ff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(movie.id, movie.title)}
                        style={{ padding: "6px 12px", background: "#ff4d4f", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL FORM THÊM / SỬA PHIM ĐẦY ĐỦ TRƯỜNG */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#222",
              padding: "28px",
              borderRadius: "10px",
              width: "100%",
              maxWidth: "680px",
              maxHeight: "90vh",
              overflowY: "auto",
              border: "1px solid #444",
            }}
          >
            <h2 style={{ margin: "0 0 20px 0", fontSize: "22px" }}>
              {editingMovie ? `Sửa thông tin phim (ID: ${editingMovie.id})` : "Thêm phim mới"}
            </h2>

            {formError && (
              <p style={{ background: "#3e1014", color: "#ff4d4f", padding: "10px", borderRadius: "6px", marginBottom: "16px" }}>
                {formError}
              </p>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: "#ccc" }}>Tên phim *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: "100%", padding: "10px", background: "#111", border: "1px solid #444", color: "#fff", borderRadius: "6px" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: "#ccc" }}>Mô tả phim</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  style={{ width: "100%", padding: "10px", background: "#111", border: "1px solid #444", color: "#fff", borderRadius: "6px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: "#ccc" }}>Thời lượng (phút)</label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    style={{ width: "100%", padding: "10px", background: "#111", border: "1px solid #444", color: "#fff", borderRadius: "6px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: "#ccc" }}>Trạng thái</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as MovieStatusEnum)}
                    style={{ width: "100%", padding: "10px", background: "#111", border: "1px solid #444", color: "#fff", borderRadius: "6px" }}
                  >
                    <option value="NOW_SHOWING">Đang chiếu (NOW_SHOWING)</option>
                    <option value="COMING_SOON">Sắp chiếu (COMING_SOON)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: "#ccc" }}>Ngày khởi chiếu</label>
                  <input
                    type="date"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    style={{ width: "100%", padding: "10px", background: "#111", border: "1px solid #444", color: "#fff", borderRadius: "6px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: "#ccc" }}>Độ tuổi (Age Rating)</label>
                  <input
                    type="text"
                    value={ageRating}
                    onChange={(e) => setAgeRating(e.target.value)}
                    placeholder="VD: P, C13, C16, C18"
                    style={{ width: "100%", padding: "10px", background: "#111", border: "1px solid #444", color: "#fff", borderRadius: "6px" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: "#ccc" }}>Đạo diễn (Director)</label>
                  <input
                    type="text"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    style={{ width: "100%", padding: "10px", background: "#111", border: "1px solid #444", color: "#fff", borderRadius: "6px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: "#ccc" }}>Điểm đánh giá (Rating)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    style={{ width: "100%", padding: "10px", background: "#111", border: "1px solid #444", color: "#fff", borderRadius: "6px" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: "#ccc" }}>Diễn viên (Cast)</label>
                <input
                  type="text"
                  value={cast}
                  onChange={(e) => setCast(e.target.value)}
                  placeholder="Các diễn viên chính..."
                  style={{ width: "100%", padding: "10px", background: "#111", border: "1px solid #444", color: "#fff", borderRadius: "6px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: "#ccc" }}>Poster URL</label>
                <input
                  type="text"
                  value={posterUrl}
                  onChange={(e) => setPosterUrl(e.target.value)}
                  style={{ width: "100%", padding: "10px", background: "#111", border: "1px solid #444", color: "#fff", borderRadius: "6px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: "#ccc" }}>Trailer URL (YouTube)</label>
                <input
                  type="text"
                  value={trailerUrl}
                  onChange={(e) => setTrailerUrl(e.target.value)}
                  style={{ width: "100%", padding: "10px", background: "#111", border: "1px solid #444", color: "#fff", borderRadius: "6px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: "#ccc" }}>Thể loại (Chọn các ID thể loại)</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", maxHeight: "100px", overflowY: "auto", padding: "8px", background: "#111", border: "1px solid #444", borderRadius: "6px" }}>
                  {GENRE_OPTIONS.map((g) => {
                    const active = selectedGenreIds.includes(g.id);
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => toggleGenre(g.id)}
                        style={{
                          padding: "4px 8px",
                          fontSize: "12px",
                          borderRadius: "4px",
                          border: "none",
                          background: active ? "#e50914" : "#333",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        {g.name} ({g.id})
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={closeModal}
                  style={{ padding: "10px 18px", background: "#444", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  style={{ padding: "10px 20px", background: "#e50914", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
                >
                  {createMutation.isPending || updateMutation.isPending ? "Đang lưu…" : "Lưu thay đổi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}