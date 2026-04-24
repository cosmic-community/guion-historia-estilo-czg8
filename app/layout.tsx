import type { Metadata } from 'next';
import './globals.css';
import CosmicBadge from '@/components/CosmicBadge';

export const metadata: Metadata = {
  title: 'Guion Historia - Anime Story',
  description: 'The epic anime tale of CHISPITAS, Yassbat14, and NickJR',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string;

  return (
    <html lang="es">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔥</text></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className="min-h-screen bg-shadow-dark text-white">
        {children}
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  );
}