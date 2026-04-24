// app/scenes/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSceneBySlug, getAllScenes } from '@/lib/cosmic';
import { getMetafieldValue } from '@/types';

export default async function ScenePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scene = await getSceneBySlug(slug);

  if (!scene) {
    notFound();
  }

  const allScenes = await getAllScenes();
  const currentIndex = allScenes.findIndex((s) => s.id === scene.id);
  const prevScene = currentIndex > 0 ? allScenes[currentIndex - 1] : null;
  const nextScene = currentIndex < allScenes.length - 1 ? allScenes[currentIndex + 1] : null;

  const sceneNumber = scene.metadata?.scene_number;
  const subtitle = scene.metadata?.subtitle;
  const description = scene.metadata?.visual_description;
  const image = scene.metadata?.scene_image;
  const mood = getMetafieldValue(scene.metadata?.mood);
  const charactersInScene = scene.metadata?.characters_in_scene || [];

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Image */}
        {image && (
          <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
            <img
              src={`${image.imgix_url}?w=2400&h=1200&fit=crop&auto=format,compress`}
              alt={scene.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-shadow-dark via-shadow-dark/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
              {sceneNumber && (
                <span className="inline-block px-4 py-2 bg-fire text-white text-sm font-bold rounded-full mb-4">
                  ESCENA {sceneNumber}
                </span>
              )}
              <h1 className="font-display text-4xl md:text-7xl tracking-wider">
                {scene.title}
              </h1>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {!image && (
            <div className="mb-8">
              {sceneNumber && (
                <span className="inline-block px-4 py-2 bg-fire text-white text-sm font-bold rounded-full mb-4">
                  ESCENA {sceneNumber}
                </span>
              )}
              <h1 className="font-display text-4xl md:text-6xl tracking-wider">
                {scene.title}
              </h1>
            </div>
          )}

          {mood && (
            <div className="mb-6">
              <span className="px-4 py-2 bg-shadow/50 border border-shadow-purple/50 text-sm rounded-full">
                Tono: {mood}
              </span>
            </div>
          )}

          {subtitle && (
            <blockquote className="my-8 p-6 border-l-4 border-fire bg-shadow/20 rounded-r-xl">
              <p className="font-display text-2xl md:text-3xl italic tracking-wide text-fire-light">
                "{subtitle}"
              </p>
            </blockquote>
          )}

          {description && (
            <section className="mb-12">
              <h2 className="font-display text-2xl tracking-wider mb-4 text-fire">
                DESCRIPCIÓN VISUAL
              </h2>
              <p className="text-lg text-gray-200 leading-relaxed">{description}</p>
            </section>
          )}

          {charactersInScene.length > 0 && (
            <section className="mb-12">
              <h2 className="font-display text-2xl tracking-wider mb-4 text-fire">
                PERSONAJES EN ESTA ESCENA
              </h2>
              <div className="flex flex-wrap gap-3">
                {charactersInScene.map((char) => {
                  const color = char.metadata?.signature_color || '#ff6b35';
                  return (
                    <Link
                      key={char.id}
                      href={`/characters/${char.slug}`}
                      className="px-4 py-2 rounded-full border-2 hover:scale-105 transition-transform"
                      style={{ borderColor: color, color }}
                    >
                      {char.title}
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-4 mt-16 pt-8 border-t border-fire/20">
            {prevScene ? (
              <Link
                href={`/scenes/${prevScene.slug}`}
                className="p-4 border border-fire/30 rounded-xl hover:border-fire hover:bg-shadow/30 transition-all"
              >
                <p className="text-xs text-gray-400 mb-1">← ESCENA ANTERIOR</p>
                <p className="font-display tracking-wide truncate">{prevScene.title}</p>
              </Link>
            ) : (
              <div />
            )}
            {nextScene ? (
              <Link
                href={`/scenes/${nextScene.slug}`}
                className="p-4 border border-fire/30 rounded-xl hover:border-fire hover:bg-shadow/30 transition-all text-right"
              >
                <p className="text-xs text-gray-400 mb-1">SIGUIENTE ESCENA →</p>
                <p className="font-display tracking-wide truncate">{nextScene.title}</p>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}