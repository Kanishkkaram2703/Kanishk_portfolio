import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

/* Single font family: Space Grotesk (closest to Satoshi/General Sans on Google Fonts)
   Weight 300-900, used for headings AND body */
const satoshi = Space_Grotesk({
  variable: "--font-satoshi",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kanishk Portfolio",
  description:
    "AI Engineer • Machine Learning • Computer Vision • LLMs • Data Science • Full Stack AI Developer",
  applicationName: "Kanishk Portfolio",
  keywords: [
    "Kanishk Karam",
    "AI Engineer",
    "Machine Learning",
    "Deep Learning",
    "Data Science",
    "Computer Vision",
    "LLMs",
    "Portfolio",
  ],
  authors: [{ name: "Kanishk Karam" }],
  icons: {
    icon: "/icon/icon.png",
    apple: "/icon/icon.png",
  },
  openGraph: {
    title: "Kanishk Portfolio",
    description:
      "AI Engineer • Machine Learning • Computer Vision • LLMs • Data Science • Full Stack AI Developer",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    title: "Kanishk Portfolio",
    description:
      "AI Engineer • Machine Learning • Computer Vision • LLMs • Data Science • Full Stack AI Developer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={satoshi.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon/icon.png" />
        {/* Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            const t = localStorage.getItem('kp-theme') || 'dark';
            document.documentElement.setAttribute('data-theme', t);
          } catch(e) {
            document.documentElement.setAttribute('data-theme', 'dark');
          }
        ` }} />
      </head>
      <body
        className="noise-overlay"
        style={{
          background: "var(--bg, #050505)",
          color: "var(--text, #FFFFFF)",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        {children}
      </body>
    </html>
  );
}
