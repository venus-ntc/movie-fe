# Dependencies · Frontend (app cho phim)

> Tài liệu tham khảo. **Nguồn dependency chính thức là [`package.json`](./package.json) + `package-lock.json`** — cài đặt bằng `npm install` (đây là dự án Next.js/Node, không dùng `pip`).

## Môi trường chạy

| Yêu cầu | Phiên bản |
|---|---|
| Node.js | >= 20 (đã test trên 22) |
| npm | >= 10 |

## Dependencies (runtime)

| Gói | Phiên bản | Vai trò |
|---|---|---|
| `next` | 16.2.9 | Framework (App Router) |
| `react` | 19.2.4 | Thư viện UI |
| `react-dom` | 19.2.4 | Render React ra DOM |
| `@tanstack/react-query` | ^5.101.0 | Fetch & cache dữ liệu (mutation/query) |

## Dev dependencies

| Gói | Phiên bản | Vai trò |
|---|---|---|
| `typescript` | ^5 | Ngôn ngữ |
| `tailwindcss` | ^4 | CSS utility |
| `@tailwindcss/postcss` | ^4 | Tích hợp Tailwind vào PostCSS |
| `eslint` | ^9 | Lint |
| `eslint-config-next` | 16.2.9 | Bộ rule ESLint cho Next.js |
| `@types/node` | ^20 | Type cho Node |
| `@types/react` | ^19 | Type cho React |
| `@types/react-dom` | ^19 | Type cho React DOM |

## Biến môi trường

Tạo `.env` (hoặc `.env.local`) ở thư mục `frontend`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000   # URL gốc backend Django
```

> Khi thêm/bớt thư viện: chạy `npm install <pkg>` (cập nhật `package.json` tự động), rồi cập nhật bảng trên cho đồng bộ.
