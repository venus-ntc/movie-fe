import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f6f1]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
