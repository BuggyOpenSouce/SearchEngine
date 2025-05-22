export type SearchResult = {
  id: string;
  title: string;
  url: string;
  displayUrl: string;
  snippet: string;
  imageUrl?: string;
  datePublished?: string;
  publisher?: string;
};

export type ImageResult = {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  sourceUrl: string;
  width: number;
  height: number;
};

export type VideoResult = {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  duration: string;
  publisher: string;
  publishedAt: string;
  views?: string;
};

export type NewsResult = {
  id: string;
  title: string;
  url: string;
  snippet: string;
  imageUrl?: string;
  source: string;
  publishedAt: string;
};

export type MapResult = {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating?: number;
  category?: string;
};

export type SearchCategory = 'web' | 'images' | 'videos' | 'maps' | 'news';

export type Theme = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  cardBackground: string;
};

export type CustomizationOptions = {
  theme: Theme;
  fontSize: 'small' | 'medium' | 'large';
  resultDensity: 'compact' | 'comfortable' | 'spacious';
  showPreviewImages: boolean;
  enableAnimations: boolean;
  darkMode: boolean;
};