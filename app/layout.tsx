import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KLU Timetable Portal",
  description: "Student Timetable Portal - Amrita Vishwa Vidyapeetham, Bengaluru",
  openGraph: {
    title: "KLU Timetable Portal",
    description: "Smart student portal for Amrita Vishwa Vidyapeetham",
    url: "https://timetable-portal.vercel.app",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}