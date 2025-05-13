import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import I18nProvider from "../providers/I18nProvider";
import Navigation from "../components/navigation/Navigation";
import ThemeRegistry from "@/providers/ThemeRegistry";
import { DataProvider } from "./contexts/DataContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Hire",
  description: "AI-powered hiring platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DataProvider>
          <I18nProvider>
            <ThemeRegistry>
              <Navigation />
              <main>{children}</main>
            </ThemeRegistry>
          </I18nProvider>
        </DataProvider>
      </body>
    </html>
  );
}
