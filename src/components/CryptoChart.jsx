import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { X, TrendingUp, TrendingDown, Calendar, RefreshCw, AlertCircle } from 'lucide-react';
import { useHistoricalData } from '../hooks/useHistoricalData';
import { formatPrice } from '../utils/formatters';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CryptoChart = ({ crypto, onClose }) => {
  const [timeRange, setTimeRange] = useState('7D');
  const { data: chartData, loading, error, refresh } = useHistoricalData(crypto?.id, timeRange);

  const timeRanges = [
    { value: '7D', label: '7 Days' },
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: crypto?.price_change_percentage_24h >= 0 ? '#10b981' : '#ef4444',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: function(context) {
            return `${crypto?.name}: ${formatPrice(context.parsed.y)}`;
          }
        }
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: '#9ca3af',
          font: {
            size: 12,
          },
        },
      },
      y: {
        display: true,
        position: 'right',
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
          font: {
            size: 12,
          },
          callback: function(value) {
            return formatPrice(value);
          }
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    elements: {
      point: {
        hoverRadius: 8,
      },
    },
  };

  if (!crypto) return null;

  // Create chart data for Chart.js
  const createChartData = () => {
    if (!chartData) return null;

    return {
      labels: chartData.labels,
      datasets: [
        {
          label: `${crypto.name} Price`,
          data: chartData.prices,
          borderColor: crypto.price_change_percentage_24h >= 0 ? '#10b981' : '#ef4444',
          backgroundColor: crypto.price_change_percentage_24h >= 0 
            ? 'rgba(16, 185, 129, 0.1)' 
            : 'rgba(239, 68, 68, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointBackgroundColor: crypto.price_change_percentage_24h >= 0 ? '#10b981' : '#ef4444',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
        },
      ],
    };
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl border shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-4">
            <img 
              src={crypto.image} 
              alt={crypto.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold">{crypto.name}</h2>
              <p className="text-sm text-muted-foreground uppercase">
                {crypto.symbol} • {formatPrice(crypto.current_price)}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {crypto.price_change_percentage_24h >= 0 ? (
                  <TrendingUp className="h-5 w-5 text-green-500" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-500" />
                )}
                <span className={`text-sm font-medium ${
                  crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                  {crypto.price_change_percentage_24h?.toFixed(2)}% (24h)
                </span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Price Chart</span>
              </div>

              {!loading && !error && (
                <button
                  onClick={refresh}
                  className="flex items-center space-x-1 px-2 py-1 text-xs bg-secondary hover:bg-accent rounded-md transition-colors"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Refresh</span>
                </button>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {timeRanges.map(range => (
                <button
                  key={range.value}
                  onClick={() => setTimeRange(range.value)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    timeRange === range.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-accent'
                  }`}
                  disabled={loading}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-96 relative">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="text-muted-foreground">Loading chart data...</span>
                </div>
              </div>
            ) : error ? (
              <div className="absolute inset-0 flex items-center justify-center">
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
            ) : chartData ? (
              <Line data={createChartData()} options={chartOptions} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <p className="text-muted-foreground">No chart data available</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoChart;