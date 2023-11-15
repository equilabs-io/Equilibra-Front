import "./globals.css";
import type { Metadata } from "next";
import { Sora, Roboto_Mono } from "next/font/google";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Providers from "@/providers/Providers";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Equilibra",
  description: "Equilibra website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${robotoMono.variable} font-sans`}
    >
      <body className="min-h-screen">
        <Providers>{children}</Providers>
        <ToastContainer
          position="bottom-right"
          autoClose={8000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="dark"
        />
      </body>
    </html>
  );
}
