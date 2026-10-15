import { Suspense } from "react";
import MovieExplorer from "./components/MovieExplorer";
export default function MoviesPage() {
  return <Suspense fallback={<div className="min-h-[60vh] bg-[#100d11] p-12 text-center text-white">Đang chuẩn bị danh sách phim…</div>}><MovieExplorer /></Suspense>;
}
