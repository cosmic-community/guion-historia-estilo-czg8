import Link from 'next/link';
import { Scene, getMetafieldValue } from '@/types';

export default function SceneCard({ scene }: { scene: Scene }) {
  const sceneNumber = scene.metadata?.scene_number;
  const subtitle = scene.metadata?.subtitle;
  const image = scene.metadata?.scene_image;
  const mood = getMetafieldValue(scene.metadata?.mood);

  return (
    <Link href={`/scenes/${scene.slug}`}>
      <article className="scene-card bg-gradient-to-br from-shadow/30 to-shadow-dark border border-fire/20 rounded-xl overflow-hidden group">
        {image ? (
          <div className="aspect-video overflow-hidden bg-shadow-dark">
            <img
              src={`${image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={scene.title}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="aspect-video gradient-hero flex items-center justify-center">
            <span className="font-display text-6xl text-white/40">
              {sceneNumber ? `#${sceneNumber}` : '?'}
            </span>
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            {sceneNumber && (
              <span className="px-3 py-1 bg-fire text-white text-xs font-bold rounded-full">
                ESCENA {sceneNumber}
              </span>
            )}
            {mood && (
              <span className="px-3 py-1 bg-shadow/50 border border-shadow-purple/50 text-xs rounded-full">
                {mood}
              </span>
            )}
          </div>
          <h3 className="font-display text-xl tracking-wide mb-2 group-hover:text-fire transition-colors">
            {scene.title}
          </h3>
          {subtitle && (
            <p className="text-sm text-gray-300 italic line-clamp-2">"{subtitle}"</p>
          )}
        </div>
      </article>
    </Link>
  );
}