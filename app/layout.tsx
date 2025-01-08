import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  applicationName: "omnizya",
  title: "Mohamed Moughamir's page",
  description: "Explore, Descover",
  authors: [{ name: "Moughamir Mohamed", url: "https://moughamir.github.io" }],
  creator: "omnizya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="MouGhamiR" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-radial from-[#480d35] to-[#17151d] relative`}
      >
        {children}
      </body>
    </html>
  );
}
