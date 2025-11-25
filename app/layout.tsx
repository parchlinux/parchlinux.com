import Footer from "@/components/custom/layouts/footer";
import Header from "@/components/custom/layouts/header";
import { ThemeProvider } from "@/components/theme-provider";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { Saira } from "next/font/google";
import "./globals.css";

const sairaSans = Saira({
  variable: "--font-saira-sans",
  subsets: ["latin"],
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body
        className={`${sairaSans.variable} ${sairaSans.className} antialiased relative overflow-x-hidden min-h-screen flex flex-col`}
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
