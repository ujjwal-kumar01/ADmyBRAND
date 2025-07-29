import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ADmyBRAND Insights - Analytics Dashboard",
  description: "Modern analytics dashboard for digital marketing agencies. Track revenue, users, conversions, and campaign performance in real-time.",
  keywords: ["analytics", "dashboard", "marketing", "digital", "insights"],
  authors: [{ name: "ADmyBRAND" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased" suppressHydrationWarning={true}>
        <ThemeProvider defaultTheme="system" storageKey="admybrand-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
