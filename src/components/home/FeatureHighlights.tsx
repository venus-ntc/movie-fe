import Reveal from "@/components/Reveal";

const HIGHLIGHTS = [
  {
    icon: "⏱️",
    title: "Khóa giữ ghế 5 phút thông minh",
    description:
      "Tự động khóa ghế ngay khi khách hàng chọn, giải quyết triệt để xung đột đặt chỗ (race condition) và tự động giải phóng ghế nếu không thanh toán.",
    accent: "#ef4444",
  },
  {
    icon: "💺",
    title: "Sơ đồ ghế thời gian thực",
    description:
      "Hiển thị trực quan từng hàng ghế Standard, VIP và Sweetbox đôi với trạng thái ghế trống, đang giữ và đã mua được cập nhật tức thì.",
    accent: "#3b82f6",
  },
  {
    icon: "💳",
    title: "Thanh toán an toàn với Stripe",
    description:
      "Tích hợp cổng thanh toán quốc tế Stripe, hỗ trợ đa dạng thẻ Visa/Mastercard với quy trình bảo mật mã hóa cao cấp.",
    accent: "#10b981",
  },
  {
    icon: "🎟️",
    title: "Vé điện tử QR Check-in",
    description:
      "Nhận vé điện tử có mã QR ngay sau khi thanh toán thành công. Khách hàng vào thẳng phòng chiếu không cần chờ đợi in vé giấy.",
    accent: "#a855f7",
  },
];

const STATS = [
  { num: "12+", label: "Cụm rạp & phòng chiếu" },
  { num: "3.2K+", label: "Vé đặt thành công mỗi tuần" },
  { num: "98.6%", label: "Tỷ lệ khách hàng hài lòng" },
  { num: "100%", label: "Bảo mật thanh toán Stripe" },
];

export default function FeatureHighlights() {
  return (
    <section className="border-t border-white/5 bg-gradient-to-b from-neutral-950 via-[#12080a] to-neutral-950 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500">
              Trải nghiệm khác biệt
            </span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-white">
              Nền Tảng Đặt Vé Hiện Đại Hàng Đầu
            </h2>
            <p className="mt-3 text-sm text-neutral-400 font-light">
              CineFlow kết hợp công nghệ cơ sở dữ liệu tối ưu cùng giao diện trực quan nhằm mang lại trải nghiệm xem phim hoàn hảo.
            </p>
          </div>
        </Reveal>

        {/* Feature Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 80}>
              <div className="relative h-full rounded-2xl border border-white/5 bg-neutral-900/60 p-6 transition-all duration-300 hover:border-white/15 hover:bg-neutral-900/90 hover:shadow-xl">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl shadow-inner mb-4"
                  style={{ backgroundColor: `${item.accent}15` }}
                >
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* System Stats Bar */}
        <Reveal delay={200}>
          <div className="mt-14 rounded-2xl border border-white/10 bg-neutral-900/70 p-6 sm:p-8 backdrop-blur-md">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`text-center ${i > 0 ? "pt-4 md:pt-0" : ""}`}
                >
                  <div className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">
                    {stat.num}
                  </div>
                  <div className="mt-1 text-xs text-neutral-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
