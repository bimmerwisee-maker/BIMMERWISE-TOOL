import type { Metadata, Viewport } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Archivo({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BimmerWise Booking",
  description:
    "Book service, track vehicle progress, and share shop photo updates with customers.",
  appleWebApp: {
    capable: true,
    title: "BimmerWise",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e1218",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
