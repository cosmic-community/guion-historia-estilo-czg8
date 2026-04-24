import Link from 'next/link';
import { Character, getMetafieldValue } from '@/types';

export default function CharacterCard({ character }: { character: Character }) {
  const alias = character.metadata?.alias;
  const alignment = getMetafieldValue(character.metadata?.alignment);
  const portrait = character.metadata?.portrait;
  const signatureColor = character.metadata?.signature_color || '#ff6b35';

  const alignmentColor =
    alignment === 'Hero' ? 'bg-ocean text-white' :
    alignment === 'Villain' ? 'bg-shadow-purple text-white' :
    'bg-gray-600 text-white';

  return (
    <Link href={`/characters/${character.slug}`}>
      <article
        className="scene-card bg-gradient-to-br from-shadow/30 to-shadow-dark border rounded-xl overflow-hidden group"
        style={{ borderColor: `${signatureColor}40` }}
      >
        {portrait ? (
          <div className="aspect-square overflow-hidden bg-shadow-dark">
            <img
              src={`${portrait.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={character.title}
              width={300}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div
            className="aspect-square flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${signatureColor}, #0a0014)` }}
          >
            <span className="font-display text-7xl text-white/60">
              {character.title.charAt(0)}
            </span>
          </div>
        )}
        <div className="p-5">
          {alignment && (
            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-2 ${alignmentColor}`}>
              {alignment.toUpperCase()}
            </span>
          )}
          <h3 className="font-display text-2xl tracking-wide" style={{ color: signatureColor }}>
            {character.title}
          </h3>
          {alias && (
            <p className="text-sm text-gray-400 mt-1">"{alias}"</p>
          )}
        </div>
      </article>
    </Link>
  );
}