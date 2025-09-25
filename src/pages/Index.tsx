import React, { useState } from 'react';
import { TabNavigation } from '@/components/ui/tab-navigation';
import { Home } from '@/pages/Home';
import { SearchPage } from '@/pages/SearchPage';
import { PopularPage } from '@/pages/PopularPage';

import { UpdatesPage } from '@/pages/UpdatesPage';
import { AnimeDetail } from '@/pages/AnimeDetail';
import { Anime } from '@/types/anime';

type ViewType = 'home' | 'search' | 'popular' | 'updates' | 'detail';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'popular'>('home');
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);

  const handleAnimeSelect = (anime: Anime) => {
    setSelectedAnime(anime);
    setCurrentView('detail');
  };

  const handleShowPopular = () => {
    setActiveTab('popular');
    setCurrentView('popular');
  };


  const handleShowUpdates = () => {
    setCurrentView('updates');
  };

  const handleBack = () => {
    if (currentView === 'detail') {
      setCurrentView(activeTab);
    } else if (currentView === 'updates') {
      setCurrentView('home');
      setActiveTab('home');
    }
  };

  const handleTabChange = (tab: 'home' | 'search' | 'popular') => {
    setActiveTab(tab);
    setCurrentView(tab);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <Home
            onAnimeSelect={handleAnimeSelect}
            onShowPopular={handleShowPopular}
            onShowUpdates={handleShowUpdates}
          />
        );
      case 'search':
        return <SearchPage onAnimeSelect={handleAnimeSelect} />;
      case 'popular':
        return <PopularPage onAnimeSelect={handleAnimeSelect} />;
      case 'updates':
        return <UpdatesPage onAnimeSelect={handleAnimeSelect} onBack={handleBack} />;
      case 'detail':
        return selectedAnime ? (
          <AnimeDetail anime={selectedAnime} onBack={handleBack} />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentView()}
      {currentView !== 'detail' && currentView !== 'updates' && (
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
};

export default Index;
