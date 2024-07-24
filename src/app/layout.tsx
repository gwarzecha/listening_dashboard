import type { Metadata } from 'next';
import '../styles/globals.css';
import {
  Source_Code_Pro,
  Fira_Code,
  Inconsolata,
  Montserrat,
} from 'next/font/google';

const sourceCodePro = Source_Code_Pro({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-sourcecode',
});

const firaCode = Fira_Code({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-firacode',
});

const inconsolata = Inconsolata({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-inconsolata',
});

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Top Spotify Dashboard',
  description: 'A dashboard to quickly see your top Spotify artists',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${sourceCodePro.variable} ${firaCode.variable} ${inconsolata.variable} ${montserrat.variable}`}
      lang="en"
    >
      <body className="min-h-screen bg-gray-500">{children}</body>
    </html>
  );
}
