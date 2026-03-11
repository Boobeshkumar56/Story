import type { Metadata } from "next";
import { Dancing_Script, Playfair_Display, Inter, Allura } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "../components/ConditionalNavbar";

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
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
  metadataBase: new URL('https://storiesbymithuashwin.com'),
  title: {
    default: 'Stories by Mithu Ashwin - Professional Photography',
    template: '%s | Stories by Mithu Ashwin',
  },
  description: 'Award-winning photographer who believes in stories; stories of love, laughter and happily ever after. Based in Coonoor, Nilgiris.',
  keywords: ['photography', 'wedding photography', 'portrait photography', 'Coonoor', 'Nilgiris', 'Mithu Ashwin', 'event photography', 'Tamil Nadu photographer', 'One Way Art Studio'],
  authors: [{ name: 'Mithu Ashwin' }],
  creator: 'Mithu Ashwin',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://storiesbymithuashwin.com',
    siteName: 'Stories by Mithu Ashwin',
    title: 'Stories by Mithu Ashwin - Professional Photography',
    description: 'Award-winning photographer who believes in stories; stories of love, laughter and happily ever after. Based in Coonoor, Nilgiris.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Stories by Mithu Ashwin Photography' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stories by Mithu Ashwin - Professional Photography',
    description: 'Award-winning photographer who believes in stories; stories of love, laughter and happily ever after. Based in Coonoor, Nilgiris.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dancingScript.variable} ${allura.variable} ${playfair.variable} ${inter.variable} antialiased bg-white text-black`}
      >
        <ConditionalNavbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
