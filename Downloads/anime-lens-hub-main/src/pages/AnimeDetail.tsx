import React, { useState } from 'react';
import { ArrowLeft, Calendar, Users, Film, Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Anime } from '@/types/anime';

interface AnimeDetailProps {
  anime: Anime;
  onBack: () => void;
}

export const AnimeDetail: React.FC<AnimeDetailProps> = ({ anime, onBack }) => {
  const [showImageModal, setShowImageModal] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="border-primary/30 hover:border-primary hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Anime Image */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden bg-card border-border shadow-card">
              <div 
                className="aspect-[3/4] cursor-pointer group relative"
                onClick={() => setShowImageModal(true)}
              >
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-12 w-12" />
                </div>
              </div>
            </Card>
          </div>

          {/* Anime Details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                {anime.title}
              </h1>
              <p className="text-foreground/80 text-lg leading-relaxed">
                {anime.description}
              </p>
            </div>

            {/* Genres */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center">
                <Film className="w-5 h-5 mr-2 text-anime-purple" />
                Genres
              </h3>
              <div className="flex flex-wrap gap-2">
                {anime.genres.map((genre) => (
                  <Badge
                    key={genre}
                    variant="outline"
                    className="bg-gradient-primary/10 border-primary text-primary hover:bg-gradient-primary hover:text-primary-foreground transition-all"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-card border-border shadow-card">
                <div className="flex items-center mb-3">
                  <Users className="w-5 h-5 mr-2 text-anime-pink" />
                  <h3 className="font-semibold text-foreground">Publisher</h3>
                </div>
                <p className="text-foreground/80">{anime.publisher}</p>
              </Card>

              <Card className="p-6 bg-card border-border shadow-card">
                <div className="flex items-center mb-3">
                  <Calendar className="w-5 h-5 mr-2 text-anime-blue" />
                  <h3 className="font-semibold text-foreground">First Aired</h3>
                </div>
                <p className="text-foreground/80">{formatDate(anime.first)}</p>
              </Card>

              <Card className="p-6 bg-card border-border shadow-card">
                <div className="flex items-center mb-3">
                  <Film className="w-5 h-5 mr-2 text-anime-gold" />
                  <h3 className="font-semibold text-foreground">Format</h3>
                </div>
                <p className="text-foreground/80">{anime.format}</p>
              </Card>

              {anime.popularity && (
                <Card className="p-6 bg-card border-border shadow-card">
                  <div className="flex items-center mb-3">
                    <div className="w-5 h-5 mr-2 bg-gradient-accent rounded-full"></div>
                    <h3 className="font-semibold text-foreground">Popularity Rank</h3>
                  </div>
                  <p className="text-foreground/80">#{anime.popularity}</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm border-border hover:bg-background"
            >
              <X className="h-4 w-4" />
            </Button>
            <img
              src={anime.image}
              alt={anime.title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-intense"
            />
          </div>
        </div>
      )}
    </div>
  );
};