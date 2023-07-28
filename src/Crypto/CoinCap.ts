const baseUrl = 'https://api.coincap.io/v2';


export interface Data<T> {
  data: T;
  timestamp: number;
}

export interface Asset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
}

export interface AssetHistoryStamp {
  priceUsd: string;
  time: number;
  date: string;
}

export interface Market {
  exchangeId: string;
  baseId: string;
  quoteId: string;
  baseSymbol: string;
  quoteSymbol: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  volumePercent: string;
}

export const Intervals = ['m1', 'm5', 'm15', 'm30', 'h1', 'h2', 'h6', 'h12', 'd1'];
export type Interval = typeof Intervals[number];



export const getAsset2 = (limit: number = 20, offset: number = 1): Promise<Data<Asset[]>> => {
  return fetch(`${baseUrl}/assets?limit=${limit}&offset=${offset}`).then((res) => res.json());
};

export const getSearchAssets = (search: string, limit: number = 20, offset: number = 1): Promise<Data<Asset[]>> => {
  return fetch(`${baseUrl}/assets?search=${search}&limit=${limit}&offset=${offset}`).then((res) => res.json());
};

export const getAsset = (id: string): Promise<Data<Asset>> => {
  return fetch(`${baseUrl}/assets/${id}`).then((res) => res.json());
};

export const getAssetHistory = (id: string, interval: Interval, start?: number, end?: number): Promise<Data<AssetHistoryStamp[]>> => {
  return fetch(`${baseUrl}/assets/${id}/history?interval=${interval}${start ? `&start=${start}` : ''}${end ? `&end=${end}` : ''}`).then((res) => res.json());
};

export const getAssetMarkets = (id: string, limit: number = 20, offset: number = 1): Promise<Data<Market[]>> => {
  return fetch(`${baseUrl}/assets/${id}/markets?limit=${limit}&offset=${offset}`).then((res) => res.json());
};

export const getPriceWebsocket = (assetdIds: string[]) => {
  const ws = new WebSocket('wss://ws.coincap.io/prices?assets=' + assetdIds.join(','));
  return ws;
};