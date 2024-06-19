import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
const poppins = Poppins({ subsets: ["latin"],
  weight:['400','500','600','700']
 });

export const metadata: Metadata = {
  title: "Bac Club",
  description: "In house application for clubs and events",
  manifest: "/manifest.json",
  keywords: ["bac-club", "clubs", "communities", "bacancy"],
  icons: '/assets/images/logo.jpg'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      
      <body className={poppins.className}>{children}</body>
    </html>
    </ClerkProvider>
  );
}
