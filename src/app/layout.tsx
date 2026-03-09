import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Atelier Quiet',
  description: 'Mobile-first brand showcase homepage MVP'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
