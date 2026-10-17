import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: "../../public/fonts/manrope-latin.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://techpac-digital-experience.arc-ai-agencylk.chatgpt.site"),
  title: "Tech Pacific — Technology, working for you.",
  description:
    "Global capability. Local accountability. Explore SAP, eZuite ERP, Vertiv infrastructure, cloud, business applications and security with Tech Pacific, Sri Lanka.",
  openGraph: {
    title: "Tech Pacific — Technology, working for you.",
    description: "Your next chapter starts with a more connected business.",
    images: [{ url: "/images/connected-flow.webp", width: 2000, height: 770 }],
    type: "website",
    locale: "en_LK",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#f5f5f0", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
