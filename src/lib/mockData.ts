export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  posterUrl: string;
  backdropUrl: string;
  trailerYoutubeId: string;
  genres: string[];
  durationMinutes: number;
  rating: number; // Điểm 1-10
  ageRating: "P" | "K" | "T13" | "T16" | "T18";
  ageLabel: string;
  formats: string[]; // 2D, 3D, IMAX, 4DX
  status: "now_showing" | "coming_soon";
  releaseDate: string;
  director: string;
  cast: string[];
  synopsis: string;
  isHot?: boolean;
}

export interface Showtime {
  id: string;
  time: string; // "14:30"
  format: "2D Phụ đề" | "2D Lồng tiếng" | "3D Phụ đề" | "IMAX 2D";
  room: string;
  price: number;
}

export interface TheaterMovieSchedule {
  movieId: string;
  showtimes: Showtime[];
}

export interface Theater {
  id: string;
  name: string;
  address: string;
  city: "Hà Nội" | "TP. Hồ Chí Minh" | "Đà Nẵng";
  phone: string;
  roomsCount: number;
  schedules: TheaterMovieSchedule[];
}

export interface Promotion {
  id: string;
  badge: string;
  title: string;
  description: string;
  code?: string;
  validUntil: string;
  image: string;
  accentColor: string;
}

