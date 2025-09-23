import React, { useState } from 'react';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimeCard } from '@/components/ui/anime-card';
import { mockAnimeData } from '@/data/mockData';
import { Anime } from '@/types/anime';

interface UpdatesPageProps {
  onAnimeSelect: (anime: Anime) => void;
  onBack?: () => void;
}

type DayOfWeek = 'Su' | 'M' | 'Tu' | 'W' | 'Th' | 'F' | 'Sa';

export const UpdatesPage: React.FC<UpdatesPageProps> = ({ onAnimeSelect, onBack }) => {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | 'All'>('All');

  const daysOfWeek: { key: DayOfWeek | 'All', label: string }[] = [
    { key: 'All', label: 'All' },
    { key: 'Su', label: 'Sunday' },
    { key: 'M', label: 'Monday' },
    { key: 'Tu', label: 'Tuesday' },
    { key: 'W', label: 'Wednesday' },
    { key: 'Th', label: 'Thursday' },
    { key: 'F', label: 'Friday' },
    { key: 'Sa', label: 'Saturday' },
  ];

  const filteredAnimes = mockAnimeData.filter(anime => {
    if (selectedDay === 'All') return anime.lastUpdate;
    return anime.updateDay === selectedDay;
  }).sort((a, b) => new Date(b.lastUpdate!).getTime() - new Date(a.lastUpdate!).getTime());

  const getAnimesByDay = (day: DayOfWeek) => {
    return mockAnimeData.filter(anime => anime.updateDay === day);
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {onBack && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onBack}
                  className="mr-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              <Calendar className="h-8 w-8 text-anime-blue animate-float" />
              <h1 className="text-3xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
                Recent Updates
              </h1>
            </div>
          </div>
          
          {/* Day Selector */}
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map(({ key, label }) => (
              <Button
                key={key}
                variant={selectedDay === key ? "default" : "outline"}
                onClick={() => setSelectedDay(key)}
                className={`${
                  selectedDay === key 
                    ? 'bg-gradient-primary text-primary-foreground shadow-glow' 
                    : 'border-primary/30 hover:border-primary hover:bg-primary/10'
                } transition-all`}
              >
                {label}
                {key !== 'All' && (
                  <span className="ml-2 text-xs bg-background/20 px-2 py-1 rounded-full">
                    {getAnimesByDay(key as DayOfWeek).length}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-muted-foreground">
            {selectedDay === 'All' 
              ? `Showing all recent updates (${filteredAnimes.length} anime)` 
              : `Updates for ${daysOfWeek.find(d => d.key === selectedDay)?.label} (${filteredAnimes.length} anime)`
            }
          </p>
        </div>

        {filteredAnimes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredAnimes.map((anime) => (
              <div key={anime.id} className="relative">
                <AnimeCard
                  anime={anime}
                  onClick={() => onAnimeSelect(anime)}
                />
                <div className="absolute top-3 right-3 bg-accent/90 backdrop-blur-sm text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                  {anime.updateDay}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No updates found for {selectedDay === 'All' ? 'any day' : daysOfWeek.find(d => d.key === selectedDay)?.label}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};