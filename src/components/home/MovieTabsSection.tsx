"use client";

import { useMemo, useState } from "react";
import MovieCard from "./MovieCard";
import { Movie } from "@/lib/mockData";

interface MovieTabsSectionProps {
  movies: Movie[];
  onWatchTrailer: (movie: Movie) => void;
}

const GENRE_FILTERS = [
  "Tất Cả",
  "Hành động",
  "Khoa học viễn tưởng",
  "Hoạt hình",
  "Tâm lý",
  "Hài",
  "Phiêu lưu",
];

export default function MovieTabsSection({
  movies,
  onWatchTrailer,
}: MovieTabsSectionProps) {
  const [activeTab, setActiveTab] = useState<"now_showing" | "coming_soon">(
    "now_showing"
  );
  const [selectedGenre, setSelectedGenre] = useState<string>("Tất Cả");

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchStatus = movie.status === activeTab;
      const matchGenre =
        selectedGenre === "Tất Cả" ||
        movie.genres.some(
          (g) => g.toLowerCase() === selectedGenre.toLowerCase()
        );
      return matchStatus && matchGenre;
    });
  }, [movies, activeTab, selectedGenre]);

  const nowShowingCount = movies.filter((m) => m.status === "now_showing").length;
  const comingSoonCount = movies.filter((m) => m.status === "coming_soon").length;

  return (
    <section id="movies" className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-18">
      {/* Section Header with Tabs */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-red-500">
            Khám phá điện ảnh
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
            Danh Sách Phim Chiếu Rạp
          </h2>
        </div>

        {/* Tab Switcher (Đang Chiếu / Sắp Chiếu) */}
        <div className="flex items-center rounded-2xl bg-neutral-900/90 p-1.5 border border-white/10 shadow-inner">
          <button
            type="button"
            onClick={() => setActiveTab("now_showing")}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
              activeTab === "now_showing"
                ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <span>Đang Chiếu</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[11px] ${
                activeTab === "now_showing" ? "bg-white/20 text-white" : "bg-white/5 text-neutral-400"
              }`}
            >
              {nowShowingCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("coming_soon")}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
              activeTab === "coming_soon"
                ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <span>Sắp Chiếu</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[11px] ${
                activeTab === "coming_soon" ? "bg-white/20 text-white" : "bg-white/5 text-neutral-400"
              }`}
            >
              {comingSoonCount}
            </span>
          </button>
        </div>
      </div>

      {/* Genre Filter Pills */}
      <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {GENRE_FILTERS.map((genre) => (
          <button
            key={genre}
            type="button"
            onClick={() => setSelectedGenre(genre)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              selectedGenre === genre
                ? "border border-red-500/50 bg-red-600/20 text-red-400 font-semibold"
                : "border border-white/5 bg-white/5 text-neutral-400 hover:border-white/20 hover:text-white"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Movie Grid */}
      {filteredMovies.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-4">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onWatchTrailer={onWatchTrailer}
            />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border border-white/5 bg-neutral-900/30 py-16 text-center">
          <p className="text-sm text-neutral-400">
            Không tìm thấy phim nào phù hợp với thể loại &quot;{selectedGenre}&quot;.
          </p>
          <button
            type="button"
            onClick={() => setSelectedGenre("Tất Cả")}
            className="mt-3 text-xs font-semibold text-red-400 hover:underline"
          >
            Xem tất cả phim
          </button>
        </div>
      )}
    </section>
  );
}
