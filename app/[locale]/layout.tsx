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

export async function generateMetadata() {
  return {
    title: "Parch GNU/Linux",
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
    >
      <body
        className={`${
          locale === "en" ? sairaSans.variable : Estedad.variable
        } ${
          locale === "en" ? sairaSans.className : Estedad.className
        } antialiased relative overflow-x-hidden min-h-screen flex flex-col`}
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
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
