import { useState, useEffect } from 'react';
import { Moon, Sun, Search, TrendingUp, Star } from 'lucide-react';
import MobileNav from './MobileNav';

const Header = ({ onSearch, activeTab, setActiveTab }) => {
  const [isDark, setIsDark] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <TrendingUp className="h-8 w-8 text-primary animate-pulse-slow" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              CryptoTracker
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === 'overview'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Overview
              {activeTab === 'overview' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('watchlist')}
              className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                activeTab === 'watchlist'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Star className="h-4 w-4" />
              <span>Watchlist</span>
              {activeTab === 'watchlist' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
              )}
            </button>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {/* Desktop Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-64 pl-10 pr-4 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
            />
          </div>
          
          {/* Desktop Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="hidden md:block p-2 rounded-md hover:bg-accent transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-slate-600" />
            )}
          </button>

          {/* Mobile Navigation */}
          <MobileNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onSearch={onSearch}
            isDark={isDark}
            toggleTheme={toggleTheme}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;