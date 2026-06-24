import type { Metadata } from 'next';
import { DM_Serif_Display, Nunito_Sans } from 'next/font/google';
import './globals.css';

const dmSerif = DM_Serif_Display({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
});

const nunitoSans = Nunito_Sans({
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Olguinhas · Comida Caseira Portuguesa',
  description: 'Comida caseira portuguesa, pronta a levar para casa. Cozinhada de raiz desde 1987. Lojas em Cascais, Estoril e Lisboa.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${dmSerif.variable} ${nunitoSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
