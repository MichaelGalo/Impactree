import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeWrapper } from "../components/ThemeWrapper";
import { AuthProvider } from "@/context/AuthContext";
import { NextUIAppProvider } from "@/providers/nextui-provider";

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
  title: "Impactree",
  description: "Sow Seeds of Hope",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <ThemeWrapper>
            <NextUIAppProvider>
                {children}
            </NextUIAppProvider>
            </ThemeWrapper>
          </AuthProvider>
      </body>
    </html>
  );
}