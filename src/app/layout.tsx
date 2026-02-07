import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { NavigationBar } from "@/components/layout/NavigationBar";
import { BreakingNewsTicker } from "@/components/layout/BreakingNewsTicker";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SPNG Media - Portal de Noticias",
    template: "%s | SPNG Media",
  },
  description:
    "Informacion confiable y actualizada. Noticias de Chile, internacionales, deportivas y mas.",
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <BreakingNewsTicker />
        <NavigationBar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
