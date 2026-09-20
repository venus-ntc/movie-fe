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
