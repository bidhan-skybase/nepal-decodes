import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchOverlay from "@/components/SearchOverlay";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nepal Decodes — Premium Digital Journalism",
  description: "An independent digital media platform dedicated to thoughtful, investigative journalism, explainers, politics, culture, and society in Nepal.",
  metadataBase: new URL("https://nepaldecodes.com"),
  openGraph: {
    title: "Nepal Decodes — Premium Digital Journalism",
    description: "An independent digital media platform dedicated to thoughtful, investigative journalism, explainers, politics, culture, and society in Nepal.",
    type: "website",
    locale: "en_US",
    siteName: "Nepal Decodes",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nepal Decodes — Premium Digital Journalism",
    description: "An independent digital media platform dedicated to thoughtful, investigative journalism, explainers, politics, culture, and society in Nepal.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        {/* Anti-flicker dark mode script */}
        {/*<script*/}
        {/*  dangerouslySetInnerHTML={{*/}
        {/*    __html: `*/}
        {/*      (function() {*/}
        {/*        try {*/}
        {/*          var theme = localStorage.getItem('theme');*/}
        {/*          if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {*/}
        {/*            document.documentElement.classList.add('dark-theme');*/}
        {/*          } else {*/}
        {/*            document.documentElement.classList.remove('dark-theme');*/}
        {/*          }*/}
        {/*        } catch (e) {}*/}
        {/*      })()*/}
        {/*    `,*/}
        {/*  }}*/}
        {/*/>*/}
      </head>
      <body>
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        <SearchOverlay />
      </body>
    </html>
  );
}
