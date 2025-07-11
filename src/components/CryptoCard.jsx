import { useState } from 'react';
import { Star, TrendingUp, TrendingDown, BarChart3, Eye } from 'lucide-react';
import { formatPrice, formatMarketCap, formatPercentage, getChangeColor, getChangeIcon } from '../utils/formatters';

const CryptoCard = ({ crypto, onAddToWatchlist, onRemoveFromWatchlist, isInWatchlist, onViewChart }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      onRemoveFromWatchlist(crypto.id);
    } else {
      onAddToWatchlist(crypto);
    }
  };

  const priceChangeColor = getChangeColor(crypto.price_change_percentage_24h);
  const priceChangeIcon = getChangeIcon(crypto.price_change_percentage_24h);

  return (
    <div 
      className={`relative p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 w-full max-w-xl mx-auto ${
        isHovered ? 'border-primary/50' : 'border-border'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src={crypto.image} 
                alt={crypto.name}
                className="w-12 h-12 rounded-full animate-float"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground">{crypto.name}</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wide">
                {crypto.symbol}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium bg-secondary px-2 py-1 rounded-full">
              #{crypto.market_cap_rank}
            </span>
            
            <button
              onClick={handleWatchlistToggle}
              className={`p-2 rounded-full transition-all duration-200 ${
                isInWatchlist 
                  ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                  : 'bg-secondary hover:bg-accent'
              }`}
            >
              <Star className={`h-4 w-4 ${isInWatchlist ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-foreground break-words max-w-[10ch] sm:max-w-none sm:text-2xl md:text-3xl lg:text-4xl overflow-x-auto">
                {formatPrice(crypto.current_price)}
              </p>
              <div className={`flex items-center space-x-1 text-sm ${priceChangeColor}`}>
                <span className="text-lg">{priceChangeIcon}</span>
                <span className="font-medium">
                  {formatPercentage(crypto.price_change_percentage_24h)}
                </span>
                <span className="text-muted-foreground">24h</span>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-muted-foreground">24h Volume</p>
              <p className="text-sm font-medium break-words max-w-[10ch] overflow-x-auto">{formatMarketCap(crypto.total_volume)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Market Cap</p>
              <p className="text-sm font-medium break-words max-w-[10ch] overflow-x-auto">{formatMarketCap(crypto.market_cap)}</p>
            </div>
            
            <div>
              <p className="text-xs text-muted-foreground mb-1">High/Low 24h</p>
              <div className="flex items-center space-x-2 whitespace-nowrap overflow-x-auto">
                <span className="text-xs text-green-500 whitespace-nowrap">↑{formatMarketCap(crypto.high_24h)}</span>
                <span className="text-xs text-muted-foreground">/</span>
                <span className="text-xs text-red-500 whitespace-nowrap">↓{formatMarketCap(crypto.low_24h)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-2">
              {crypto.price_change_percentage_24h >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className="text-xs text-muted-foreground">
                {crypto.price_change_percentage_24h >= 0 ? 'Bullish' : 'Bearish'}
              </span>
            </div>
            
            <button
              onClick={() => onViewChart(crypto)}
              className="flex items-center space-x-1 px-3 py-1 text-xs bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors duration-200"
            >
              <BarChart3 className="h-3 w-3" />
              <span>Chart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;