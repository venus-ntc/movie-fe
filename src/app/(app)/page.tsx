import Link from "next/link";
import Reveal from "@/components/Reveal";
import ScrollToTop from "@/components/ScrollToTop";
import styles from "./landing.module.css";

const STATS = [
  { num: "12+", label: "rạp & phòng chiếu" },
  { num: "3.2K", label: "vé đã bán trong tháng" },
  { num: "98.6%", label: "tỷ lệ ghế lấp đầy" },
  { num: "24/7", label: "hệ thống hoạt động liên tục" },
];

const FEATURE_GROUPS = [
  {
    badge: "UC1",
    title: "Quản lý phim",
    text: "Thêm phim mới, cập nhật nội dung, poster, thể loại và xóa dữ liệu theo quy trình chuẩn.",
    accent: "#ffb703",
  },
  {
    badge: "UC2",
    title: "Quản lý rạp & phòng",
    text: "Thêm/sửa/xóa rạp, theo dõi từng phòng chiếu và cấu hình không gian tối ưu.",
    accent: "#f72585",
  },
  {
    badge: "UC3",
    title: "Quản lý ghế",
    text: "Tạo loại ghế, định nghĩa vị trí, tổ chức sơ đồ phòng, đồng bộ trạng thái nhanh chóng.",
    accent: "#00b4d8",
  },
  {
    badge: "UC4",
    title: "Quản lý suất chiếu",
    text: "Thiết lập lịch chiếu, gán phim vào phòng, cập nhật giá vé và xử lý thời gian hiệu quả.",
    accent: "#7bd389",
  },
  {
    badge: "UC5",
    title: "Tìm kiếm & lọc",
    text: "Tìm phim theo tên, lọc theo thể loại, rạp, ngày chiếu và khoảng giá theo nhu cầu khách hàng.",
    accent: "#a78bfa",
  },
  {
    badge: "UC6",
    title: "Sơ đồ ghế & trạng thái",
    text: "Hiển thị ghế trống, đang giữ, đã đặt và các trạng thái thời gian thực realtime.",
    accent: "#ff7b54",
  },
  {
    badge: "UC7",
    title: "Đặt vé & giữ ghế",
    text: "Tạo booking, giữ ghế trong 5 phút, khóa tài nguyên theo thời gian, chống race condition.",
    accent: "#2ec4b6",
  },
  {
    badge: "UC8",
    title: "Thanh toán Stripe",
    text: "Tích hợp Stripe Test Mode, đồng bộ trạng thái vé và cập nhật quy trình thanh toán an toàn.",
    accent: "#5c7cfa",
  },
  {
    badge: "UC9",
    title: "Quản lý vé đã đặt",
    text: "Xem lịch sử, xem chi tiết, hủy vé hợp lệ và hoàn tiền cho vé đã thanh toán.",
    accent: "#f4a261",
  },
  {
    badge: "UC10",
    title: "Thống kê doanh thu",
    text: "Tổng doanh thu, số booking thành công/bị hủy, phim bán chạy, tỷ lệ lấp đầy ghế.",
    accent: "#c77dff",
  },
];

const SHOWTIMES = [
  { time: "11:30", movie: "Dune: Part II", room: "Screen 03", price: "145.000đ" },
  { time: "14:15", movie: "Inside Out 2", room: "Screen 05", price: "125.000đ" },
  { time: "18:45", movie: "The Batman", room: "Screen 01", price: "165.000đ" },
  { time: "21:00", movie: "Oppenheimer", room: "Screen 04", price: "180.000đ" },
];

const MOVIES = [
  { title: "Inside Out 2", status: "Đang chiếu", rating: "92%" },
  { title: "Dune: Part II", status: "Hot tuần", rating: "96%" },
  { title: "The Batman", status: "Rạp 3D", rating: "89%" },
  { title: "Oppenheimer", status: "Đánh giá cao", rating: "94%" },
];

