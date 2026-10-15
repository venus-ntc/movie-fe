import { Suspense } from "react";
import SeatSelection from "./components/SeatSelection";
export default function SeatsPage() {
  return <Suspense fallback={<div className="min-h-[60vh] bg-[#100d11] p-12 text-center text-white">Đang chuẩn bị phòng chiếu…</div>}><SeatSelection /></Suspense>;
}
