import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SceneCard from '@/components/SceneCard';
import { getAllScenes } from '@/lib/cosmic';

export default async function ScenesPage() {
  const scenes = await getAllScenes();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <p className="text-fire text-sm tracking-[0.3em] mb-2 font-semibold">
              LA HISTORIA COMPLETA
            </p>
            <h1 className="font-display text-5xl md:text-6xl tracking-wider mb-4">
              TODAS LAS ESCENAS
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Sigue el épico viaje escena por escena. Cada momento cuenta una historia.
            </p>
          </div>

          {scenes.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400">No hay escenas disponibles aún.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scenes.map((scene) => (
                <SceneCard key={scene.id} scene={scene} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}