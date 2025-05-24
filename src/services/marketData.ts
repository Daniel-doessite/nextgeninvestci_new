import axios from 'axios';

const ALPHA_VANTAGE_API_KEY = '0K26CF39N4A6USIX';
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: string;
}

export interface NewsItem {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

class MarketDataService {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private async fetchWithCache<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    const data = await fetchFn();
    this.cache.set(key, { data, timestamp: Date.now() });
    return data;
  }

  async getStockData(symbol: string): Promise<StockData> {
    return this.fetchWithCache(`stock_${symbol}`, async () => {
      try {
        const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
          params: {
            function: 'GLOBAL_QUOTE',
            symbol,
            apikey: ALPHA_VANTAGE_API_KEY
          }
        });

        if (response.data['Global Quote']) {
          const data = response.data['Global Quote'];
          return {
            symbol: data['01. symbol'],
            price: parseFloat(data['05. price']),
            change: parseFloat(data['09. change']),
            changePercent: parseFloat(data['10. change percent'].replace('%', '')),
            volume: parseInt(data['06. volume']),
            timestamp: new Date().toISOString()
          };
        } else {
          throw new Error('Données non disponibles');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error('Impossible de récupérer les données de marché');
      }
    });
  }

  async getFinancialNews(): Promise<NewsItem[]> {
    return this.fetchWithCache('news', async () => {
      try {
        const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
          params: {
            function: 'NEWS_SENTIMENT',
            apikey: ALPHA_VANTAGE_API_KEY
          }
        });

        if (response.data.feed) {
          return response.data.feed.map((item: any) => ({
            title: item.title,
            description: item.summary,
            url: item.url,
            publishedAt: item.time_published,
            source: item.source,
            sentiment: item.overall_sentiment_label.toLowerCase()
          }));
        } else {
          return [];
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des actualités:', error);
        return [];
      }
    });
  }

  async getTechnicalIndicators(symbol: string): Promise<any> {
    return this.fetchWithCache(`technical_${symbol}`, async () => {
      try {
        const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
          params: {
            function: 'SMA',
            symbol,
            interval: 'daily',
            time_period: '20',
            series_type: 'close',
            apikey: ALPHA_VANTAGE_API_KEY
          }
        });

        return response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des indicateurs:', error);
        throw new Error('Impossible de récupérer les indicateurs techniques');
      }
    });
  }
}

export const marketDataService = new MarketDataService(); 