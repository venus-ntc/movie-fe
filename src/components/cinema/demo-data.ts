import { MOVIES, THEATERS } from "@/lib/mockData";
import type { CinemaMovie, CinemaSeat, CinemaShowtime, Filters, Screening } from "./cinema-api";

export function demoDay() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ho_Chi_Minh", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

export function demoCatalog(filters: Filters): CinemaMovie[] {
  const day = filters.date || demoDay();
  return MOVIES.map((movie) => {
    const showtimes: CinemaShowtime[] = THEATERS.flatMap((theater) => theater.schedules
      .filter((schedule) => schedule.movieId === movie.id)
      .flatMap((schedule) => schedule.showtimes.map((showtime) => ({
        id: showtime.id, startTime: `${day}T${showtime.time}:00+07:00`, basePrice: showtime.price,
        room: { id: showtime.room, name: showtime.room, cinema: { id: theater.id, name: theater.name } },
      }))))
      .filter((showtime) => (!filters.cinemaId || showtime.room?.cinema?.id === filters.cinemaId)
        && (!filters.minPrice || Number(showtime.basePrice) >= Number(filters.minPrice))
        && (!filters.maxPrice || Number(showtime.basePrice) <= Number(filters.maxPrice)));
    return { id: movie.id, title: movie.title, posterUrl: movie.posterUrl, description: movie.synopsis,
      durationMinutes: movie.durationMinutes, rating: movie.rating, ageRating: movie.ageRating,
      status: movie.status === "now_showing" ? "NOW_SHOWING" : "COMING_SOON",
      genres: movie.genres.map((name) => ({ name })), showtimes };
  }).filter((movie) => movie.title.toLocaleLowerCase("vi").includes(filters.keyword.trim().toLocaleLowerCase("vi"))
    && (!filters.genre || movie.genres.some((genre) => genre.name === filters.genre))
    && (!(filters.cinemaId || filters.minPrice || filters.maxPrice) || movie.showtimes.length > 0));
}

export function demoScreening(id: string, movieId?: string | null, day?: string | null): Screening | undefined {
  const offset = /^d-([1-3])$/.exec(day || "");
  const selectedDay = /^\d{4}-\d{2}-\d{2}$/.test(day || "") ? day! : offset
    ? new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ho_Chi_Minh", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(new Date(`${demoDay()}T12:00:00+07:00`).getTime() + Number(offset[1]) * 86400000)) : "";
  const catalog = demoCatalog({ keyword: "", genre: "", cinemaId: "", date: selectedDay, minPrice: "", maxPrice: "" });
  for (const movie of catalog) {
    const showtime = movie.showtimes?.find((item) => String(item.id) === id);
    if (showtime) return { ...showtime, movie };
  }
  const movie = catalog.find((item) => String(item.id) === movieId);
  const first = movie?.showtimes?.[0];
  return first ? { ...first, movie } : undefined;
}

export const demoSeats: CinemaSeat[] = Array.from({ length: 96 }, (_, index) => {
  const row = Math.floor(index / 12);
  const column = index % 12 + 1;
  const booked = [2, 3, 7, 14, 15, 27, 28, 29, 40, 41, 45, 52, 53, 64, 65, 66, 76, 77].includes(index);
  return { id: index + 1, row: String.fromCharCode(65 + row), column,
    seatNumber: `${String.fromCharCode(65 + row)}${column}`, type: row >= 3 && row <= 5 ? "VIP" : "REGULAR",
    priceMultiplier: row >= 3 && row <= 5 ? 1.2 : 1,
    status: booked ? "BOOKED" : [33, 34, 70].includes(index) ? "HOLDING" : index === 95 ? "INACTIVE" : "AVAILABLE",
    isHeldByMe: false, canRelease: false, remainingTtl: [33, 34, 70].includes(index) ? 240 : 0 };
});
