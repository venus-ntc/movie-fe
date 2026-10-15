"use client";

import { useId } from "react";

export default function MovieSearchInput({ value, onChange, label = "Tìm phim", placeholder = "Nhập tên phim Việt hoặc tên gốc…" }: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}) {
  const id = useId();
  return <div role="search" aria-label={label} className="w-full sm:max-w-md">
    <label htmlFor={id} className="mb-2 block text-xs font-semibold text-neutral-300">{label}</label>
    <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-neutral-950/70 px-4 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/15">
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="shrink-0 text-red-400"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
      <input id={id} type="search" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} autoComplete="off" className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-neutral-500 [&::-webkit-search-cancel-button]:hidden" />
      {value && <button type="button" onClick={() => onChange("")} aria-label="Xóa từ khóa tìm phim" className="rounded px-1 py-1 text-sm text-neutral-400 hover:text-white focus-visible:outline-2 focus-visible:outline-red-400">×</button>}
    </div>
  </div>;
}
