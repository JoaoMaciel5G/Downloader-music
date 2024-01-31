import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"] });

export const metadata: Metadata = {
  title: "Downloader de Musicas e videos",
  description: "App de download de musicas e videos do youtube",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
