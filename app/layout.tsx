import type { Metadata } from "next";
import Link from "next/link";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"] });
const serif = Fraunces({ variable: "--font-serif", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Paws Welcome", template: "%s | Paws Welcome" },
  description: "Field notes for better days outside with your dog.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Paws Welcome",
    description: "More sniffing. Better weekends.",
    images: [{ url: "/og.png", width: 1732, height: 909, alt: "Paws Welcome on a paper field note over grass" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable}`}>
        <header className="site-header page-shell">
          <Link className="brand" href="/" aria-label="Paws Welcome home">
            <span className="brand-mark">PW</span>
            <span><strong>Paws Welcome</strong></span>
          </Link>
          <nav aria-label="Main navigation">
            <Link href="/">Field notes</Link>
            <Link href="/about">About</Link>
            <a href="#newsletter">Get the notes</a>
          </nav>
        </header>
        {children}
        <footer className="site-footer page-shell">
          <div className="brand footer-brand">
            <span className="brand-mark">PW</span>
            <span><strong>Paws Welcome</strong></span>
          </div>
          <p>Made for fresh air, loose plans, and dogs who stop to smell everything.</p>
          <p className="copyright">© {new Date().getFullYear()} Paws Welcome</p>
        </footer>
      </body>
    </html>
  );
}
