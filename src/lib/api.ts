const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
const AUTH = `${API_BASE}/api/auth`;

const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_KEY);
}

export function setTokens(access: string, refresh?: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_KEY, access);
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
}

export function clearTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

// Bổ sung helper lấy User Profile và kiểm tra Admin
export function getCurrentUser(): { id?: number; email?: string; role?: string; [key: string]: unknown } | null {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function isAdmin(): boolean {
  const user = getCurrentUser();
  return user?.role === "ADMIN" || user?.role === "admin";
}

class ApiError extends Error {
  status: number;
  data: unknown;
  constructor(status: number, data: unknown) {
    super(`API error ${status}`);
    this.status = status;
    this.data = data;
  }
}

let refreshPromise: Promise<string> | null = null;

export async function refreshAccessToken(): Promise<string> {
  const refresh = getRefreshToken();
  if (!refresh) throw new ApiError(401, { detail: "Thiếu refresh token" });

  if (!refreshPromise) {
    refreshPromise = (async () => {
      const res = await fetch(`${AUTH}/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });
      if (!res.ok) {
        clearTokens();
        throw new ApiError(res.status, await res.json().catch(() => null));
      }
      const data = await res.json();
      const newAccess = data.accessToken || data.access;
      const newRefresh = data.refreshToken || data.refresh;
      setTokens(newAccess, newRefresh);
      return newAccess as string;
    })().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {},
  retryOn401 = true
): Promise<T> {
  const token = getAccessToken();
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let cleanPath = path.replace(/^\/+|\/+$/g, "");
  cleanPath = cleanPath.replace(/^api\/v1\//, "").replace(/^api\//, "");
  
  const url = `${API_BASE}/api/${cleanPath}`;

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401 && retryOn401 && getRefreshToken()) {
    try {
      await refreshAccessToken();
      return apiFetch<T>(path, options, false);
    } catch {
    }
  }

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) throw new ApiError(res.status, data);
  return data as T;
}

export interface LoginResponse {
  accessToken?: string;
  access?: string;
  refresh?: string;
  user?: unknown;
  data?: any;
  [key: string]: unknown;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${AUTH}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new ApiError(res.status, await res.json().catch(() => null));

  const data: LoginResponse = await res.json();

  const token =
    data.accessToken ||
    data.access ||
    (data.data as any)?.accessToken ||
    (data.result as any)?.accessToken;

  const refresh =
    data.refreshToken ||
    data.refresh ||
    (data.data as any)?.refreshToken;

  const user = data.user || (data.data as any)?.user;

  if (token) {
    setTokens(token, refresh);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  } else {
    throw new ApiError(500, { message: "Không tìm thấy token trong phản hồi từ server!" });
  }

  return data;
}

async function authPost<T = unknown>(
  path: string,
  body: Record<string, unknown>,
  method: "POST" | "PUT" = "POST"
): Promise<T> {
  const cleanPath = path.replace(/\/+$/, "");
  const res = await fetch(`${AUTH}/${cleanPath}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : await res.text();
  if (!res.ok) throw new ApiError(res.status, data);
  return data as T;
}

export async function register(
  email: string,
  fullName: string,
  password: string,
  phoneNumber?: string
): Promise<{ message?: string }> {
  return authPost("register", { email, fullName, password, phoneNumber });
}

export async function verifyEmail(
  email: string,
  otp: string
): Promise<{ message?: string }> {
  return authPost("verify-email", { email, otp });
}

export async function requestPasswordReset(
  email: string
): Promise<{ message?: string }> {
  return authPost("resend-otp", { email });
}

export async function resetPassword(
  email: string,
  otp: string,
  newPassword: string
): Promise<LoginResponse> {
  const data = await authPost<LoginResponse>(
    "reset-password",
    { email, otp, new_password: newPassword },
    "PUT"
  );
  const token = data.accessToken || data.access;
  if (token) setTokens(token, data.refresh);
  return data;
}

export interface Profile {
  id: number;
  email: string;
  full_name?: string;
  fullName?: string;
  phone_number?: string | null;
  phoneNumber?: string | null;
  profile_picture?: string | null;
  is_verified?: boolean;
  level?: number;
  xp?: number;
  current_streak?: number;
  longest_streak?: number;
  created_at?: string;
}

export async function getProfile(): Promise<Profile> {
  return apiFetch<Profile>("auth/profile");
}

export interface UpdateProfilePayload {
  full_name?: string;
  fullName?: string;
  phone_number?: string;
  phoneNumber?: string;
  profile_picture?: string;
}

export async function updateProfile(
  payload: UpdateProfilePayload
): Promise<{ message?: string; data: Profile }> {
  return apiFetch<{ message?: string; data: Profile }>(
    "auth/profile",
    { method: "PATCH", body: JSON.stringify(payload) }
  );
}

export async function logout() {
  clearTokens();
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
}

export interface StudySession {
  id?: number | string;
  started_at?: string;
  ended_at?: string | null;
  duration_seconds?: number;
  [key: string]: unknown;
}

export function startSession(): Promise<StudySession> {
  return apiFetch<StudySession>("sessions/start", { method: "POST" });
}

export function endSession(): Promise<StudySession> {
  return apiFetch<StudySession>("sessions/end", { method: "POST" });
}

export function readApiError(err: unknown, fallback = "Có lỗi xảy ra, thử lại sau."): string {
  if (err instanceof ApiError) {
    const data = err.data;
    if (typeof data === "string" && data) return data;
    if (data && typeof data === "object") {
      const obj = data as Record<string, unknown>;
      const first =
        obj.message ??
        obj.detail ??
        obj.non_field_errors ??
        Object.values(obj)[0];
      if (Array.isArray(first)) return String(first[0]);
      if (first) return String(first);
    }
    if (err.status === 401) return "Email hoặc mật khẩu không đúng.";
    return `Yêu cầu thất bại (mã ${err.status}).`;
  }
  return err instanceof Error ? err.message : fallback;
}

export { ApiError, API_BASE };

// ==========================================
// 🎬 API & KIỂU DỮ LIỆU PHIM (UC1 MOVIES)
// ==========================================

export type MovieStatusEnum = 'NOW_SHOWING' | 'COMING_SOON' | 'ENDED';

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  description?: string | null;
  durationMinutes: number;
  releaseDate?: string | null;
  genres?: Genre[];
  ageRating?: string | null;
  director?: string | null;
  cast?: string | null;
  posterUrl?: string | null;
  trailerUrl?: string | null;
  status: MovieStatusEnum;
  rating: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateMoviePayload {
  title: string;
  description?: string;
  durationMinutes: number;
  releaseDate: string;
  genreIds?: number[];
  ageRating?: string;
  director?: string;
  cast?: string;
  posterUrl?: string;
  trailerUrl?: string;
  status?: MovieStatusEnum;
  rating?: number;
}

export type UpdateMoviePayload = Partial<CreateMoviePayload>;

export async function getMovies(): Promise<Movie[]> {
  const res = await apiFetch<{ message: string; data: Movie[] }>("movies");
  return res.data ?? [];
}

export async function getMovieById(id: number): Promise<Movie> {
  const res = await apiFetch<{ message: string; data: Movie }>(`movies/${id}`);
  return res.data;
}

export async function createMovie(payload: CreateMoviePayload): Promise<Movie> {
  const res = await apiFetch<{ message: string; data: Movie }>("movies", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function updateMovie(id: number, payload: UpdateMoviePayload): Promise<Movie> {
  const res = await apiFetch<{ message: string; data: Movie }>(`movies/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function deleteMovie(id: number): Promise<{ message: string }> {
  return apiFetch<{ message: string }>(`movies/${id}`, {
    method: "DELETE",
  });
}

// ==========================================
// UC2: TYPES & API CHO QUẢN LÝ RẠP & PHÒNG CHIẾU
// ==========================================

export interface Room {
  id: number;
  name: string;
  totalSeats: number;
  cinemaId: number;
  capacity?: number; // Giữ dạng optional để tương thích ngược nếu cần
  status?: string;
}

export interface Cinema {
  id: number;
  name: string;
  address: string;
  city: string; // "Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng"...
  phone?: string;
  status?: string;
  rooms?: Room[];
  _count?: {
    rooms?: number;
  };
}

export interface CreateCinemaPayload {
  name: string;
  address: string;
  city: string;
  phone?: string;
  status?: string;
}

export interface UpdateCinemaPayload extends Partial<CreateCinemaPayload> {}

// Interface cấu hình phân loại ghế (Thường, VIP, Sweetbox...)
export interface SeatConfig {
  seatTypeId: number;
  totalSeats: number;
}

export interface CreateRoomPayload {
  name: string;
  totalSeats: number;
  cinemaId: number;
  seatConfigurations?: SeatConfig[]; // Tùy chọn truyền danh sách phân loại ghế
  status?: string;
}

export interface UpdateRoomPayload extends Partial<Omit<CreateRoomPayload, "cinemaId">> {}

// --- API QUẢN LÝ RẠP CHIẾU (CINEMAS) ---

export async function getCinemas(): Promise<Cinema[]> {
  return apiFetch<Cinema[]>("/cinemas");
}

export async function getCinemaById(id: number): Promise<Cinema> {
  return apiFetch<Cinema>(`/cinemas/${id}`);
}

export async function createCinema(payload: CreateCinemaPayload): Promise<Cinema> {
  return apiFetch<Cinema>("/cinemas", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateCinema(id: number, payload: UpdateCinemaPayload): Promise<Cinema> {
  return apiFetch<Cinema>(`/cinemas/${id}`, {
    method: "PUT", // Đồng bộ dùng PUT với CinemasController
    body: JSON.stringify(payload),
  });
}

export async function deleteCinema(id: number): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>(`/cinemas/${id}`, {
    method: "DELETE",
  });
}

// --- API QUẢN LÝ PHÒNG CHIẾU (ROOMS) ---

export async function getRoomsByCinema(cinemaId: number): Promise<Room[]> {
  return apiFetch<Room[]>(`/cinemas/${cinemaId}/rooms`);
}

export async function createRoom(payload: CreateRoomPayload): Promise<Room> {
  const sanitizedPayload: CreateRoomPayload = {
    name: payload.name,
    totalSeats: Number(payload.totalSeats),
    cinemaId: Number(payload.cinemaId),
    ...(payload.seatConfigurations && payload.seatConfigurations.length > 0
      ? {
          seatConfigurations: payload.seatConfigurations.map((item) => ({
            seatTypeId: Number(item.seatTypeId),
            totalSeats: Number(item.totalSeats),
          })),
        }
      : {}),
    ...(payload.status ? { status: payload.status } : {}),
  };

  return apiFetch<Room>("/cinemas/rooms", {
    method: "POST",
    body: JSON.stringify(sanitizedPayload),
  });
}

export async function updateRoom(id: number, payload: UpdateRoomPayload): Promise<Room> {
  const sanitizedPayload = {
    ...payload,
    ...(payload.totalSeats !== undefined ? { totalSeats: Number(payload.totalSeats) } : {}),
  };

  return apiFetch<Room>(`/cinemas/rooms/${id}`, {
    method: "PUT",
    body: JSON.stringify(sanitizedPayload),
  });
}

export async function deleteRoom(id: number): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>(`/cinemas/rooms/${id}`, {
    method: "DELETE",
  });
}