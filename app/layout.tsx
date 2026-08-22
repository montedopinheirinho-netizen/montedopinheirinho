import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://montedopinheirinho.com'),
  title: "Monte do Pinheirinho | Alojamento Local em Santiago do Cacém",
  description: "Refúgio exclusivo com 6 hectares, 5 quartos e piscina privada em Santiago do Cacém, Alentejo. A 1h15 de Lisboa e 20 min da Costa Vicentina.",
  keywords: ["Alojamento Local Alentejo", "Monte em Santiago do Cacém", "Casas de férias com piscina Alentejo", "Turismo rural Costa Vicentina"],
  openGraph: {
    title: "Monte do Pinheirinho | Alojamento Exclusivo no Alentejo",
    description: "Privacidade absoluta, piscina exterior e conforto contemporâneo a minutos da Costa Vicentina.",
    url: 'https://montedopinheirinho.com',
    siteName: 'Monte do Pinheirinho',
    locale: 'pt_PT',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org JSON-LD para SEO Local
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "Monte do Pinheirinho",
    "image": "https://montedopinheirinho.com/foto-hero.png",
    "@id": "https://montedopinheirinho.com",
    "url": "https://montedopinheirinho.com",
    "telephone": "+351900000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Foros do Moinho",
      "addressLocality": "Santiago do Cacém",
      "postalCode": "7540-000",
      "addressCountry": "PT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.9011002,
      "longitude": -8.5109246
    },
    "priceRange": "€€€",
    "starRating": {
      "@type": "Rating",
      "ratingValue": "9.3"
    }
  };

  return (
    <html lang="pt">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-stone-50 text-stone-900 antialiased`}>
        <Header />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}