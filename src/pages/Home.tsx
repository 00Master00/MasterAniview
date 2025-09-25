import React from 'react';
import { SearchBar } from '@/components/ui/search-bar';
import { AnimeCarousel } from '@/components/ui/anime-carousel';
import { mockAnimeData } from '@/data/mockData';
import { Anime } from '@/types/anime';

interface HomeProps {
  onAnimeSelect: (anime: Anime) => void;
  onShowPopular: () => void;
  onShowUpdates: () => void;
}

export const Home: React.FC<HomeProps> = ({ onAnimeSelect, onShowPopular, onShowUpdates }) => {
  const popularAnimes = mockAnimeData
    .filter(anime => anime.popularity && anime.popularity <= 6)
    .sort((a, b) => (a.popularity || 0) - (b.popularity || 0));

  const recentUpdates = mockAnimeData
    .filter(anime => anime.lastUpdate)
    .sort((a, b) => new Date(b.lastUpdate!).getTime() - new Date(a.lastUpdate!).getTime())
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              MasterAniview
            </h1>
          </div>
          <SearchBar 
            onAnimeSelect={onAnimeSelect}
            className="max-w-md"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Popular Section */}
        <AnimeCarousel
          title="Popular"
          animes={popularAnimes}
          onAnimeClick={onAnimeSelect}
          onSeeAll={onShowPopular}
        />

        {/* Recent Updates Section */}
        <AnimeCarousel
          title="Recent Updates"
          animes={recentUpdates}
          onAnimeClick={onAnimeSelect}
          onSeeAll={onShowUpdates}
        />
      </main>
    </div>
  );
};