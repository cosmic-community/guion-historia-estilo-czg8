import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SceneCard from '@/components/SceneCard';
import CharacterCard from '@/components/CharacterCard';
import { getAllScenes, getAllCharacters } from '@/lib/cosmic';

export default async function HomePage() {
  const [scenes, characters] = await Promise.all([
    getAllScenes(),
    getAllCharacters(),
  ]);

  const featuredScenes = scenes.slice(0, 6);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 gradient-hero opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(10,0,20,0.9)_100%)]" />
          <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
            <p className="text-fire-light text-sm tracking-[0.3em] mb-4 font-semibold">
              UNA HISTORIA ÉPICA ESTILO ANIME
            </p>
            <h1 className="font-display text-5xl md:text-8xl tracking-wider mb-6 leading-none">
              <span className="block bg-gradient-to-r from-fire via-fire-light to-fire bg-clip-text text-transparent">
                GUION
              </span>
              <span className="block text-white text-stroke">HISTORIA</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-8">
              Tres amigos. Un día fatídico. Poderes que cambiarían sus vidas para siempre.
              Descubre la épica saga de CHISPITAS, Yassbat14 y NickJR.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/scenes"
                className="px-8 py-3 gradient-fire text-white font-bold rounded-full hover:scale-105 transition-transform"
              >
                VER ESCENAS
              </Link>
              <Link
                href="/characters"
                className="px-8 py-3 border-2 border-white/30 hover:border-fire text-white font-bold rounded-full transition-colors"
              >
                PERSONAJES
              </Link>
            </div>
          </div>
        </section>

        {/* Characters Section */}
        {characters.length > 0 && (
          <section className="py-20 container mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-fire text-sm tracking-[0.3em] mb-2 font-semibold">
                  PROTAGONISTAS
                </p>
                <h2 className="font-display text-4xl md:text-5xl tracking-wider">
                  PERSONAJES
                </h2>
              </div>
              <Link href="/characters" className="text-fire hover:text-fire-light text-sm font-semibold">
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          </section>
        )}

        {/* Scenes Section */}
        {featuredScenes.length > 0 && (
          <section className="py-20 container mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-fire text-sm tracking-[0.3em] mb-2 font-semibold">
                  LA HISTORIA
                </p>
                <h2 className="font-display text-4xl md:text-5xl tracking-wider">
                  ESCENAS DESTACADAS
                </h2>
              </div>
              <Link href="/scenes" className="text-fire hover:text-fire-light text-sm font-semibold">
                Ver todas →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredScenes.map((scene) => (
                <SceneCard key={scene.id} scene={scene} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}