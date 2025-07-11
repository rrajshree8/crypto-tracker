# CryptoTracker

A modern, responsive cryptocurrency tracking application built with React and Vite. Track real-time prices, view interactive charts, and build your personal watchlist.

## Features

- 🚀 **Real-time Price Tracking**: Stay updated with live cryptocurrency prices
- 📊 **Interactive Charts**: View price trends with Chart.js powered charts
- ⭐ **Personal Watchlist**: Save and track your favorite cryptocurrencies
- 🌙 **Dark/Light Mode**: Toggle between dark and light themes
- 📱 **Mobile Responsive**: Optimized for all device sizes
- 🔍 **Search Functionality**: Find cryptocurrencies quickly
- 💾 **Local Storage**: Persistent watchlist and theme preferences

## Tech Stack

- **Frontend**: React 18, Vite
- **Charts**: Chart.js, react-chartjs-2
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: CoinGecko API (free tier)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd crypto-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The build files will be generated in the `dist` folder.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Manual Deployment

1. Build the project: `npm run build`
2. Upload the `dist` folder to your hosting provider

## API Integration

This app uses the CoinGecko API (free tier) which provides:
- 10-50 requests per minute
- Basic cryptocurrency data
- Historical price data

No API key required for basic usage.

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx       # Navigation header
│   ├── CryptoCard.jsx   # Individual crypto card
│   ├── CryptoList.jsx   # List of cryptocurrencies
│   ├── CryptoChart.jsx  # Chart component
│   ├── Watchlist.jsx    # Watchlist page
│   └── MobileNav.jsx    # Mobile navigation
├── mock/               # Mock data for development
├── utils/              # Utility functions
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Features in Detail

### Price Tracking
- Real-time price updates
- 24h price changes
- Market cap and volume data
- High/low prices

### Charts
- Interactive price charts
- Multiple time ranges (1D, 7D, 1M, 1Y)
- Responsive design
- Smooth animations

### Watchlist
- Add/remove cryptocurrencies
- Persistent storage
- Quick access to favorites

### Theme Support
- Dark and light themes
- Persistent preference
- Smooth transitions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [CoinGecko](https://www.coingecko.com/) for the cryptocurrency data
- [Chart.js](https://www.chartjs.org/) for the beautiful charts
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Lucide](https://lucide.dev/) for the icons