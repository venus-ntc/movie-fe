# app cho phim · Frontend

Giao diện web của **app cho phim** — quản lý rạp phim, đặt vé và doanh thu. Xây bằng **Next.js (App Router) + React + TypeScript + Tailwind CSS v4**, kết nối backend Django REST.

---

## Công nghệ

| Hạng mục | Sử dụng |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| Data fetching / cache | TanStack Query v5 |
| Ngôn ngữ | TypeScript 5 |
| Font | Be Vietnam Pro, Geist (next/font) |

---

## Yêu cầu

- **Node.js >= 20** (đã test trên 22) và **npm >= 10**
- Backend đang chạy (mặc định tại `http://localhost:8000`)

> Chi tiết thư viện xem [`DEPENDENCIES.md`](./DEPENDENCIES.md) hoặc nguồn chính [`package.json`](./package.json).

---

## Cài đặt & chạy

```bash
# 1. Cài dependencies
npm install

# 2. Tạo file môi trường .env (xem mục Biến môi trường bên dưới)

# 3. Chạy dev (http://localhost:3000)
npm run dev
```

### Scripts

| Lệnh | Tác dụng |
|---|---|
| `npm run dev` | Chạy server phát triển (hot reload) |
| `npm run build` | Build production |
| `npm run start` | Chạy bản đã build |
| `npm run lint` | Kiểm tra ESLint |

---

## Biến môi trường

Tạo file `.env` (hoặc `.env.local`) ở thư mục `frontend`:

```env
# URL gốc của backend Django (DRF). Tiền tố NEXT_PUBLIC_ để client đọc được.
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Cấu trúc thư mục

```
src/
├─ app/
│  ├─ (auth)/              # Nhóm route xác thực (không có Header/Footer)
│  │  ├─ login/            #   Đăng nhập
│  │  ├─ register/         #   Đăng ký + xác thực OTP (2 bước)
│  │  └─ forgot-password/  #   Quên / đặt lại mật khẩu
│  ├─ (app)/               # Nhóm route ứng dụng (có Header + Footer)
│  │  ├─ page.tsx          #   Trang chủ (landing)
│  │  ├─ about/            #   Về chúng tôi
│  │  ├─ profile/          #   Hồ sơ cá nhân + chỉnh sửa
│  │  ├─ rooms/            #   Phòng học
│  │  └─ todos/            #   Công việc
│  ├─ layout.tsx           # Layout gốc + font + Providers
│  └─ globals.css          # Tailwind + keyframes (toast, auth, …)
├─ components/
│  ├─ Header.tsx           # Điều hướng + avatar/đăng xuất theo trạng thái đăng nhập
│  ├─ Footer.tsx
│  ├─ Toast.tsx            # Hệ thống thông báo dùng chung (useToast)
│  ├─ Providers.tsx        # QueryClientProvider + ToastProvider
│  ├─ AuthShell.tsx        # Khung dùng chung cho trang auth
│  └─ icons.tsx, Logo.tsx, Reveal.tsx, …
├─ hooks/
│  ├─ useAuth.ts           # login / register / verify / reset (TanStack mutation)
│  └─ useProfile.ts        # đọc & cập nhật hồ sơ
└─ lib/
   └─ api.ts               # API client + quản lý token + auto-refresh
```

---

## Xác thực & token

- Đăng nhập lưu **access + refresh token** vào `localStorage` ([`lib/api.ts`](./src/lib/api.ts)).
- `apiFetch` tự gắn `Authorization: Bearer`; khi gặp **401** sẽ **tự gọi `refresh-token/`** (single-flight) rồi thử lại 1 lần. Refresh hỏng → xoá token.
- `Header` hiển thị **avatar + menu** khi đã đăng nhập, ngược lại hiện **Đăng nhập / Đăng ký**.

## Thông báo (Toast)

Dùng ở bất kỳ client component nào:

```tsx
import { useToast } from "@/components/Toast";

const toast = useToast();
toast.success("Đăng nhập thành công", "Chào mừng bạn quay lại 👋");
toast.error("Có lỗi", "Email hoặc mật khẩu không đúng.");
```

---

## Quy ước

- Component tương tác cần `"use client"`; trang tĩnh để mặc định (server component).
- Token/đường dẫn API tập trung ở `lib/api.ts` — không gọi `fetch` rải rác.
- Bảng màu thương hiệu: nền `#f7f6f1`, chữ `#1b1b19`, sage `#7a9e7e`, terracotta `#b5764a`.

---

## Chạy bằng Docker (tùy chọn)

Toàn bộ stack (frontend + backend + Postgres) có thể chạy bằng `docker-compose.yaml` ở thư mục gốc dự án:

```bash
docker compose up -d        # frontend: http://localhost:3000
```
