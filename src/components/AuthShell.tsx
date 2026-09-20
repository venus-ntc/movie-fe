import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div
      className="flex min-h-screen bg-[#120b0b] text-[#fff7f7]"
      style={{ fontFamily: "var(--font-be-vietnam), system-ui, sans-serif" }}
    >
      <aside className="authPanel relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.2),_transparent_35%),linear-gradient(180deg,#1a0d0d_0%,#220d0f_100%)] p-12 text-[#fff7f7] lg:flex">
        <div
          aria-hidden
          className="authBlob pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#ef4444]/20 blur-3xl"
        />
        <div
          aria-hidden
          className="authBlob pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-[#fca5a5]/20 blur-3xl"
          style={{ animationDelay: "-5s", animationDuration: "13s" }}
        />

        <Link href="/" className="authFadeUp relative" style={{ animationDelay: "0.1s" }}>
          <Logo size={32} tone="light" />
        </Link>

        <div className="authFadeUp relative max-w-md" style={{ animationDelay: "0.2s" }}>
          <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#fca5a5]">
            CineFlow Admin
          </div>
          <h2 className="text-4xl font-light leading-tight text-white">
            Quản lý rạp phim
            <strong className="block font-semibold text-[#f87171]">hiệu quả và hiện đại</strong>
          </h2>
          <p className="mt-5 text-[15px] font-light leading-relaxed text-[#fff1f2]/75">
            Tối ưu quy trình đặt vé, quản lý ghế, suất chiếu và doanh thu trong một hệ thống tích hợp.
          </p>
        </div>

        <div
          className="authFadeUp relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#fff1f2]/80"
          style={{ animationDelay: "0.35s" }}
        >
          <span className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-[#22c55e]" />
          Hệ thống đang hoạt động ổn định · 1,284 booking hôm nay
        </div>
      </aside>

      <main className="flex w-full items-center justify-center px-5 py-10 sm:px-8 lg:w-1/2 bg-[#1a0d0d] lg:bg-[#160b0d]">
        <div className="w-full max-w-sm">
          <Link
            href="/"
            className="authFadeUp mb-10 inline-block lg:hidden"
            style={{ animationDelay: "0.05s" }}
          >
            <Logo size={32} />
          </Link>

          <h1 className="authFadeUp text-3xl font-semibold tracking-tight text-white" style={{ animationDelay: "0.08s" }}>
            {title}
          </h1>
          {subtitle && (
            <p className="authFadeUp mt-2 text-[15px] text-[#f5d4d4]" style={{ animationDelay: "0.15s" }}>
              {subtitle}
            </p>
          )}

          <div className="authFormWrap">{children}</div>

          {footer && (
            <div className="authFadeUp mt-8 text-center text-sm text-[#f5d4d4]" style={{ animationDelay: "0.62s" }}>
              {footer}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
