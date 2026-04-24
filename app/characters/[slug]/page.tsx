// app/characters/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCharacterBySlug, getAllScenes } from '@/lib/cosmic';
import { getMetafieldValue } from '@/types';

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const character = await getCharacterBySlug(slug);

  if (!character) {
    notFound();
  }

  const realName = character.metadata?.real_name;
  const alias = character.metadata?.alias;
  const alignment = getMetafieldValue(character.metadata?.alignment);
  const power = character.metadata?.power;
  const backstory = character.metadata?.backstory;
  const portrait = character.metadata?.portrait;
  const signatureColor = character.metadata?.signature_color || '#ff6b35';

  // Find scenes featuring this character
  const allScenes = await getAllScenes();
  const characterScenes = allScenes.filter((scene) =>
    scene.metadata?.characters_in_scene?.some((c) => c.id === character.id)
  );

  const alignmentBg =
    alignment === 'Hero' ? 'bg-ocean' :
    alignment === 'Villain' ? 'bg-shadow-purple' :
    'bg-gray-600';

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section
          className="py-16 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${signatureColor}20 0%, #0a0014 100%)`,
          }}
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <Link href="/characters" className="inline-block mb-6 text-sm text-gray-400 hover:text-fire">
              ← Volver a personajes
            </Link>
            <div className="grid md:grid-cols-2 gap-10 items-start">
              {portrait ? (
                <div
                  className="aspect-square rounded-2xl overflow-hidden border-4"
                  style={{ borderColor: signatureColor }}
                >
                  <img
                    src={`${portrait.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                    alt={character.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="aspect-square rounded-2xl flex items-center justify-center border-4"
                  style={{
                    background: `linear-gradient(135deg, ${signatureColor}, #0a0014)`,
                    borderColor: signatureColor,
                  }}
                >
                  <span className="font-display text-9xl text-white/60">
                    {character.title.charAt(0)}
                  </span>
                </div>
              )}

              <div>
                {alignment && (
                  <span className={`inline-block px-4 py-2 text-sm font-bold rounded-full mb-4 text-white ${alignmentBg}`}>
                    {alignment.toUpperCase()}
                  </span>
                )}
                <h1
                  className="font-display text-5xl md:text-7xl tracking-wider mb-2"
                  style={{ color: signatureColor }}
                >
                  {character.title}
                </h1>
                {alias && (
                  <p className="text-2xl text-gray-300 italic mb-4">"{alias}"</p>
                )}
                {realName && (
                  <p className="text-lg text-gray-400 mb-6">
                    <span className="text-fire font-semibold">Nombre real:</span> {realName}
                  </p>
                )}

                {power && (
                  <div className="mb-6 p-5 border-l-4 rounded-r-xl bg-shadow/30" style={{ borderColor: signatureColor }}>
                    <h2 className="font-display text-lg tracking-wider mb-2" style={{ color: signatureColor }}>
                      PODER
                    </h2>
                    <p className="text-gray-200 leading-relaxed">{power}</p>
                  </div>
                )}

                {backstory && (
                  <div className="mb-6">
                    <h2 className="font-display text-lg tracking-wider mb-2 text-fire">
                      HISTORIA
                    </h2>
                    <p className="text-gray-200 leading-relaxed whitespace-pre-line">{backstory}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {characterScenes.length > 0 && (
          <section className="py-16 container mx-auto px-4">
            <h2 className="font-display text-3xl md:text-4xl tracking-wider mb-8 text-center">
              APARECE EN <span style={{ color: signatureColor }}>{characterScenes.length}</span> ESCENA{characterScenes.length > 1 ? 'S' : ''}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {characterScenes.map((scene) => (
                <Link
                  key={scene.id}
                  href={`/scenes/${scene.slug}`}
                  className="p-5 bg-shadow/20 border border-fire/20 rounded-xl hover:border-fire hover:bg-shadow/40 transition-all"
                >
                  {scene.metadata?.scene_number && (
                    <span className="text-xs text-fire font-bold">
                      ESCENA {scene.metadata.scene_number}
                    </span>
                  )}
                  <h3 className="font-display text-lg tracking-wide mt-1">{scene.title}</h3>
                  {scene.metadata?.subtitle && (
                    <p className="text-sm text-gray-400 italic mt-2 line-clamp-2">
                      "{scene.metadata.subtitle}"
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}