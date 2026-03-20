import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import Footer from "@/components/Footer";
import "./globals.css";

// Import Source Serif Pro font family
const sourceSerifPro = localFont({
  src: [
    {
      path: "../fonts/source-serif-pro-extralight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/source-serif-pro-light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/source-serif-pro-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/source-serif-pro-semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/source-serif-pro-bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/source-serif-pro-black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-source-serif",
  display: "swap",
});

// Import YoungSerif font family
const youngSerif = localFont({
  src: [
    {
      path: "../fonts/YoungSerif-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/YoungSerif-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/YoungSerif-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/YoungSerif-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/YoungSerif-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/YoungSerif-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/YoungSerif-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/YoungSerif-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-young-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kion — Family Cookbook",
  description: "A family's culinary legacy, preserved and shared.",
  openGraph: {
    title: "Kion — Family Cookbook",
    description: "A family's culinary legacy, preserved and shared.",
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'Kion',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceSerifPro.variable} ${youngSerif.variable}`}>
      <body className="antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}

