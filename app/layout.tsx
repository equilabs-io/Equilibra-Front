import "./globals.css";
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Providers from "@/providers/Providers";

const sora = Sora({ subsets: ["latin"], display: "swap" });

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
    <html lang="en" className={`${sora.className}`}>
      <body className="min-h-screen flex">
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
