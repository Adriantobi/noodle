import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { NextAuthProvider } from "./Providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Noodle",
  description:
    "Virtual Study Spaces. With music, ambient sounds and more. Stay a while!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </NextAuthProvider>
      </body>
    </html>
  );
}
