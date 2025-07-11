import { useState, useEffect } from 'react';
import { RefreshCw, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import CryptoCard from './CryptoCard';
import { useCryptocurrencies } from '../hooks/useCryptocurrencies';

const CryptoList = ({ searchTerm, onViewChart }) => {
  const { data: cryptoData, loading, error, lastUpdated, refresh } = useCryptocurrencies({
    useDefaultIds: false,
    limit: 60,
    autoRefresh: true,
    refreshInterval: 60000 // 1 minute
  });
  
  const [watchlist, setWatchlist] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortBy, setSortBy] = useState('market_cap_rank');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    // Load watchlist from localStorage
    const savedWatchlist = localStorage.getItem('crypto-watchlist');
    if (savedWatchlist) {
      try {
        setWatchlist(JSON.parse(savedWatchlist));
      } catch (err) {
        console.error('Failed to parse watchlist:', err);
      }
    }
  }, []);

  useEffect(() => {
    // Filter data based on search term
    let filtered = cryptoData;
    
    if (searchTerm && searchTerm.length > 0) {
      filtered = cryptoData.filter(crypto => 
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort data
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      // Handle null values
      if (aValue === null) aValue = 0;
      if (bValue === null) bValue = 0;
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredData(filtered);
  }, [searchTerm, cryptoData, sortBy, sortOrder]);

  const addToWatchlist = (crypto) => {
    const newWatchlist = [...watchlist, crypto.id];
    setWatchlist(newWatchlist);
    localStorage.setItem('crypto-watchlist', JSON.stringify(newWatchlist));
  };

  const removeFromWatchlist = (cryptoId) => {
    const newWatchlist = watchlist.filter(id => id !== cryptoId);
    setWatchlist(newWatchlist);
    localStorage.setItem('crypto-watchlist', JSON.stringify(newWatchlist));
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortOptions = [
    { value: 'market_cap_rank', label: 'Market Cap Rank' },
    { value: 'current_price', label: 'Price' },
    { value: 'price_change_percentage_24h', label: '24h Change' },
    { value: 'market_cap', label: 'Market Cap' },
    { value: 'total_volume', label: 'Volume' },
    { value: 'name', label: 'Name' }
  ];

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center p-8 bg-card rounded-lg border border-red-200">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-2">
                {error.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {error.message}
              </p>
              <button
                onClick={refresh}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors mx-auto"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Loading cryptocurrencies...</p>
          </div>
        </div>
        
        {/* Loading skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="p-6 rounded-xl border bg-card animate-pulse">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                  <div className="h-3 bg-gray-300 rounded w-16"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-6 bg-gray-300 rounded w-32"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-card rounded-lg border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="px-3 py-1 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-1 text-sm bg-secondary hover:bg-accent rounded-md transition-colors"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
          
          <button
            onClick={refresh}
            className="flex items-center space-x-1 px-3 py-1 text-sm bg-secondary hover:bg-accent rounded-md transition-colors"
            disabled={loading}
          >
            <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Wifi className="h-4 w-4 text-green-500" />
              <span>Live</span>
            </div>
            {lastUpdated && (
              <span>
                Updated {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <span>Showing {filteredData.length} cryptocurrencies</span>
            {searchTerm && (
              <span>• Filtered by "{searchTerm}"</span>
            )}
          </div>
        </div>
      </div>

      {/* Crypto Cards Grid */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map(crypto => (
            <CryptoCard
              key={crypto.id}
              crypto={crypto}
              onAddToWatchlist={addToWatchlist}
              onRemoveFromWatchlist={removeFromWatchlist}
              isInWatchlist={watchlist.includes(crypto.id)}
              onViewChart={onViewChart}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No cryptocurrencies found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default CryptoList;