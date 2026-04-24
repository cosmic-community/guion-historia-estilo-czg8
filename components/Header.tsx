import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-shadow-dark/80 border-b border-fire/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-3xl">🔥</span>
          <span className="font-display text-2xl tracking-wider bg-gradient-to-r from-fire to-fire-light bg-clip-text text-transparent">
            GUION HISTORIA
          </span>
        </Link>
        <nav className="flex gap-6 items-center">
          <Link href="/" className="text-sm font-medium hover:text-fire transition-colors">
            Inicio
          </Link>
          <Link href="/scenes" className="text-sm font-medium hover:text-fire transition-colors">
            Escenas
          </Link>
          <Link href="/characters" className="text-sm font-medium hover:text-fire transition-colors">
            Personajes
          </Link>
        </nav>
      </div>
    </header>
  );
}