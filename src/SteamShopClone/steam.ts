export const getFeaturedGames = (): Promise<FeaturedGames> => 
  fetch('/api/steam/featuredgames').then(res => res.json());

export const getFeaturedCategories = (): Promise<FeaturedCategories[]> =>
  fetch('/api/steam/featuredcategories').then(res => res.json());

export const getGameDetails = (id: number): Promise<GameDetails> =>
  fetch(`/api/steam/gamedetails/${id}`).then(res => res.json());

export const getGameNews = (id: number): Promise<GameNews[]> =>
  fetch(`/api/steam/gamenews/${id}`).then(res => res.json());

export const getGamePlayers = (id: number): Promise<number> =>
  fetch(`/api/steam/gameplayers/${id}`).then(res => res.text()).then(text => parseInt(text));

export const getGameReviews = (
  id: number,
  start_date: number = -1,
  end_date: number = -1,
  date_range_type: 'all' | '30days' | '90days' | '365days' | 'custom' = 'all',
  purchase_type: 'all' | 'steam' | 'non_steam_purchase' = 'all',
  review_type: 'all' | 'positive' | 'negative' = 'all',
  filter: 'all' | 'summary' | 'recent' | 'funny' = 'all',
  playtime_filter_min: number = 0,
  playtime_filter_max: number = 0,
  filter_offtopic_activity: number = 0,
): Promise<GameReviews> =>
  fetch(`/api/steam/gamereviews/${id}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      start_date,
      end_date,
      date_range_type,
      purchase_type,
      review_type,
      filter,
      playtime_filter_min,
      playtime_filter_max,
      filter_offtopic_activity,
    }),
  }).then(res => res.json());


export const getAppsInGenre = (genre: string): Promise<AppsInGenre> =>
  fetch(`/api/steam/appsingenre/${genre}`).then(res => res.json());

export const getAppsInCategory = (id: 'cat_newreleases' | 'cat_topsellers' | 'cat_comingsoon' | 'cat_specials'): Promise<AppsInCategory> =>
  fetch(`/api/steam/appsincategory/${id}`).then(res => res.json());

export const search = (
  term: string,
  os: ('win' | 'mac' | 'linux')[] = [],
  tags: string[] = [],
  specials: boolean = false,
  hidef2p: boolean = false,
  maxprice: number = 0
): Promise<Search> =>
  fetch(`/api/steam/search`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      term,
      os,
      tags,
      specials,
      hidef2p,
      maxprice,
    }),
  }).then(res => res.json());

export const getAllCategories = (): Promise<AllCategories[]> =>
  fetch(`/api/steam/allcategories`).then(res => res.json());

export const getAllTags = (): Promise<AllTags[]> =>
  fetch(`/api/steam/alltags`).then(res => res.json());

export const getAllGenres = (): Promise<AllGenres> =>
  fetch(`/api/steam/allgenres`).then(res => res.json());

export const getStats = (): Promise<Stats> =>
  fetch(`/api/steam/stats`).then(res => res.json());

export const getSlideShows = (): Promise<SlideShows> =>
  fetch(`/api/steam/slideshows`).then(res => res.json());

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

export interface GameReview {
  recommendationid: string;
  author: {
    steamid: string;
    num_games_owned: number;
    num_reviews: number;
    playtime_forever: number;
    playtime_last_two_weeks: number;
    playtime_at_review: number;
    last_played: number;
  };
  language: string;
  review: string;
  timestamp_created: number;
  timestamp_updated: number;
  voted_up: boolean;
  votes_up: number;
  votes_funny: number;
  weighted_vote_score: number;
  comment_count: number;
  steam_purchase: boolean;
  received_for_free: boolean;
  written_during_early_access: boolean;
  hidden_in_steam_china: boolean;
  steam_china_location: string;
}

export interface GameReviews {
  success: number;
  query_summary: {
    num_reviews: number;
    review_score: number;
    review_score_desc: string;
    total_positive: number;
    total_negative: number;
    total_reviews: number;
  };
  reviews: GameReview[];
  cursor: string;
}

export interface TabApps {
  name: string;
  total_item_count: number;
  items: {
    type: number;
    id: number;
  }[];
}

export interface AppsInGenre {
  id: string;
  status: number;
  name: string;
  tabs: {
    newreleases: TabApps;
    topsellers: TabApps;
    comingsoon: TabApps;
    specials: TabApps;
  };
}

export interface AppsInCategory {
  id: string;
  status: number;
  name: string;
  tabs: {
    viewall: TabApps;
    topsellers: TabApps;
    specials: TabApps;
    under_ten: TabApps;
    dlc: TabApps;
  };
}

export interface Search {
  desc: string;
  items: {
    name: string;
    logo: string;
  }[];
}

export interface AllCategories {
  categoryid: number;
  type: number;
  name: string;
  loc_name: string;
  image_path: string;
  show_in_search: number;
}

export interface AllTags {
  tagid: number;
  name: string;
}

export interface Stats {
  users_online: string;
  users_ingame: string;
}

export interface AllGenres {
  genres: {
    id: string;
    name: string;
    items: {
      id: number;
      type: number;
    }[];
  }[];
}

export interface SlideShows {
  status: number;
  movies: {
    name: string;
    thumbnail: string;
    webm: {
      '480': string;
      max: string;
    };
    target: {
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
  }[];
}