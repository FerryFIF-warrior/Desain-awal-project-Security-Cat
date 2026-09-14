import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Security Cat | CyberAttack Simulator Edu',
  description:
    'Simulator edukasi keamanan siber UNS Vokasi D3 TI Madiun. Semua data dummy, tanpa kode serangan nyata.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body
        className={inter.className}
        style={{ background: '#0f131d', color: '#e8ecf4', margin: 0, fontFamily: 'Inter, sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