export default function LandingPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <section className={styles.hero}>
          <Reveal>
            <div className={styles.badge}>CineFlow Platform</div>
            <h1 className={styles.title}>
              Đặt vé phim
              <br />
              <strong>mọi lúc, mọi nơi</strong>
            </h1>
            <p className={styles.lead}>
              Hệ thống end-to-end cho cả khách hàng lẫn quản lý rạp: đặt vé online,
              chọn ghế, thanh toán an toàn, quản lý suất chiếu, phòng chiếu và thống kê doanh thu trong một nền tảng hiện đại.
            </p>
            <div className={styles.heroActions}>
              <Link href="/login" className={styles.btnPrimary}>
                Đặt vé ngay
              </Link>
              <Link href="/register" className={styles.btnSecondary}>
                Trải nghiệm khách hàng
              </Link>
            </div>
            <div className={styles.heroMeta}>
              <span>🎟️ Đặt vé cho khách</span>
              <span>💳 Thanh toán Stripe</span>
              <span>📊 Quản lý rạp & doanh thu</span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className={styles.showcase}>
              <div className={styles.showcaseHeader}>
                <div>
                  <div className={styles.kicker}>Now showing</div>
                  <div className={styles.showcaseTitle}>CineFlow Experience</div>
                </div>
                <span className={styles.livePill}>LIVE • 24 system</span>
              </div>

              <div className={styles.showcaseGrid}>
                <div className={styles.cinemaPanel}>
                  <div className={styles.moviePoster}>
                    <span className={styles.posterTag}>Sci-Fi</span>
                    <div className={styles.posterTitle}>DUNE</div>
                    <div className={styles.posterSub}>Part II</div>
                  </div>
                  <div className={styles.movieDetails}>
                    <div>
                      <div className={styles.movieLabel}>Phim đang chiếu</div>
                      <h3 className={styles.movieName}>Dune: Part II</h3>
                    </div>
                    <div className={styles.movieMeta}>
                      <span>IMAX</span>
                      <span>2D</span>
                      <span>18:45</span>
                    </div>
                  </div>
                </div>

                <div className={styles.screenPanel}>
                  <div className={styles.screenLabel}>Seat map</div>
                  <div className={styles.screenFrame}>
                    <div className={styles.screen} />
                    <div className={styles.seatGrid}>
                      {["A", "B", "C", "D", "E"].map((row) => (
                        <div key={row} className={styles.seatRow}>
                          <span className={styles.rowLabel}>{row}</span>
                          {[1, 2, 3, 4, 5].map((seat) => {
                            const state = [1, 3, 5].includes(seat) ? "reserved" : "available";
                            return (
                              <span
                                key={`${row}-${seat}`}
                                className={`${styles.seat} ${styles[state]}`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.summaryBar}>
                <span>
                  <strong>1,284</strong> booking hôm nay
                </span>
                <span>
                  <strong>₹ 92.4M</strong> doanh thu
                </span>
                <span>
                  <strong>96%</strong> tăng hiệu suất
                </span>
              </div>
            </div>
          </Reveal>
        </section>

        <Reveal>
          <div className={styles.stats}>
            {STATS.map((item) => (
              <div key={item.label} className={styles.stat}>
                <div className={styles.statNum}>{item.num}</div>
                <div className={styles.statLabel}>{item.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <section className={styles.section}>
          <Reveal>
            <div className={styles.sectionHead}>
              <div>
                <div className={styles.kicker}>Core modules</div>
                <h2 className={styles.sectionTitle}>
                  Mọi khâu vận hành rạp phim <strong>đều nằm trong một hệ thống</strong>
                </h2>
              </div>
            </div>
          </Reveal>

          <div className={styles.featureGrid}>
            {FEATURE_GROUPS.map((feature, index) => (
              <Reveal key={feature.badge} delay={index * 70} className={styles.revealFill}>
                <article className={styles.featureCard}>
                  <span
                    className={styles.featureBadge}
                    style={{ background: `${feature.accent}1A`, color: feature.accent }}
                  >
                    {feature.badge}
                  </span>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureText}>{feature.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="operations" className={`${styles.section} ${styles.sectionBordered}`}>
          <Reveal>
            <div className={styles.sectionHead}>
              <div>
                <div className={styles.kicker}>Operations</div>
                <h2 className={styles.sectionTitle}>
                  Lịch chiếu hôm nay <strong>được cập nhật liên tục</strong>
                </h2>
              </div>
            </div>
          </Reveal>

          <div className={styles.dualGrid}>
            <Reveal className={styles.revealFill}>
              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <span className={styles.panelTitle}>Schedule</span>
                  <span className={styles.panelGhost}>Today</span>
                </div>
                <div className={styles.showtimeList}>
                  {SHOWTIMES.map((showtime) => (
                    <div key={`${showtime.time}-${showtime.movie}`} className={styles.showtimeRow}>
                      <div className={styles.timeBlock}>{showtime.time}</div>
                      <div className={styles.showtimeInfo}>
                        <div className={styles.movieName}>{showtime.movie}</div>
                        <div className={styles.movieMetaLine}>{showtime.room}</div>
                      </div>
                      <div className={styles.priceTag}>{showtime.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} className={styles.revealFill}>
              <div className={styles.panelAlt}>
                <div className={styles.panelHeader}>
                  <span className={styles.panelTitle}>Top movies</span>
                  <span className={styles.panelGhost}>This week</span>
                </div>
                <div className={styles.movieList}>
                  {MOVIES.map((movie, index) => (
                    <div key={movie.title} className={styles.movieRow}>
                      <span className={styles.rank}>{index + 1}</span>
                      <span className={styles.posterMini}>
                        {movie.title.charAt(0)}
                      </span>
                      <div className={styles.movieDetailsSmall}>
                        <div className={styles.movieName}>{movie.title}</div>
                        <div className={styles.movieMetaLine}>{movie.status}</div>
                      </div>
                      <span className={styles.ratingPill}>{movie.rating}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionBordered}`}>
          <Reveal>
            <div className={styles.sectionHead}>
              <div>
                <div className={styles.kicker}>Why choose us</div>
                <h2 className={styles.sectionTitle}>
                  Từ <strong>booking</strong> tới <strong>doanh thu</strong>, mọi thứ đều rõ ràng
                </h2>
              </div>
            </div>
          </Reveal>

          <div className={styles.advantageGrid}>
            <Reveal className={styles.revealFill}>
              <div className={styles.advantageCard}>
                <div className={styles.advantageIcon}>🔒</div>
                <h3>Giữ ghế an toàn</h3>
                <p>Hệ thống khóa ghế trong 5 phút, tự động giải phóng khi hết thời gian và ngăn chặn xung đột đặt chỗ.</p>
              </div>
            </Reveal>
            <Reveal delay={80} className={styles.revealFill}>
              <div className={styles.advantageCard}>
                <div className={styles.advantageIcon}>📊</div>
                <h3>Dashboard doanh thu</h3>
                <p>Phân tích số vé bán, booking thành công, booking hủy, tỷ lệ lấp đầy và phim bán chạy nhất.</p>
              </div>
            </Reveal>
            <Reveal delay={160} className={styles.revealFill}>
              <div className={styles.advantageCard}>
                <div className={styles.advantageIcon}>⚙️</div>
                <h3>Vận hành nhanh</h3>
                <p>Quản lý phim, phòng chiếu, giá vé và lịch trình từ một nơi, tiết kiệm thời gian vận hành.</p>
              </div>
            </Reveal>
          </div>
        </section>

        <Reveal>
          <section className={styles.finalCta}>
            <div className={styles.ctaGlow} />
            <h2>
              Bắt đầu quản lý rạp <strong>ngay hôm nay</strong>
            </h2>
            <p>
              Tối ưu quy trình đặt vé, thanh toán và thống kê doanh thu cho rạp của bạn.
            </p>
            <Link href="/login" className={styles.btnPrimary}>
              Bắt đầu ngay →
            </Link>
          </section>
        </Reveal>
      </div>

      <ScrollToTop />
    </div>
  );
}
