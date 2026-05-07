import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Global Ferretería — Mérida, Venezuela",
  description:
    "Más de 70 años siendo tu ferretería de confianza. Nacimos en Tobar y crecimos en Mérida. Herramientas, materiales, plomería, electricidad y más.",
  keywords: "ferretería, Mérida, Venezuela, herramientas, construcción, Global Ferretería",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${inter.variable} dark`}
    >
      <body className="bg-dark text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
