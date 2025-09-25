import React from 'react';
import { Trophy } from 'lucide-react';
import { AnimeCard } from '@/components/ui/anime-card';
import { Card } from '@/components/ui/card';
import { mockAnimeData } from '@/data/mockData';
import { Anime } from '@/types/anime';

interface PopularPageProps {
  onAnimeSelect: (anime: Anime) => void;
}

export const PopularPage: React.FC<PopularPageProps> = ({ onAnimeSelect }) => {
  const popularAnimes = mockAnimeData
    .filter(anime => anime.popularity && anime.popularity <= 10)
    .sort((a, b) => (a.popularity || 0) - (b.popularity || 0));

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <Trophy className="h-8 w-8 text-anime-gold animate-float" />
            <h1 className="text-3xl font-bold bg-gradient-accent bg-clip-text text-transparent">
              Popular Rankings
            </h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Top 10 most popular anime this month
          </p>
        </div>
      </header>

      {/* Rankings */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Top 3 Special Display */}
          <div className="flex justify-center items-end gap-8 mb-12">
            {/* Rank 2 - Left */}
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10 animate-float">
                <div className="px-4 py-2 rounded-full font-bold text-lg bg-gradient-secondary text-white shadow-glow">
                  #2
                </div>
              </div>
              <div className="w-56 mt-6">
                <Card className="group cursor-pointer hover:shadow-glow transition-all duration-300 hover:scale-105 bg-card border-border overflow-hidden">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={popularAnimes[1]?.image}
                      alt={popularAnimes[1]?.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onClick={() => onAnimeSelect(popularAnimes[1])}
                    />
                  </div>
                  {/* Info under image */}
                  <div className="p-3">
                    <h3 className="font-semibold text-lg mb-1">{popularAnimes[1]?.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {popularAnimes[1]?.genres.join(', ')}
                    </p>
                    <p className="text-sm line-clamp-3">{popularAnimes[1]?.description}</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Rank 1 - Center and Largest */}
            <div className="relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10 animate-glow">
                <div className="px-6 py-3 rounded-full font-bold text-2xl bg-gradient-accent text-white shadow-intense">
                  #1
                </div>
              </div>
              <div className="w-72 mt-8">
                <Card className="group cursor-pointer hover:shadow-glow transition-all duration-300 hover:scale-105 bg-card border-border overflow-hidden ring-2 ring-anime-gold">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={popularAnimes[0]?.image}
                      alt={popularAnimes[0]?.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onClick={() => onAnimeSelect(popularAnimes[0])}
                    />
                  </div>
                  {/* Info under image */}
                  <div className="p-4">
                    <h3 className="font-bold text-xl mb-1">{popularAnimes[0]?.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {popularAnimes[0]?.genres.join(', ')}
                    </p>
                    <p className="text-sm line-clamp-4">{popularAnimes[0]?.description}</p>
                  </div>
                </Card>
              </div>
            </div>
            
            {/* Rank 3 - Right */}
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10 animate-float">
                <div className="px-4 py-2 rounded-full font-bold text-lg bg-gradient-primary text-white shadow-card">
                  #3
                </div>
              </div>
              <div className="w-56 mt-6">
                <Card className="group cursor-pointer hover:shadow-glow transition-all duration-300 hover:scale-105 bg-card border-border overflow-hidden">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={popularAnimes[2]?.image}
                      alt={popularAnimes[2]?.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onClick={() => onAnimeSelect(popularAnimes[2])}
                    />
                  </div>
                  {/* Info under image */}
                  <div className="p-3">
                    <h3 className="font-semibold text-lg mb-1">{popularAnimes[2]?.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {popularAnimes[2]?.genres.join(', ')}
                    </p>
                    <p className="text-sm line-clamp-3">{popularAnimes[2]?.description}</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Remaining Rankings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularAnimes.slice(3).map((anime) => (
              <AnimeCard
                key={anime.id}
                anime={anime}
                onClick={() => onAnimeSelect(anime)}
                showRank
                rank={anime.popularity}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
