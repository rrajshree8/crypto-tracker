import { useState, useEffect } from 'react';
import CryptoCard from './CryptoCard';
import { useWatchlistCryptocurrencies } from '../hooks/useCryptocurrencies';
import { Star, TrendingUp, RefreshCw, AlertCircle } from 'lucide-react';

const Watchlist = ({ onViewChart }) => {
  const {
    data: watchlistData,
    loading,
    error,
    watchlistIds,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  } = useWatchlistCryptocurrencies();

  // Show error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Your Watchlist</h2>
            <p className="text-muted-foreground">
              Track your favorite cryptocurrencies
            </p>
          </div>
        </div>

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
                onClick={() => window.location.reload()}
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

  // Show loading state
  if (loading && watchlistIds.length > 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Your Watchlist</h2>
            <p className="text-muted-foreground">
              Track your favorite cryptocurrencies
            </p>
          </div>
          
          <div className="flex items-center space-x-2 bg-card border rounded-lg px-4 py-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span className="text-sm font-medium">Loading...</span>
          </div>
        </div>

        {/* Loading skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(Math.min(watchlistIds.length, 8))].map((_, i) => (
            <div key={i} className="p-6 rounded-xl border bg-card animate-pulse w-full max-w-xl mx-auto">
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

  // Show empty state
  if (watchlistData.length === 0 && watchlistIds.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mb-6">
          <div className="mx-auto w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
            <Star className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your Watchlist is Empty</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Start building your watchlist by adding cryptocurrencies you want to keep track of. 
            Click the star icon on any crypto card to add it to your watchlist.
          </p>
        </div>
        
        <div className="bg-card border rounded-lg p-6 max-w-md mx-auto">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-8 w-8 text-green-500" />
            <div className="text-left">
              <h3 className="font-semibold">Pro Tip</h3>
              <p className="text-sm text-muted-foreground">
                Add Bitcoin and Ethereum to get started!
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div className="flex items-center space-x-2">
                <img 
                  src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" 
                  alt="Bitcoin"
                  className="w-6 h-6 rounded-full"
                />
                <span className="font-medium">Bitcoin</span>
              </div>
              <button
                onClick={() => addToWatchlist('bitcoin')}
                className="p-1 hover:bg-accent rounded"
              >
                <Star className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div className="flex items-center space-x-2">
                <img 
                  src="https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628" 
                  alt="Ethereum"
                  className="w-6 h-6 rounded-full"
                />
                <span className="font-medium">Ethereum</span>
              </div>
              <button
                onClick={() => addToWatchlist('ethereum')}
                className="p-1 hover:bg-accent rounded"
              >
                <Star className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Watchlist</h2>
          <p className="text-muted-foreground">
            Track your favorite cryptocurrencies
          </p>
        </div>
        
        <div className="flex items-center space-x-2 bg-card border rounded-lg px-4 py-2">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium">{watchlistData.length} items</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {watchlistData.map(crypto => (
          <CryptoCard
            key={crypto.id}
            crypto={crypto}
            onAddToWatchlist={addToWatchlist}
            onRemoveFromWatchlist={removeFromWatchlist}
            isInWatchlist={isInWatchlist(crypto.id)}
            onViewChart={onViewChart}
          />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;