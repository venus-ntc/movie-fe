const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const AUTH = `${API_BASE}/api/v1/auth`;

const ACCESS_KEY = "access_token";
const REFRESH_KEY = "refresh_token";

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
      const res = await fetch(`${AUTH}/refresh-token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });
      if (!res.ok) {
        clearTokens();
        throw new ApiError(res.status, await res.json().catch(() => null));
      }
      const data = await res.json();
      setTokens(data.access, data.refresh);
      return data.access as string;
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

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

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
  access?: string;
  refresh?: string;
  [key: string]: unknown;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${AUTH}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new ApiError(res.status, await res.json().catch(() => null));
  const data: LoginResponse = await res.json();
  if (data.access) setTokens(data.access, data.refresh);
  return data;
}

async function authPost<T = unknown>(
  path: string,
  body: Record<string, unknown>,
  method: "POST" | "PUT" = "POST"
): Promise<T> {
  const res = await fetch(`${AUTH}/${path}`, {
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
  password: string
): Promise<{ message?: string }> {
  return authPost("register/", { email, full_name: fullName, password });
}

export async function verifyEmail(
  email: string,
  otp: string
): Promise<{ message?: string }> {
  return authPost("verify-email/", { email, otp });
}

export async function requestPasswordReset(
  email: string
): Promise<{ message?: string }> {
  return authPost("resend-otp/", { email });
}

export async function resetPassword(
  email: string,
  otp: string,
  newPassword: string
): Promise<LoginResponse> {
  const data = await authPost<LoginResponse>(
    "reset-password/",
    { email, otp, new_password: newPassword },
    "PUT"
  );
  if (data.access) setTokens(data.access, data.refresh);
  return data;
}

export interface Profile {
  id: number;
  email: string;
  full_name: string;
  phone_number?: string | null;
  profile_picture?: string | null;
  is_verified?: boolean;
  level?: number;
  xp?: number;
  current_streak?: number;
  longest_streak?: number;
  created_at?: string;
}

export async function getProfile(): Promise<Profile> {
  return apiFetch<Profile>("/api/v1/auth/user/profile/");
}

export interface UpdateProfilePayload {
  full_name?: string;
  phone_number?: string;
  profile_picture?: string;
}

export async function updateProfile(
  payload: UpdateProfilePayload
): Promise<{ message?: string; data: Profile }> {
  return apiFetch<{ message?: string; data: Profile }>(
    "/api/v1/auth/user/profile/update/",
    { method: "PATCH", body: JSON.stringify(payload) }
  );
}

export async function logout() {
  clearTokens();
}

export interface StudySession {
  id?: number | string;
  started_at?: string;
  ended_at?: string | null;
  duration_seconds?: number;
  [key: string]: unknown;
}

export function startSession(): Promise<StudySession> {
  return apiFetch<StudySession>("/api/v1/sessions/start/", { method: "POST" });
}

export function endSession(): Promise<StudySession> {
  return apiFetch<StudySession>("/api/v1/sessions/end/", { method: "POST" });
}

export function readApiError(err: unknown, fallback = "Có lỗi xảy ra, thử lại sau."): string {
  if (err instanceof ApiError) {
    const data = err.data;
    if (typeof data === "string" && data) return data;
    if (data && typeof data === "object") {
      const obj = data as Record<string, unknown>;
      const first =
        obj.detail ??
        obj.message ??
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
