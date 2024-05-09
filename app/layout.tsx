import type { Metadata } from "next";
import { Roboto, Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "700"] });

export const metadata: Metadata = {
  title: "Glowing-stars",
  description: "Fitness is our passion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} w-full max-w-[1920px] mx-auto bg-white`}
      >
        {" "}
        <Providers>
          <Navbar />
          {children}
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
