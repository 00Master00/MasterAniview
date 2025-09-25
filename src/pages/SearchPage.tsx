import React, { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AnimeCard } from '@/components/ui/anime-card';
import { SearchBar } from '@/components/ui/search-bar';
import { mockAnimeData, genresList } from '@/data/mockData';
import { Anime, AnimeFilter } from '@/types/anime';

interface SearchPageProps {
  onAnimeSelect: (anime: Anime) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onAnimeSelect }) => {
  const [filters, setFilters] = useState<AnimeFilter>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAnimes = useMemo(() => {
    let result = mockAnimeData;

    // Apply search query
    if (searchQuery) {
      result = result.filter(anime =>
        anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        anime.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        anime.genres.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply genre filter
    if (filters.genre && filters.genre !== 'All') {
      result = result.filter(anime => anime.genres.includes(filters.genre!));
    }

    return result;
  }, [filters, searchQuery]);

  const handleSearchSelect = (anime: Anime) => {
    setSearchQuery(anime.title);
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Search Anime
          </h1>
          <div className="flex flex-col space-y-4">
            <SearchBar 
              onAnimeSelect={handleSearchSelect}
              className="flex-1"
            />
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={`border-primary/30 hover:border-primary ${showFilters ? 'bg-primary/10' : ''}`}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      {showFilters && (
        <div className="bg-card/50 backdrop-blur-sm border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Genre</label>
                <Select value={filters.genre || 'All'} onValueChange={(value) => setFilters(prev => ({ ...prev, genre: value }))}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genresList.map((genre) => (
                      <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => setFilters({})}
                  className="w-full border-destructive/30 hover:border-destructive hover:bg-destructive/10"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-muted-foreground">
            Found {filteredAnimes.length} anime{filteredAnimes.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredAnimes.map((anime) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
              onClick={() => onAnimeSelect(anime)}
            />
          ))}
        </div>

        {filteredAnimes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No anime found matching your criteria</p>
          </div>
        )}
      </main>
    </div>
  );
};
