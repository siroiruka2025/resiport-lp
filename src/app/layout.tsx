import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "ResiPort｜1〜50戸のオーナー専用の、ちょうどいいアプリ。";
const DESCRIPTION =
  "入居者対応、今日からアプリで。大規模向けは要らない。1〜50戸のための管理アプリ。";
const SITE_URL = "https://resiport-lp.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,

  // icon.png を自動使用（明示指定しなくてOK）
  // public/icon.png があればこれで十分

  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "ResiPort",
    locale: "ja_JP",
    images: [
      {
        url: "/ogp-resiport.png",
        width: 1200,
        height: 630,
        alt: "ResiPort",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/ogp-resiport.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
