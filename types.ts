export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export type Alignment = 'Hero' | 'Villain' | 'Neutral' | 'Anti-Hero';
export type Mood = 'Epic' | 'Dark' | 'Tragic' | 'Dramatic' | 'Mysterious' | 'Hopeful';

export interface Character extends CosmicObject {
  type: 'characters';
  metadata: {
    real_name?: string;
    alias?: string;
    alignment?: {
      key: string;
      value: string;
    } | string;
    power?: string;
    backstory?: string;
    portrait?: {
      url: string;
      imgix_url: string;
    };
    signature_color?: string;
  };
}

export interface Scene extends CosmicObject {
  type: 'scenes';
  metadata: {
    scene_number?: number;
    visual_description?: string;
    subtitle?: string;
    scene_image?: {
      url: string;
      imgix_url: string;
    };
    characters_in_scene?: Character[];
    mood?: {
      key: string;
      value: string;
    } | string;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}