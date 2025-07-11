import { useState, useEffect, useCallback } from 'react';
import { getCryptocurrencies, getCryptocurrenciesByIds, DEFAULT_CRYPTO_IDS, handleApiError } from '../services/coingeckoApi';

// Custom hook for managing cryptocurrency data
export const useCryptocurrencies = (options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const {
    limit = 50,
    page = 1,
    autoRefresh = true,
    refreshInterval = 60000, // 1 minute
    useDefaultIds = true
  } = options;

  // Fetch cryptocurrencies
  const fetchCryptocurrencies = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      setError(null);

      let result;
      if (useDefaultIds) {
        result = await getCryptocurrenciesByIds(DEFAULT_CRYPTO_IDS);
      } else {
        result = await getCryptocurrencies({ limit, page });
      }

      setData(result);
      setLastUpdated(new Date());
    } catch (err) {
      const errorInfo = handleApiError(err);
      setError(errorInfo);
      console.error('Failed to fetch cryptocurrencies:', err);
    } finally {
      setLoading(false);
    }
  }, [limit, page, useDefaultIds]);

  // Manual refresh
  const refresh = useCallback(() => {
    fetchCryptocurrencies(false);
  }, [fetchCryptocurrencies]);

  // Initial fetch
  useEffect(() => {
    fetchCryptocurrencies();
  }, [fetchCryptocurrencies]);

  // Auto refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchCryptocurrencies(false);
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchCryptocurrencies]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh,
    refetch: fetchCryptocurrencies
  };
};

// Custom hook for watchlist cryptocurrencies
export const useWatchlistCryptocurrencies = () => {
  const [watchlistIds, setWatchlistIds] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load watchlist IDs from localStorage
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('crypto-watchlist');
    if (savedWatchlist) {
      try {
        const ids = JSON.parse(savedWatchlist);
        setWatchlistIds(ids);
      } catch (err) {
        console.error('Failed to parse watchlist from localStorage:', err);
      }
    }
  }, []);

  // Fetch watchlist data when IDs change
  useEffect(() => {
    if (watchlistIds.length === 0) {
      setData([]);
      setLoading(false);
      return;
    }

    const fetchWatchlistData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await getCryptocurrenciesByIds(watchlistIds);
        setData(result);
      } catch (err) {
        const errorInfo = handleApiError(err);
        setError(errorInfo);
        console.error('Failed to fetch watchlist data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistData();
  }, [watchlistIds]);

  // Add to watchlist
  const addToWatchlist = useCallback((cryptoId) => {
    setWatchlistIds(prev => {
      if (prev.includes(cryptoId)) return prev;
      
      const newIds = [...prev, cryptoId];
      localStorage.setItem('crypto-watchlist', JSON.stringify(newIds));
      return newIds;
    });
  }, []);

  // Remove from watchlist
  const removeFromWatchlist = useCallback((cryptoId) => {
    setWatchlistIds(prev => {
      const newIds = prev.filter(id => id !== cryptoId);
      localStorage.setItem('crypto-watchlist', JSON.stringify(newIds));
      return newIds;
    });
  }, []);

  // Check if crypto is in watchlist
  const isInWatchlist = useCallback((cryptoId) => {
    return watchlistIds.includes(cryptoId);
  }, [watchlistIds]);

  return {
    data,
    loading,
    error,
    watchlistIds,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  };
};