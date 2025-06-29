import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Menu from "@/components/menu/Menu";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shenal Gunaskera - Portfolio",
  description: "Full Stack Developer & Creative Technologist",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Menu />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
