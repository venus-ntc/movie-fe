import Link from "next/link";
import { Logo } from "@/components/Logo";

const COLUMNS = [
	{
		title: "Sản phẩm",
		links: [
			{ label: "Phim đang chiếu", href: "/rooms" },
			{ label: "Quản lý rạp", href: "/#operations" },
			{ label: "Đặt vé", href: "/todos" },
		],
	},
	{
		title: "Cộng đồng",
		links: [
			{ label: "Đánh giá phim", href: "/#operations" },
			{ label: "Về chúng tôi", href: "/about" },
			{ label: "Liên hệ", href: "/about" },
		],
	},
	{
		title: "Tài khoản",
		links: [
			{ label: "Đăng nhập", href: "/login" },
			{ label: "Đăng ký", href: "/register" },
		],
	},
];

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer
			className="border-t border-[#e3e1da] bg-[#f7f6f1] text-[#1b1b19]"
			style={{ fontFamily: "var(--font-be-vietnam), system-ui, sans-serif" }}
		>
			<div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
				<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
					<div className="max-w-xs">
						<Logo size={32} />
						<p className="mt-4 text-sm font-light leading-relaxed text-[#6b6b66]">
							Hệ thống quản lý rạp phim, suất chiếu, ghế ngồi và đặt vé bằng
							Stripe với giao diện hiện đại cho vận hành và thống kê doanh thu.
						</p>
					</div>

					{COLUMNS.map((col) => (
						<div key={col.title}>
							<h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a8a83]">
								{col.title}
							</h3>
							<ul className="mt-4 space-y-2.5">
								{col.links.map((link) => (
									<li key={link.label}>
										<Link
											href={link.href}
											className="text-sm text-[#6b6b66] transition-colors hover:text-[#1b1b19]"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#e3e1da] pt-6 sm:flex-row">
					<p className="text-sm text-[#8a8a83]">
						© {year} CineFlow · Cinema Management System
					</p>
					<div className="flex items-center gap-6 text-sm text-[#8a8a83]">
						<a
							href="#"
							className="transition-colors hover:text-[#1b1b19]"
						>
							Điều khoản
						</a>
						<a
							href="#"
							className="transition-colors hover:text-[#1b1b19]"
						>
							Bảo mật
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
