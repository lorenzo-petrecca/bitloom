import { Inter, JetBrains_Mono, Micro_5 } from "next/font/google";
import PWARegister from "@/components/PWARegister";
import "./globals.css";
import "@/styles/typography.css";
import "@/styles/buttons.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const pixel = Micro_5({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: ['400'],
});

export const metadata = {
  title: "Bitloom",
  description: "Pixel matrix editor",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.webp",
    shortcut: "/icons/bitloom-logo_192x192.webp",
    apple: "/icons/bitloom-logo_192x192.webp"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.variable} ${jetBrainsMono.variable} ${pixel.variable}`}>
        <PWARegister />
        {children}
      </body>
    </html>
  );
}
