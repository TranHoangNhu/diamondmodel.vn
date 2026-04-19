import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/ui/FloatingContact";

export default function AppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-[50px]">{children}</main>
      <Footer />
      <FloatingContact />
    </>
  );
}
