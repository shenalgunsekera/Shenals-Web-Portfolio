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
  title: "Shenal Gunaskera - Full Stack Developer",
  description: "Portfolio website showcasing my work as a Full Stack Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical images */}
        <link rel="preload" as="image" href="/images/bg1.jpeg" />
        <link rel="preload" as="image" href="/images/dark.png.jpg" />
        <link rel="preload" as="image" href="/images/light.jpg" />
        <link rel="preload" as="image" href="/images/js/1.png" />
        <link rel="preload" as="image" href="/images/j/1.png" />
        <link rel="preload" as="image" href="/images/t/1.png" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.emailjs.com" />
      </head>
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
