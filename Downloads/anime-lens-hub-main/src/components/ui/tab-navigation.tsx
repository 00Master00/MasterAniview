import React from 'react';
import { Home, Search, Star } from 'lucide-react';

interface TabNavigationProps {
  activeTab: 'home' | 'search' | 'popular';
  onTabChange: (tab: 'home' | 'search' | 'popular') => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'search' as const, label: 'Search', icon: Search },
    { id: 'popular' as const, label: 'Popular', icon: Star },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50">
      <div className="flex justify-around py-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 ${
              activeTab === id
                ? 'text-primary bg-primary/10 shadow-glow'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
            }`}
          >
            <Icon 
              className={`h-4 w-4 mb-1 transition-all duration-300 ${
                activeTab === id ? 'animate-float' : ''
              }`} 
            />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};