import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { mockAnimeData } from '@/data/mockData';
import { Anime } from '@/types/anime';

interface SearchBarProps {
  onAnimeSelect?: (anime: Anime) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onAnimeSelect, className = '' }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Anime[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockAnimeData.filter(anime =>
        anime.title.toLowerCase().includes(query.toLowerCase()) ||
        anime.genres.some(genre => genre.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filtered.slice(0, 5));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAnimeClick = (anime: Anime) => {
    setQuery(anime.title);
    setIsOpen(false);
    onAnimeSelect?.(anime);
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          type="text"
          placeholder="Search anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 bg-input border-border focus:ring-2 focus:ring-primary transition-all"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-intense border-border bg-card animate-fade-in">
          <div className="p-2">
            {results.map((anime) => (
              <div
                key={anime.id}
                onClick={() => handleAnimeClick(anime)}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
              >
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="w-12 h-16 object-cover rounded-md"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate">{anime.title}</h4>
                  <p className="text-sm text-muted-foreground truncate">{anime.description}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {anime.genres.slice(0, 2).map((genre) => (
                      <span
                        key={genre}
                        className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};