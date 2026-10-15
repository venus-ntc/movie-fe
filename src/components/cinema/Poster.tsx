"use client";
import Image from "next/image";
import { useState } from "react";
export default function Poster({ src, title, className }: { src?: string; title: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  return <div className={className} style={{ position: "relative", overflow: "hidden", background: "linear-gradient(140deg,#49252c,#1c1720)" }}>
    <span aria-hidden="true" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "#ffffff30", fontSize: 72, fontWeight: 800 }}>{title[0]}</span>
    {src && !failed && <Image src={src} alt={`Poster ${title}`} width={500} height={750} unoptimized onError={() => setFailed(true)} style={{ width: "100%", height: "100%", objectFit: "cover", position: "relative" }} />}
  </div>;
}
