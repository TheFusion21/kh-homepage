export type Currency = 'USD' | 'EUR' | 'GBP' | 'RUB' | 'BRL' | 'JPY' | 'IDR' | 'MYR' | 'PHP' | 'SGD' | 'THB' | 'KRW' | 'TRY' | 'MXN' | 'CAD' | 'AUD' | 'NZD' | 'CNY' | 'INR' | 'CLP' | 'PEN' | 'COP' | 'ZAR' | 'HKD' | 'TWD' | 'SAR' | 'AED' | 'ARS';

export interface FeaturedGame {
  id: number;
  type: number;
  name: string;
  discounted: boolean;
  discount_percent: number;
  original_price: number;
  final_price: number;
  currency: Currency;
  large_capsule_image: string;
  small_capsule_image: string;
  windows_available: boolean;
  mac_available: boolean;
  linux_available: boolean;
  streamingvideo_available: boolean;
  header_image: string;
}

export interface FeaturedGames {
  large_capsules: any[];
  featured_win: FeaturedGame[];
  featured_mac: FeaturedGame[];
  featured_linux: FeaturedGame[];
  layout: string;
  status: number;
}

export interface FeaturedCategory {
  id: number;
  type: number;
  discounted: boolean;
  currency: Currency;
  original_price: number;
  final_price: number;
  discount_percent: number;
  name: string;
  header_image: string;
  purchase_package: number;
}

export interface FeaturedSpotlight {
  name: string;
  header_image: string;
  body: string;
  url: string;
}

export interface FeaturedCategories {
  id: string;
  name: string;
  items: FeaturedCategory[] | FeaturedSpotlight[];
}

export interface Requirements {
  minimum: string;
}

export interface GameDetails {
  type: string;
  name: string;
  steam_appid: number;
  required_age: number;
  is_free: boolean;
  controller_support: string;
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  supported_languages: string;
  header_image: string;
  capsule_image: string;
  capsule_imagev5: string;
  website: string;
  pc_requirements: Requirements;
  mac_requirements: Requirements;
  linux_requirements: Requirements;
  developers: string[];
  publishers: string[];
  packages: number[];
  package_groups: any[];
  platforms: {
    windows: boolean;
    mac: boolean;
    linux: boolean;
  };
  metacritic: {
    score: number;
    url: string;
  };
  categories: {
    id: number;
    description: string;
  }[];
  genres: {
    id: string;
    description: string;
  }[];
  screenshots: {
    id: number;
    path_thumbnail: string;
    path_full: string;
  }[];
  movies: {
    id: number;
    name: string;
    thumbnail: string;
    webm: {
      '480': string;
      max: string;
    };
    mp4: {
      '480': string;
      max: string;
    };
    highlight: boolean;
  }[];
  recommendations: {
    total: number;
  };
  achievements: {
    total: number;
    highlighted: {
      name: string;
      path: string;
    }[];
  };
  release_date: {
    coming_soon: boolean;
    date: string;
  };
  support_info: {
    url: string;
    email: string;
  };
  background: string;
  background_raw: string;
  content_descriptors: {
    ids: number[];
    notes: string;
  };
}

export interface GameNews {
  gid: string;
  title: string;
  url: string;
  is_external_url: boolean;
  author: string;
  contents: string;
  feedlabel: string;
  date: number;
  feedname: string;
  feed_type: number;
  appid: number;
  tags: string[];
}

export const getFeaturedGames = (): Promise<FeaturedGames> => 
  fetch('/api/steam/featuredgames').then(res => res.json());

export const getFeaturedCategories = (): Promise<FeaturedCategories[]> =>
  fetch('/api/steam/featuredcategories').then(res => res.json());

export const getGameDetails = (id: number): Promise<GameDetails> =>
  fetch(`/api/steam/gamedetails/${id}`).then(res => res.json());