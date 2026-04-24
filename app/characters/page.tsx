import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CharacterCard from '@/components/CharacterCard';
import { getAllCharacters } from '@/lib/cosmic';

export default async function CharactersPage() {
  const characters = await getAllCharacters();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <p className="text-fire text-sm tracking-[0.3em] mb-2 font-semibold">
              HÉROES Y VILLANOS
            </p>
            <h1 className="font-display text-5xl md:text-6xl tracking-wider mb-4">
              PERSONAJES
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Conoce a los protagonistas de esta épica saga.
            </p>
          </div>

          {characters.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400">No hay personajes disponibles aún.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}