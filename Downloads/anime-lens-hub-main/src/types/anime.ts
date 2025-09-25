export interface Anime {
  id: string;
  title: string;
  description: string;
  image: string;
  genres: string[];
  publisher: string;
  first: string;
  format: string;
  popularity?: number;
  lastUpdate?: string;
  updateDay?: 'Su' | 'M' | 'Tu' | 'W' | 'Th' | 'F' | 'Sa';
}

export interface AnimeFilter {
  genre?: string;
  format?: string;
  publisher?: string;
}

export interface AnimeFormData {
  title: string;
  description: string;
  image: string;
  genres: string[];
  publisher: string;
  first: string;
  format: string;
  updateDay?: 'Su' | 'M' | 'Tu' | 'W' | 'Th' | 'F' | 'Sa';
}