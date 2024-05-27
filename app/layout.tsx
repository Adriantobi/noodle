import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../css/globals.css";
import { NextAuthProvider } from "./Providers";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
