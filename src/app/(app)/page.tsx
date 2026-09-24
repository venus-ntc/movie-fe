"use client";

import { useState } from "react";
import HeroBanner from "@/components/home/HeroBanner";
import QuickBookingBar from "@/components/home/QuickBookingBar";
import MovieTabsSection from "@/components/home/MovieTabsSection";
import TodayShowtimes from "@/components/home/TodayShowtimes";
import PromotionSection from "@/components/home/PromotionSection";
import FeatureHighlights from "@/components/home/FeatureHighlights";
import TrailerModal from "@/components/home/TrailerModal";
import ScrollToTop from "@/components/ScrollToTop";
import { MOVIES, THEATERS, Movie } from "@/lib/mockData";

export default function HomePage() {
  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);

  const handleWatchTrailer = (movie: Movie) => {
    setTrailerMovie(movie);
  };

  const handleCloseTrailer = () => {
    setTrailerMovie(null);
  };

  return (
    <div
      className="min-h-screen bg-[#0e0708] text-[#fff7f7] selection:bg-red-600 selection:text-white"
      style={{ fontFamily: "var(--font-be-vietnam), system-ui, sans-serif" }}
    >
      {/* 1. Hero Banner Carousel */}
      <HeroBanner movies={MOVIES} onWatchTrailer={handleWatchTrailer} />

      {/* 2. Thanh đặt vé nhanh (Floating Quick Booking Bar) */}
      <QuickBookingBar movies={MOVIES} theaters={THEATERS} />

      {/* 3. Phim Đang Chiếu & Sắp Chiếu (Movie Tabs Grid) */}
      <MovieTabsSection movies={MOVIES} onWatchTrailer={handleWatchTrailer} />

      {/* 4. Suất chiếu hôm nay theo rạp */}
      <TodayShowtimes theaters={THEATERS} movies={MOVIES} />

      {/* 5. Ưu đãi & Khuyến mãi */}
      <PromotionSection />

      {/* 6. Điểm sáng nền tảng CineFlow */}
      <FeatureHighlights />

      {/* Popup xem trailer */}
      <TrailerModal
        isOpen={trailerMovie !== null}
        onClose={handleCloseTrailer}
        youtubeId={trailerMovie?.trailerYoutubeId || null}
        movieTitle={trailerMovie?.title || ""}
      />

      {/* Nút cuộn lên đầu trang */}
      <ScrollToTop />
    </div>
  );
}
