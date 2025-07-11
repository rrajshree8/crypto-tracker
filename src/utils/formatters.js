// Utility functions for formatting data
export const formatPrice = (price, currency = 'USD') => {
  if (price === null || price === undefined) return 'N/A';
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: price < 1 ? 6 : 2,
    maximumFractionDigits: price < 1 ? 6 : 2,
  }).format(price);
  
  return formattedPrice;
};

export const formatMarketCap = (marketCap) => {
  if (marketCap === null || marketCap === undefined) return 'N/A';
  
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`;
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  } else if (marketCap >= 1e3) {
    return `$${(marketCap / 1e3).toFixed(2)}K`;
  } else {
    return `$${marketCap.toFixed(2)}`;
  }
};

export const formatVolume = (volume) => {
  return formatMarketCap(volume);
};

export const formatPercentage = (percentage) => {
  if (percentage === null || percentage === undefined) return 'N/A';
  
  const formatted = Math.abs(percentage).toFixed(2);
  const sign = percentage >= 0 ? '+' : '-';
  
  return `${sign}${formatted}%`;
};

export const formatNumber = (number) => {
  if (number === null || number === undefined) return 'N/A';
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

export const getChangeColor = (percentage) => {
  if (percentage === null || percentage === undefined) return 'text-muted-foreground';
  
  return percentage >= 0 ? 'text-green-500' : 'text-red-500';
};

export const getChangeIcon = (percentage) => {
  if (percentage === null || percentage === undefined) return '•';
  
  return percentage >= 0 ? '↗' : '↘';
};