import { useState } from 'react';
import Header from './components/Header';
import CryptoList from './components/CryptoList';
import Watchlist from './components/Watchlist';
import CryptoChart from './components/CryptoChart';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [showChart, setShowChart] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleViewChart = (crypto) => {
    setSelectedCrypto(crypto);
    setShowChart(true);
  };

  const handleCloseChart = () => {
    setShowChart(false);
    setSelectedCrypto(null);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <Header 
          onSearch={handleSearch}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        <main className="container mx-auto px-4 py-8">
          {activeTab === 'overview' ? (
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                  Track Cryptocurrency Prices
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Stay updated with live cryptocurrency prices, market trends, and build your personal watchlist powered by CoinGecko
                </p>
                
                <div className="flex items-center justify-center space-x-8 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">Live</div>
                    <div className="text-sm text-muted-foreground">Price Updates</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500">Real-time</div>
                    <div className="text-sm text-muted-foreground">API Data</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-500">Personal</div>
                    <div className="text-sm text-muted-foreground">Watchlist</div>
                  </div>
                </div>
              </div>
              
              <CryptoList 
                searchTerm={searchTerm}
                onViewChart={handleViewChart}
              />
            </div>
          ) : (
            <Watchlist onViewChart={handleViewChart} />
          )}
        </main>

        {showChart && selectedCrypto && (
          <CryptoChart 
            crypto={selectedCrypto}
            onClose={handleCloseChart}
          />
        )}
        
        <footer className="border-t mt-16 py-8">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            <p>© 2024 CryptoTracker ❤️</p>
            <p className="text-sm mt-2">
              Data provided by CoinGecko API • Real-time cryptocurrency prices
            </p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;