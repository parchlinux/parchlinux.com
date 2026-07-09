import Footer from "@/components/custom/layouts/footer";
import Header from "@/components/custom/layouts/header";
import { ThemeProvider } from "@/components/theme-provider";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Saira } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/layouts/app-sidebar";

const sairaSans = Saira({
  variable: "--font-saira-sans",
  subsets: ["latin"],
});

const Estedad = localFont({
  src: [
    {
      path: "../../public/fonts/Estedad-Light.woff2",
      weight: "300",
    },
    {
      path: "../../public/fonts/Estedad-Medium.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/Estedad-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--Estedad",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return {
    title: "Parch GNU/Linux",
    description: "Parch Linux is a Persian Arch-based Linux distribution that provides a streamlined, user-friendly experience with full Persian language support.",
    metadataBase: new URL("https://parchlinux.com"),
    alternates: {
      canonical: `https://parchlinux.com/${locale}`,
      languages: {
        en: "https://parchlinux.com/en",
        fa: "https://parchlinux.com/fa",
      },
    },
    openGraph: {
      title: "Parch GNU/Linux",
      description: "A Persian Arch-based Linux distribution — streamlined, user-friendly, and community-driven.",
      url: `https://parchlinux.com/${locale}`,
      siteName: "Parch GNU/Linux",
      locale: locale === "fa" ? "fa_IR" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  console.log("locale", locale);
  return (
    <html
      className="h-full overflow-x-hidden"
      lang={locale}
      dir={locale === "en" ? "ltr" : "rtl"}
      suppressHydrationWarning
    >
      <body
        className={`${
          locale === "en" ? sairaSans.variable : Estedad.variable
        } ${
          locale === "en" ? sairaSans.className : Estedad.className
        } antialiased relative overflow-x-hidden min-h-screen flex flex-col`}
      >
        <NextIntlClientProvider>
          <ThemeProvider defaultTheme="system">
            <SidebarProvider defaultOpen={false}>
              <div className="relative min-h-screen flex flex-col overflow-hidden">
                <AppSidebar />
                <div className="bg-grid z-[-1] absolute w-[150%] h-190 opacity-5 -top-44 -left-10 pointer-events-none" />
                <Header />
                <div className="md:mt-32 mt-28 flex-1">{children}</div>
                <Footer />
                <div className="bg-grid-reverse z-[-1] absolute w-[150%] h-190 opacity-5 md:-bottom-85 bottom-0 -left-20 pointer-events-none" />
              </div>
            </SidebarProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
