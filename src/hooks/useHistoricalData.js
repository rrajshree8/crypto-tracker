import { useState, useEffect, useCallback } from 'react';
import { getHistoricalData, convertTimeRangeToDays, handleApiError } from '../services/coingeckoApi';

// Custom hook for managing historical cryptocurrency data
export const useHistoricalData = (coinId, timeRange = '7D') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch historical data
  const fetchHistoricalData = useCallback(async (showLoading = true) => {
    if (!coinId) return;

    try {
      if (showLoading) {
        setLoading(true);
      }
      setError(null);

      const days = convertTimeRangeToDays(timeRange);
      const result = await getHistoricalData(coinId, days);
      
      // Transform data for Chart.js
      const transformedData = {
        labels: result.prices.map(([timestamp]) => {
          const date = new Date(timestamp);
          switch (timeRange) {
            case '1D':
              return date.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
              });
            case '7D':
              return date.toLocaleDateString('en-US', { 
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              });
            case '1M':
              return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              });
            case '1Y':
              return date.toLocaleDateString('en-US', { 
                month: 'short', 
                year: '2-digit' 
              });
            default:
              return date.toLocaleDateString();
          }
        }),
        prices: result.prices.map(([, price]) => price),
        volumes: result.total_volumes.map(([, volume]) => volume),
        marketCaps: result.market_caps.map(([, marketCap]) => marketCap),
        rawData: result
      };

      setData(transformedData);
    } catch (err) {
      const errorInfo = handleApiError(err);
      setError(errorInfo);
      console.error(`Failed to fetch historical data for ${coinId}:`, err);
    } finally {
      setLoading(false);
    }
  }, [coinId, timeRange]);

  // Effect to fetch data when coinId or timeRange changes
  useEffect(() => {
    fetchHistoricalData();
  }, [fetchHistoricalData]);

  // Manual refresh
  const refresh = useCallback(() => {
    fetchHistoricalData(false);
  }, [fetchHistoricalData]);

  return {
    data,
    loading,
    error,
    refresh
  };
};