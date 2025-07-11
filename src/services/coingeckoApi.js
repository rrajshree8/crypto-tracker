// CoinGecko API service
const BASE_URL = 'https://api.coingecko.com/api/v3';

// Rate limiting and caching
const CACHE_DURATION = 60000; // 1 minute
const cache = new Map();

// Helper function to create cache key
const createCacheKey = (endpoint, params) => {
  const paramString = params ? Object.entries(params)
    .sort()
    .map(([key, value]) => `${key}=${value}`)
    .join('&') : '';
  return `${endpoint}${paramString ? `?${paramString}` : ''}`;
};

// Helper function to check cache
const getCachedData = (cacheKey) => {
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

// Helper function to set cache
const setCachedData = (cacheKey, data) => {
  cache.set(cacheKey, {
    data,
    timestamp: Date.now()
  });
};

// Generic API request function with error handling and caching
const apiRequest = async (endpoint, params = {}) => {
  const cacheKey = createCacheKey(endpoint, params);
  
  // Check cache first
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Cache the response
    setCachedData(cacheKey, data);
    
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Get list of cryptocurrencies with market data
export const getCryptocurrencies = async (options = {}) => {
  const params = {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: options.limit || 50,
    page: options.page || 1,
    sparkline: false,
    price_change_percentage: '24h',
    ...options
  };

  try {
    const data = await apiRequest('/coins/markets', params);
    return data;
  } catch (error) {
    console.error('Failed to fetch cryptocurrencies:', error);
    throw error;
  }
};

// Get specific cryptocurrencies by IDs
export const getCryptocurrenciesByIds = async (ids = []) => {
  if (!ids.length) return [];

  const params = {
    vs_currency: 'usd',
    ids: ids.join(','),
    order: 'market_cap_desc',
    per_page: 250,
    page: 1,
    sparkline: false,
    price_change_percentage: '24h'
  };

  try {
    const data = await apiRequest('/coins/markets', params);
    return data;
  } catch (error) {
    console.error('Failed to fetch cryptocurrencies by IDs:', error);
    throw error;
  }
};

// Get historical market chart data
export const getHistoricalData = async (coinId, days = 7) => {
  const params = {
    vs_currency: 'usd',
    days: days.toString(),
    interval: days <= 1 ? 'hourly' : days <= 30 ? 'daily' : 'weekly'
  };

  try {
    const data = await apiRequest(`/coins/${coinId}/market_chart`, params);
    return {
      prices: data.prices || [],
      market_caps: data.market_caps || [],
      total_volumes: data.total_volumes || []
    };
  } catch (error) {
    console.error(`Failed to fetch historical data for ${coinId}:`, error);
    throw error;
  }
};

// Get detailed coin information
export const getCoinDetails = async (coinId) => {
  try {
    const data = await apiRequest(`/coins/${coinId}`, {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false
    });
    return data;
  } catch (error) {
    console.error(`Failed to fetch coin details for ${coinId}:`, error);
    throw error;
  }
};

// Search cryptocurrencies
export const searchCryptocurrencies = async (query) => {
  if (!query || query.length < 2) return [];

  try {
    const data = await apiRequest('/search', { query });
    return data.coins || [];
  } catch (error) {
    console.error('Failed to search cryptocurrencies:', error);
    throw error;
  }
};

// Get trending cryptocurrencies
export const getTrendingCryptocurrencies = async () => {
  try {
    const data = await apiRequest('/search/trending');
    return data.coins || [];
  } catch (error) {
    console.error('Failed to fetch trending cryptocurrencies:', error);
    throw error;
  }
};

// Helper function to convert time range to days
export const convertTimeRangeToDays = (timeRange) => {
  const timeRangeMap = {
    '1D': 1,
    '7D': 7,
    '1M': 30,
    '1Y': 365
  };
  return timeRangeMap[timeRange] || 7;
};

// Default cryptocurrency IDs to display
export const DEFAULT_CRYPTO_IDS = [
  'bitcoin',
  'ethereum',
  'cardano',
  'solana',
  'polkadot',
  'chainlink',
  'litecoin',
  'polygon',
  'avalanche-2',
  'uniswap'
];

// Error handling helper
export const handleApiError = (error) => {
  if (error.message.includes('Rate limit exceeded')) {
    return {
      title: 'Rate Limit Exceeded',
      message: 'Too many requests. Please wait a moment and try again.',
      type: 'warning'
    };
  }
  
  if (error.message.includes('Failed to fetch')) {
    return {
      title: 'Network Error',
      message: 'Unable to connect to the server. Please check your internet connection.',
      type: 'error'
    };
  }
  
  return {
    title: 'Error',
    message: 'Something went wrong. Please try again later.',
    type: 'error'
  };
};

// Clear cache function (useful for manual refresh)
export const clearCache = () => {
  cache.clear();
};

// Get cache statistics
export const getCacheStats = () => {
  const now = Date.now();
  const validEntries = Array.from(cache.entries()).filter(
    ([_, value]) => now - value.timestamp < CACHE_DURATION
  );
  
  return {
    totalEntries: cache.size,
    validEntries: validEntries.length,
    expiredEntries: cache.size - validEntries.length
  };
};