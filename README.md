# app cho phim · Frontend

Giao diện web của **app cho phim** — quản lý rạp phim, đặt vé và doanh thu. Xây bằng **Next.js (App Router) + React + TypeScript + Tailwind CSS v4**, kết nối backend NestJS.

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
# URL gốc của backend NestJS. Tiền tố NEXT_PUBLIC_ để client đọc được.
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Cấu trúc dự án

```
src/
├── app/                          # Next.js App Router
│   ├── globals.css               # CSS toàn cục
│   ├── layout.tsx                # Root layout (Providers, Header, Footer)
│   │
│   ├── (app)/                    # Route group cho trang công khai
│   │   ├── layout.tsx            # Layout cho nhóm app
│   │   ├── page.tsx              # Trang chủ
│   │   ├── landing.module.css    # CSS riêng trang chủ
│   │   ├── about/page.tsx        # Trang "Về chúng tôi"
│   │   └── profile/page.tsx      # Trang hổ trợ người dùng
│   │
│   └── (auth)/                   # Route group cho xác thực
│       ├── layout.tsx            # Layout cho auth
│       ├── login/page.tsx        # Trang đăng nhập
│       ├── register/page.tsx     # Trang đăng ký
│       └── forgot-password/      # Trang quên mật khẩu
│           └── page.tsx
│
├── components/                   # Thành phần React tái sử dụng
│   ├── AuthShell.tsx             # Layout bao cho trang auth
│   ├── EyeIcon.tsx               # Icon hiện/ẩn mật khẩu
│   ├── Footer.tsx                # Phần footer
│   ├── Header.tsx                # Phần header với navigation
│   ├── Logo.tsx                  # Logo & LogoMark
│   ├── Providers.tsx             # Provider TanStack Query & toast
│   ├── Reveal.tsx                # Animation reveal component
│   ├── ScrollToTop.tsx           # Button scroll lên đầu
│   ├── Toast.tsx                 # Toast notification system
│   └── icons.tsx                 # Icon SVG (FlameIcon, TargetIcon, etc.)
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts                # Login, register, verify, reset password
│   └── useProfile.ts             # Fetch & update user profile
│
└── lib/
    └── api.ts                    # API calls (apiFetch, login, register, etc.)
```

### Mô tả chi tiết từng thư mục

#### `src/app`
- **Cấu trúc route**: Sử dụng Next.js App Router với **route groups** (`(auth)`, `(app)`)
- **(auth)**: Các trang xác thực (login, register, forgot password) — **không hiển thị header**
- **(app)**: Trang công khai (home, about, profile) — **có header & footer**
- **Root layout**: Quản lý Providers, font, metadata

#### `src/components`
- **AuthShell**: Layout chung cho trang login/register (tiêu đề, mô tả, footer)
- **Header**: Navigation top bar với user menu (logout, profile)
- **Footer**: Footer với links tổ chức, copyright
- **Toast**: Hệ thống thông báo (success, error) dùng Context

#### `src/hooks`
- **useAuth**: Wrapper TanStack Query cho login, register, verify email, reset password
- **useProfile**: Fetch profile người dùng hiện tại, cập nhật thông tin

#### `src/lib/api.ts`
- **apiFetch**: Wrapper `fetch()` với tự động thêm Authorization header, refresh token
- **login/register/verifyEmail**: Các hàm xác thực
- **getProfile/updateProfile**: Quản lý người dùng
- **Token management**: `getAccessToken()`, `setTokens()`, `clearTokens()`

### Luồng dữ liệu (Data Flow)

```
User Action (form submit)
    ↓
Hook (useLogin, useRegister, etc.) — TanStack Query mutation
    ↓
API function (apiFetch, login, register)
    ↓
Backend NestJS API
    ↓
Response → Token lưu localStorage
    ↓
UI cập nhật (Toast, redirect, refetch)
```

### Convention & Best Practices

1. **Pages**: Sử dụng `"use client"` cho pages có form/state
2. **Components**: Chủ yếu server components, chỉ `"use client"` khi cần state/hooks
3. **Styling**: Tailwind CSS classes, CSS modules cho page-specific styles
4. **API Calls**: Luôn qua `@/lib/api.ts`, không gọi `fetch()` trực tiếp
5. **Error Handling**: Dùng `readApiError()` để parse lỗi API
6. **Auth State**: Lưu token localStorage, kiểm tra khi render components

### Environment Variables

| Biến | Mô tả | Mặc định |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8000` |
