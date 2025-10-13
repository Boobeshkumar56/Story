import type { Metadata } from "next";
import { Dancing_Script, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "../components/ConditionalNavbar";

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stories by Mithu Ashwin - Professional Photography",
  description: "Award-winning photographer who believes in stories; stories of love, laughter and happily ever after. Based in Coonoor, Nilgiris.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dancingScript.variable} ${playfair.variable} ${inter.variable} antialiased bg-white text-black`}
      >
        <ConditionalNavbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
