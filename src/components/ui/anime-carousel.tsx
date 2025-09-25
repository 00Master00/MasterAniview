import React from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimeCard } from '@/components/ui/anime-card';
import { Anime } from '@/types/anime';

interface AnimeCarouselProps {
  title: string;
  animes: Anime[];
  onAnimeClick?: (anime: Anime) => void;
  onSeeAll?: () => void;
}

export const AnimeCarousel: React.FC<AnimeCarouselProps> = ({
  title,
  animes,
  onAnimeClick,
  onSeeAll
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {title}
        </h2>
        <Button
          variant="outline"
          onClick={onSeeAll}
          className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all group"
        >
          <Eye className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
          See All
        </Button>
      </div>

      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-primary/30 hover:border-primary hover:bg-primary/10"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-primary/30 hover:border-primary hover:bg-primary/10"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {animes.map((anime) => (
            <div key={anime.id} className="flex-none w-72">
              <AnimeCard
                anime={anime}
                onClick={() => onAnimeClick?.(anime)}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};