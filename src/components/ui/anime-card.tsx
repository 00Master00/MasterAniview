import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Anime } from '@/types/anime';

interface AnimeCardProps {
  anime: Anime;
  onClick?: () => void;
  showRank?: boolean;
  rank?: number;
  className?: string;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ 
  anime, 
  onClick, 
  showRank = false, 
  rank,
  className = '' 
}) => {
  return (
    <Card 
      className={`group cursor-pointer hover:shadow-glow transition-all duration-300 hover:scale-105 bg-card border-border overflow-hidden ${className}`}
      onClick={onClick}
    >
      <div className="flex">
        <div className="relative flex-shrink-0 w-32">
          {showRank && rank && (
            <div className="absolute top-2 left-2 z-10">
              <Badge variant="destructive" className="bg-gradient-primary text-primary-foreground font-bold text-sm px-2 py-1">
                #{rank}
              </Badge>
            </div>
          )}
          <div className="aspect-[3/4] h-48 overflow-hidden">
            <img
              src={anime.image}
              alt={anime.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>
        
        <div className="flex-1 p-4 ml-2 bg-black/90 text-white flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm mb-2 line-clamp-2 group-hover:text-anime-purple transition-colors">
              {anime.title}
            </h3>
            <div className="flex flex-wrap gap-1 mb-2">
              {anime.genres.slice(0, 2).map((genre) => (
                <Badge
                  key={genre}
                  variant="secondary"
                  className="bg-white/20 text-white text-xs hover:bg-primary/20"
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
          <p className="text-gray-300 text-xs line-clamp-3">
            {anime.description}
          </p>
        </div>
      </div>
    </Card>
  );
};