export const MOVIES: Movie[] = [
  {
    id: "m-1",
    title: "Dune: Hành Tinh Cát - Phần 2",
    originalTitle: "Dune: Part Two",
    posterUrl: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s520b42.jpg",
    trailerYoutubeId: "Way9Dexny3w",
    genres: ["Khoa học viễn tưởng", "Hành động", "Phiêu lưu"],
    durationMinutes: 166,
    rating: 8.6,
    ageRating: "T16",
    ageLabel: "Phim dành cho khán giả từ 16 tuổi trở lên",
    formats: ["IMAX 2D", "2D Phụ đề"],
    status: "now_showing",
    releaseDate: "01/03/2026",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Javier Bardem"],
    synopsis:
      "Paul Atreides hợp lực cùng Chani và người Fremen để trả thù những kẻ âm mưu tiêu diệt gia tộc mình. Đứng trước sự lựa chọn giữa tình yêu và số phận vũ trụ, anh phải ngăn chặn một tương lai đen tối.",
    isHot: true,
  },
  {
    id: "m-2",
    title: "Những Mảnh Ghép Cảm Xúc 2",
    originalTitle: "Inside Out 2",
    posterUrl: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/xg27NrXi7EgQxLQVIaqG5A97LL8.jpg",
    trailerYoutubeId: "LEjhY15eCx0",
    genres: ["Hoạt hình", "Gia đình", "Hài"],
    durationMinutes: 96,
    rating: 8.1,
    ageRating: "P",
    ageLabel: "Phim phù hợp với mọi lứa tuổi",
    formats: ["2D Lồng tiếng", "2D Phụ đề", "3D Phụ đề"],
    status: "now_showing",
    releaseDate: "14/06/2026",
    director: "Kelsey Mann",
    cast: ["Amy Poehler", "Maya Hawke", "Phyllis Smith", "Lewis Black"],
    synopsis:
      "Trụ sở cảm xúc của Riley tuổi dậy thì đón nhận một cuộc cải tạo bất ngờ với sự xuất hiện của những cảm xúc hoàn toàn mới: Lo Âu, Ganh Tị, Xấu Hổ và Chán Nản!",
    isHot: true,
  },
  {
    id: "m-3",
    title: "Deadpool & Wolverine",
    originalTitle: "Deadpool & Wolverine",
    posterUrl: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/yDHYTjA3R0ne82juh4WvPfg2GRI.jpg",
    trailerYoutubeId: "73_1biulkYk",
    genres: ["Hành động", "Hài", "Khoa học viễn tưởng"],
    durationMinutes: 128,
    rating: 8.0,
    ageRating: "T18",
    ageLabel: "Phim dành cho khán giả từ đủ 18 tuổi trở lên",
    formats: ["2D Phụ đề", "IMAX 2D"],
    status: "now_showing",
    releaseDate: "26/07/2026",
    director: "Shawn Levy",
    cast: ["Ryan Reynolds", "Hugh Jackman", "Emma Corrin", "Matthew Macfadyen"],
    synopsis:
      "Một Wade Wilson đang an phận bỗng bị Cơ quan Phương sai Thời gian lôi kéo vào một nhiệm vụ sống còn cho vũ trụ của mình, buộc anh phải hợp tác cùng một Wolverine đầy bất mãn.",
    isHot: true,
  },
  {
    id: "m-4",
    title: "Oppenheimer",
    originalTitle: "Oppenheimer",
    posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
    trailerYoutubeId: "uYPbbksJxIg",
    genres: ["Tâm lý", "Lịch sử", "Tiểu sử"],
    durationMinutes: 180,
    rating: 8.9,
    ageRating: "T18",
    ageLabel: "Phim dành cho khán giả từ đủ 18 tuổi trở lên",
    formats: ["IMAX 2D", "2D Phụ đề"],
    status: "now_showing",
    releaseDate: "21/07/2026",
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
    synopsis:
      "Câu chuyện về nhà vật lý lý thuyết J. Robert Oppenheimer, người đứng đầu Dự án Manhattan tạo ra bom nguyên tử đầu tiên cho nhân loại, mở ra thời đại nguyên tử với những giằng xé đạo đức khôn nguôi.",
    isHot: true,
  },
  {
    id: "m-5",
    title: "Godzilla x Kong: Đế Chế Mới",
    originalTitle: "Godzilla x Kong: The New Empire",
    posterUrl: "https://image.tmdb.org/t/p/w500/bQ2ywkch09oT9GWT4UBneZwhoxX.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/qrGtVF3YZvJNZ9WJ9MW0rRypZII.jpg",
    trailerYoutubeId: "lV1OOlGwExM",
    genres: ["Hành động", "Khoa học viễn tưởng", "Phiêu lưu"],
    durationMinutes: 115,
    rating: 7.3,
    ageRating: "T13",
    ageLabel: "Phim dành cho khán giả từ 13 tuổi trở lên",
    formats: ["3D Phụ đề", "2D Phụ đề", "IMAX 2D"],
    status: "now_showing",
    releaseDate: "29/03/2026",
    director: "Adam Wingard",
    cast: ["Rebecca Hall", "Brian Tyree Henry", "Dan Stevens", "Kaylee Hottle"],
    synopsis:
      "Hai quái thú khổng lồ huyền thoại Godzilla và Kong buộc phải gạt bỏ hiềm khích cũ để đối đầu với một mối đe dọa ẩn sâu trong Trái Đất Rỗng, đe dọa sự tồn vong của loài người.",
    isHot: false,
  },
  {
    id: "m-6",
    title: "Kung Fu Panda 4",
    originalTitle: "Kung Fu Panda 4",
    posterUrl: "https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/1XDDXPXGiI8id7MrUxK36ke7gkX.jpg",
    trailerYoutubeId: "_inKs4eeHiI",
    genres: ["Hoạt hình", "Hành động", "Hài"],
    durationMinutes: 94,
    rating: 7.1,
    ageRating: "P",
    ageLabel: "Phim phù hợp với mọi lứa tuổi",
    formats: ["2D Lồng tiếng", "2D Phụ đề"],
    status: "now_showing",
    releaseDate: "08/03/2026",
    director: "Mike Mitchell",
    cast: ["Jack Black", "Awkwafina", "Viola Davis", "Dustin Hoffman"],
    synopsis:
      "Sau ba cuộc phiêu lưu nguy hiểm, chú gấu Po được định mệnh gọi tên để trở thành Thủ lĩnh Tinh thần của Thung lũng Bình Yên và phải đào tạo một Chiến binh Rồng mới.",
    isHot: false,
  },

  // Sắp chiếu
  {
    id: "m-7",
    title: "Joker: Điên Có Đôi",
    originalTitle: "Joker: Folie à Deux",
    posterUrl: "https://image.tmdb.org/t/p/w500/aciP8Km0waTLXEYf5zyRnl2njup.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/uGmYq0OIqi9QDUhs89phEj7nnFL.jpg",
    trailerYoutubeId: "_OKAwz2NiJs",
    genres: ["Tâm lý", "Âm nhạc", "Tội phạm"],
    durationMinutes: 138,
    rating: 7.8,
    ageRating: "T18",
    ageLabel: "Phim dành cho khán giả từ đủ 18 tuổi trở lên",
    formats: ["IMAX 2D", "2D Phụ đề"],
    status: "coming_soon",
    releaseDate: "04/10/2026",
    director: "Todd Phillips",
    cast: ["Joaquin Phoenix", "Lady Gaga", "Brendan Gleeson", "Catherine Keener"],
    synopsis:
      "Arthur Fleck đang bị giam giữ tại Arkham để chờ xét xử. Giữa cuộc chiến với nhân cách kép, anh không chỉ gặp được tình yêu đích thực mà còn tìm thấy giai điệu luôn ẩn sâu bên trong mình.",
    isHot: true,
  },
  {
    id: "m-8",
    title: "Võ Sĩ Giác Đấu 2",
    originalTitle: "Gladiator II",
    posterUrl: "https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/euYIwmwkmz95mnXvufEmbL69ovr.jpg",
    trailerYoutubeId: "4rgYUipGJNo",
    genres: ["Hành động", "Phiêu lưu", "Lịch sử"],
    durationMinutes: 148,
    rating: 8.2,
    ageRating: "T18",
    ageLabel: "Phim dành cho khán giả từ đủ 18 tuổi trở lên",
    formats: ["IMAX 2D", "2D Phụ đề"],
    status: "coming_soon",
    releaseDate: "15/11/2026",
    director: "Ridley Scott",
    cast: ["Paul Mescal", "Pedro Pascal", "Denzel Washington", "Connie Nielsen"],
    synopsis:
      "Nhiều năm sau cái chết của Maximus, Lucius - cháu trai của Hoàng đế Commodus - buộc phải bước vào Đấu trường La Mã khi quê hương bị xâm chiếm bởi các bạo chúa.",
    isHot: false,
  },
  {
    id: "m-9",
    title: "Hành Trình Của Moana 2",
    originalTitle: "Moana 2",
    posterUrl: "https://image.tmdb.org/t/p/w500/yh64qw9mgXBvlaWDi7Q9tpUBAvH.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/tElnmtQ6yz1PjN1kePNl8yMSb59.jpg",
    trailerYoutubeId: "hDZ7y8RP5HE",
    genres: ["Hoạt hình", "Phiêu lưu", "Âm nhạc"],
    durationMinutes: 100,
    rating: 7.9,
    ageRating: "P",
    ageLabel: "Phim phù hợp với mọi lứa tuổi",
    formats: ["2D Lồng tiếng", "3D Phụ đề"],
    status: "coming_soon",
    releaseDate: "27/11/2026",
    director: "David G. Derrick Jr.",
    cast: ["Auli'i Cravalho", "Dwayne Johnson", "Alan Tudyk"],
    synopsis:
      "Nhận được lời kêu gọi bất ngờ từ các tổ tiên, Moana cùng Maui và thủy thủ đoàn mới bắt đầu chuyến hải trình đến những vùng biển xa xôi đầy hiểm nguy của Châu Đại Dương.",
    isHot: false,
  },
  {
    id: "m-10",
    title: "Thợ Săn Kraven",
    originalTitle: "Kraven the Hunter",
    posterUrl: "https://image.tmdb.org/t/p/w500/1GvOWMHPt2m9DT4qYkJJuSD7SQU.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/v9acaWV9Jh4R5Tp2mu1QhA79ihp.jpg",
    trailerYoutubeId: "rze8QYwWGMs",
    genres: ["Hành động", "Phiêu lưu", "Khoa học viễn tưởng"],
    durationMinutes: 127,
    rating: 7.5,
    ageRating: "T18",
    ageLabel: "Phim dành cho khán giả từ đủ 18 tuổi trở lên",
    formats: ["2D Phụ đề", "IMAX 2D"],
    status: "coming_soon",
    releaseDate: "13/12/2026",
    director: "J.C. Chandor",
    cast: ["Aaron Taylor-Johnson", "Russell Crowe", "Ariana DeBose"],
    synopsis:
      "Câu chuyện về nguồn gốc đẫm máu của một trong những nhân vật phản diện mang tính biểu tượng nhất của vũ trụ Người Nhện - thợ săn tối thượng Sergei Kravinoff.",
    isHot: false,
  },
];

