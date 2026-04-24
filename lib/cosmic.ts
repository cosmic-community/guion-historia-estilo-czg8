import { createBucketClient } from '@cosmicjs/sdk';
import { Character, Scene, hasStatus } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

export async function getAllScenes(): Promise<Scene[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'scenes' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);

    const scenes = response.objects as Scene[];
    return scenes.sort((a, b) => {
      const aNum = a.metadata?.scene_number || 0;
      const bNum = b.metadata?.scene_number || 0;
      return aNum - bNum;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch scenes');
  }
}

export async function getSceneBySlug(slug: string): Promise<Scene | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'scenes', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);

    return response.object as Scene;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch scene');
  }
}

export async function getAllCharacters(): Promise<Character[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'characters' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);

    return response.objects as Character[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch characters');
  }
}

export async function getCharacterBySlug(slug: string): Promise<Character | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'characters', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);

    return response.object as Character;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch character');
  }
}