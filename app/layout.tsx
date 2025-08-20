import type { Metadata } from "next";
import "./globals.css";
import Header from "@/src/presentation/components/organisms/Header";
import Footer from "@/src/presentation/components/organisms/Footer";
import { ThemeProvider } from "@/src/presentation/contexts/ThemeContext";
import portfolioConfig from "@/src/data/content/portfolio-config.json";

export const metadata: Metadata = {
  title: `${portfolioConfig.personal.name} - ${portfolioConfig.personal.title}`,
  description: portfolioConfig.personal.bio,
  keywords: ["Brand Designer", "UI/UX Designer", "Portfolio", "Design", "Pakistan", "Karachi"],
  authors: [{ name: portfolioConfig.personal.name, url: portfolioConfig.social.linkedin }],
  creator: portfolioConfig.personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hudakhan.design",
    title: `${portfolioConfig.personal.name} - ${portfolioConfig.personal.title}`,
    description: portfolioConfig.personal.bio,
    siteName: `${portfolioConfig.personal.name} Portfolio`,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${portfolioConfig.personal.name} - Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolioConfig.personal.name} - ${portfolioConfig.personal.title}`,
    description: portfolioConfig.personal.bio,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <Header navigation={portfolioConfig.navigation} />
          <main className="relative">
            {children}
          </main>
          <Footer 
            personal={portfolioConfig.personal}
            social={portfolioConfig.social}
            navigation={portfolioConfig.navigation}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
