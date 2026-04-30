import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/ui/FloatingContact";
import { getCmsGeneralSettings } from "@/lib/cms-settings";

export default async function AppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const generalSettings = await getCmsGeneralSettings();
  const logoSrc = generalSettings?.siteLogo || undefined;
  const footerBadgeSrc = generalSettings?.footerBadge || undefined;

  return (
    <>
      <Header logoSrc={logoSrc} />
      <main className="flex flex-col gap-[50px]">{children}</main>
      <Footer logoSrc={logoSrc} footerBadgeSrc={footerBadgeSrc} />
      <FloatingContact />
    </>
  );
}
