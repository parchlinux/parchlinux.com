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
    <html className="h-full" lang={locale}>
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
            <div className="bg-grid z-[-1] absolute w-[150%] h-190 opacity-5 -top-44 -left-10 pointer-events-none" />
            <Header />
            <div className="mt-32 flex-1">{children}</div>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