export const THEATERS: Theater[] = [
  {
    id: "th-1",
    name: "CineFlow Cầu Giấy",
    address: "Tầng 4, Discovery Complex, 302 Cầu Giấy, Hà Nội",
    city: "Hà Nội",
    phone: "024 7300 8899",
    roomsCount: 8,
    schedules: [
      {
        movieId: "m-1",
        showtimes: [
          { id: "st-101", time: "10:30", format: "2D Phụ đề", room: "Screen 01", price: 95000 },
          { id: "st-102", time: "14:15", format: "IMAX 2D", room: "IMAX Hall", price: 160000 },
          { id: "st-103", time: "18:00", format: "IMAX 2D", room: "IMAX Hall", price: 180000 },
          { id: "st-104", time: "21:30", format: "2D Phụ đề", room: "Screen 03", price: 110000 },
        ],
      },
      {
        movieId: "m-2",
        showtimes: [
          { id: "st-105", time: "09:45", format: "2D Lồng tiếng", room: "Screen 02", price: 85000 },
          { id: "st-106", time: "13:30", format: "2D Phụ đề", room: "Screen 02", price: 95000 },
          { id: "st-107", time: "16:00", format: "3D Phụ đề", room: "Screen 04", price: 120000 },
          { id: "st-108", time: "19:15", format: "2D Lồng tiếng", room: "Screen 05", price: 105000 },
        ],
      },
      {
        movieId: "m-3",
        showtimes: [
          { id: "st-109", time: "12:00", format: "2D Phụ đề", room: "Screen 06", price: 95000 },
          { id: "st-110", time: "15:45", format: "IMAX 2D", room: "IMAX Hall", price: 160000 },
          { id: "st-111", time: "20:30", format: "2D Phụ đề", room: "Screen 01", price: 110000 },
        ],
      },
      {
        movieId: "m-4",
        showtimes: [
          { id: "st-112", time: "17:30", format: "IMAX 2D", room: "Screen 03", price: 175000 },
          { id: "st-113", time: "21:00", format: "2D Phụ đề", room: "Screen 07", price: 115000 },
        ],
      },
    ],
  },
  {
    id: "th-2",
    name: "CineFlow Royal City",
    address: "Tầng B2, Vincom Mega Mall Royal City, Thanh Xuân, Hà Nội",
    city: "Hà Nội",
    phone: "024 6664 1234",
    roomsCount: 10,
    schedules: [
      {
        movieId: "m-1",
        showtimes: [
          { id: "st-201", time: "11:15", format: "IMAX 2D", room: "IMAX Laser", price: 170000 },
          { id: "st-202", time: "15:00", format: "2D Phụ đề", room: "Screen 02", price: 95000 },
          { id: "st-203", time: "19:45", format: "IMAX 2D", room: "IMAX Laser", price: 190000 },
        ],
      },
      {
        movieId: "m-2",
        showtimes: [
          { id: "st-204", time: "10:00", format: "2D Lồng tiếng", room: "Screen 01", price: 90000 },
          { id: "st-205", time: "14:30", format: "2D Phụ đề", room: "Screen 05", price: 100000 },
          { id: "st-206", time: "18:20", format: "3D Phụ đề", room: "Screen 03", price: 130000 },
        ],
      },
      {
        movieId: "m-3",
        showtimes: [
          { id: "st-207", time: "13:00", format: "2D Phụ đề", room: "Screen 04", price: 100000 },
          { id: "st-208", time: "17:15", format: "2D Phụ đề", room: "Screen 04", price: 110000 },
          { id: "st-209", time: "21:45", format: "2D Phụ đề", room: "Screen 01", price: 115000 },
        ],
      },
    ],
  },
  {
    id: "th-3",
    name: "CineFlow Landmark 81",
    address: "Tầng B1, Vincom Center Landmark 81, Bình Thạnh, TP.HCM",
    city: "TP. Hồ Chí Minh",
    phone: "028 7300 2233",
    roomsCount: 12,
    schedules: [
      {
        movieId: "m-1",
        showtimes: [
          { id: "st-301", time: "10:15", format: "IMAX 2D", room: "IMAX Grand", price: 185000 },
          { id: "st-302", time: "14:00", format: "2D Phụ đề", room: "Screen 02", price: 105000 },
          { id: "st-303", time: "18:30", format: "IMAX 2D", room: "IMAX Grand", price: 210000 },
          { id: "st-304", time: "22:15", format: "2D Phụ đề", room: "Screen 03", price: 115000 },
        ],
      },
      {
        movieId: "m-2",
        showtimes: [
          { id: "st-305", time: "09:30", format: "2D Lồng tiếng", room: "Screen 04", price: 95000 },
          { id: "st-306", time: "13:15", format: "2D Phụ đề", room: "Screen 04", price: 105000 },
          { id: "st-307", time: "17:00", format: "3D Phụ đề", room: "Screen 05", price: 140000 },
        ],
      },
      {
        movieId: "m-4",
        showtimes: [
          { id: "st-308", time: "16:15", format: "IMAX 2D", room: "IMAX Grand", price: 195000 },
          { id: "st-309", time: "20:45", format: "2D Phụ đề", room: "Screen 01", price: 120000 },
        ],
      },
    ],
  },
  {
    id: "th-4",
    name: "CineFlow Hùng Vương Plaza",
    address: "Tầng 7, Hùng Vương Plaza, 126 Hồng Bàng, Quận 5, TP.HCM",
    city: "TP. Hồ Chí Minh",
    phone: "028 3855 6677",
    roomsCount: 7,
    schedules: [
      {
        movieId: "m-3",
        showtimes: [
          { id: "st-401", time: "11:45", format: "2D Phụ đề", room: "Screen 01", price: 90000 },
          { id: "st-402", time: "15:30", format: "2D Phụ đề", room: "Screen 01", price: 100000 },
          { id: "st-403", time: "19:00", format: "2D Phụ đề", room: "Screen 02", price: 110000 },
        ],
      },
      {
        movieId: "m-5",
        showtimes: [
          { id: "st-404", time: "13:45", format: "3D Phụ đề", room: "Screen 03", price: 125000 },
          { id: "st-405", time: "18:15", format: "2D Phụ đề", room: "Screen 03", price: 100000 },
        ],
      },
    ],
  },
];

