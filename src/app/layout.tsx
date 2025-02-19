import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RootStyleRegistry from "./mantine";
import { NavBar } from "./_components/nav-bar";

// core styles are required for all packages
import '@mantine/core/styles.css';
import Footer from "./_components/footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zare Innovations",
  description: "Zare Innovations | Revolutionize Your Business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <RootStyleRegistry>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            <NavBar/>
          {children}
          <Footer/>
        </body>
      </RootStyleRegistry>
    </html>
  );
}