export const PROMOTIONS: Promotion[] = [
  {
    id: "promo-1",
    badge: "HỘI VIÊN MỚI",
    title: "Tặng Ngay Combo Bắp Nước Khi Đăng Ký Tài Khoản",
    description: "Đăng ký thành viên CineFlow nhận ngay mã giảm giá 100% bắp nước cho lần đặt vé đầu tiên.",
    code: "WELCOME-POP",
    validUntil: "31/12/2026",
    image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=700&q=80",
    accentColor: "#ef4444",
  },
  {
    id: "promo-2",
    badge: "HAPPY WEDNESDAY",
    title: "Thứ 4 Vui Vẻ - Đồng Giá Vé 55.000đ Toàn Hệ Thống",
    description: "Tất cả các suất chiếu 2D vào ngày Thứ 4 hàng tuần chỉ với 55.000đ cho mọi cụm rạp CineFlow.",
    validUntil: "Hàng tuần",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=80",
    accentColor: "#f59e0b",
  },
  {
    id: "promo-3",
    badge: "STRIPE PAY",
    title: "Giảm 20.000đ Khi Thanh Toán Trực Tuyến Qua Stripe",
    description: "Nhập mã STRIPE20 khi thanh toán bằng thẻ Visa/Mastercard để được giảm trực tiếp trên tổng hoá đơn.",
    code: "STRIPE20",
    validUntil: "30/11/2026",
    image: "https://images.unsplash.com/photo-1556742049-0a67e557224f?auto=format&fit=crop&w=700&q=80",
    accentColor: "#6366f1",
  },
  {
    id: "promo-4",
    badge: "HỌC SINH - SINH VIÊN",
    title: "Ưu Đãi HSSV & U22 - Vé Phim Chỉ Từ 50.000đ",
    description: "Xuất trình thẻ học sinh/sinh viên hoặc CMND/CCCD dưới 22 tuổi tại quầy để áp dụng mức giá đặc quyền.",
    validUntil: "Không giới hạn",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=700&q=80",
    accentColor: "#10b981",
  },
];
