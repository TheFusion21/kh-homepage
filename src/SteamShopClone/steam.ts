
export const Categories = [
  'action', 'arcade_rhythm', 'action_fps', 'hack_and_slash', 'fighting_martial_arts', 'action_run_jump', 'shump', 'action_tps',
  'adventure', 'adventure_rpg', 'casual', 'story_rich', 'metroidvania', 'puzzle_matching', 'visual_novel', 'hidden_object',
  'rpg', 'adventure_rpg', 'rpg_action', 'rpg_party_based', 'rpg_jrpg', 'rogue_like_rogue_lite', 'rpg_turn_based', 'rpg_strategy_tactics',
  'simulation', 'sim_building_automation', 'sim_dating', 'sim_hobby_sim', 'sim_life', 'sim_farming_crafting', 'sim_physics_sanbox', 'sim_space_flight',
  'strategy', 'strategy_real_time', 'strategy_grand_4x', 'strategy_card_board', 'strategy_military', 'strategy_turn_based', 'strategy_cities_settlements', 'tower_defense',
  'sports_and_racing', 'sports', 'sports_fishing_hunting', 'sports_individual', 'sports_team', 'racing', 'racing_sim', 'sports_sim',
  'anime', 'horror', 'mystery_detective', 'exploration_open_world', 'science_fiction', 'survival', 'space',
  'singleplayer', 'multiplayer_coop', 'multiplayer_lan', 'multiplayer_local', 'multiplayer_local_party', 'multiplayer_mmo', 'multiplayer', 'multiplayer_online_competitive',
] as const;

export type Category = typeof Categories[number];

export const Genres: string[] = [
  'Free to Play', 'Early Access'
];

export type Genre = typeof Genres[number];

export interface ResponseBase {
  status: number
}
// Featured
export interface Featured extends ResponseBase {
  large_capsules: LargeCapsule[]
  featured_win: FeaturedPlatform[]
  featured_mac: FeaturedPlatform[]
  featured_linux: FeaturedPlatform[]
  layout: string
}
interface LargeCapsule {
  id: number
  type: number
  name: string
  discounted: boolean
  discount_percent: number
  original_price: any
  final_price: number
  currency: string
  large_capsule_image: string
  small_capsule_image: string
  windows_available: boolean
  mac_available: boolean
  linux_available: boolean
  streamingvideo_available: boolean
  header_image: string
  headline: string
  controller_support: string
}
interface FeaturedPlatform {
  id: number
  type: number
  name: string
  discounted: boolean
  discount_percent: number
  original_price?: number
  final_price: number
  currency: string
  large_capsule_image: string
  small_capsule_image: string
  windows_available: boolean
  mac_available: boolean
  linux_available: boolean
  streamingvideo_available: boolean
  header_image: string
  controller_support?: string
  discount_expiration?: number
}

export const getFeatured = (): Promise<Featured> => 
  fetch('/api/featured').then(res => res.json());

// Featured Categories
export interface FeaturedCategories extends ResponseBase {
  "0": N0
  "1": N0
  "2": N0
  "3": N0
  "4": N0
  "5": N0
  "6": N1
  specials: Specials
  coming_soon: ComingSoon
  top_sellers: TopSellers
  new_releases: NewReleases
  genres: Genres
  trailerslideshow: Trailerslideshow
}
interface N0 {
  id: string
  name: string
  items: Item0[]
}
interface Item0 {
  name: string
  header_image: string
  body: string
  url: string
}
interface N1 {
  id: string
  name: string
  items: Item1[]
}
interface Item1 {
  id: number
  type: number
  discounted: boolean
  currency: string
  original_price: number
  final_price: number
  discount_percent: number
  name: string
  header_image: string
  purchase_package: number
}
export interface Specials {
  id: string
  name: string
  items: Item5[]
}
export interface ComingSoon {
  id: string
  name: string
  items: Item5[]
}
export interface TopSellers {
  id: string
  name: string
  items: Item5[]
}
export interface NewReleases {
  id: string
  name: string
  items: Item5[]
}
interface Item5 {
  id: number
  type: number
  name: string
  discounted: boolean
  discount_percent: number
  original_price?: number
  final_price: number
  currency: string
  large_capsule_image: string
  small_capsule_image: string
  windows_available: boolean
  mac_available: boolean
  linux_available: boolean
  streamingvideo_available: boolean
  header_image: string
  discount_expiration?: number
  controller_support?: string
}
interface Genres {
  id: string
  name: string
}
interface Trailerslideshow {
  id: string
  name: string
}

export const getFeaturedCategories = (): Promise<FeaturedCategories> =>
  fetch('/api/featuredcategories').then(res => res.json());

// Search
export interface AppResult {
  appid: string
  name: string
  icon: string
  logo: string
}

export const search = (term: string): Promise<AppResult[]> =>
  fetch(`/api/search/${encodeURIComponent(term)}`).then(res => res.json());

// App Details
export interface AppDetails {
  [appId: string]: AppDetail
}
export interface AppDetail {
  success: boolean
  data?: Data
}
interface Data {
  type: string
  name: string
  steam_appid: number
  required_age: number
  is_free: boolean
  dlc: number[]
  detailed_description: string
  about_the_game: string
  short_description: string
  supported_languages: string
  header_image: string
  capsule_image: string
  capsule_imagev5: string
  website: string
  pc_requirements: Requirements
  mac_requirements: Requirements
  linux_requirements: Requirements
  developers: string[]
  publishers: string[]
  packages: number[]
  package_groups: PackageGroup[]
  platforms: Platforms
  metacritic: Metacritic
  categories: AppCategory[]
  genres: AppGenre[]
  screenshots: Screenshot[]
  movies?: Movie[]
  recommendations: Recommendations
  achievements: Achievements
  release_date: ReleaseDate
  support_info: SupportInfo
  background: string
  background_raw: string
  content_descriptors: ContentDescriptors
  price_overview?: PriceOverview
  legal_notice?: string
}
interface PriceOverview {
  currency: string
  initial: number
  final: number
  discount_percent: number
  initial_formatted: string
  final_formatted: string
}
interface Requirements {
  minimum: string
  recommended?: string
}
interface PackageGroup {
  name: string
  title: string
  description: string
  selection_text: string
  save_text: string
  display_type: number
  is_recurring_subscription: string
  subs: Sub[]
}
interface Sub {
  packageid: number
  percent_savings_text: string
  percent_savings: number
  option_text: string
  option_description: string
  can_get_free_license: string
  is_free_license: boolean
  price_in_cents_with_discount: number
}
interface Platforms {
  windows: boolean
  mac: boolean
  linux: boolean
}
interface Metacritic {
  score: number
  url: string
}
interface AppCategory {
  id: number
  description: string
}
interface AppGenre {
  id: string
  description: string
}
interface Screenshot {
  id: number
  path_thumbnail: string
  path_full: string
}
interface Movie {
  id: number
  name: string
  thumbnail: string
  webm: Resolution
  mp4: Resolution
  highlight: boolean
}
interface Resolution {
  "480"?: string
  "720"?: string
  "1080"?: string
  max: string
}
interface Recommendations {
  total: number
}
interface Achievements {
  total: number
  highlighted: Highlighted[]
}
interface Highlighted {
  name: string
  path: string
}
interface ReleaseDate {
  coming_soon: boolean
  date: string
}
interface SupportInfo {
  url: string
  email: string
}
interface ContentDescriptors {
  ids: number[]
  notes: string
}

export const getGameDetails = (appId: string | number): Promise<AppDetails> =>
  fetch(`/api/appdetails/${appId}`).then(res => res.json());


// apps in category
export interface CategoryApps extends ResponseBase {
  id: string
  name: string
  tabs: Tabs
}
interface Tabs {
  viewall: ItemCollection
  topsellers: ItemCollection
  specials: ItemCollection
  under_ten: ItemCollection
  dlc: ItemCollection
}
interface ItemCollection {
  name: string
  total_item_count: number
  items: Item[]
}
interface Item {
  type: number
  id: number
}

export const getAppsInCategory = (categoryId: Category): Promise<CategoryApps> =>
  fetch(`/api/getappsincategory/?category=${categoryId}&cc=de&l=english`).then(res => res.json());

// apps in genre
export interface GenreApps extends ResponseBase {
  id: string
  name: string
  tabs: Tabs2
}

interface Tabs2 {
  featured: ItemCollection
  newreleases: ItemCollection
  topsellers: ItemCollection
  comingsoon: ItemCollection
  specials: ItemCollection
}

export const getAppsInGenre = (genreId: string): Promise<GenreApps> =>
  fetch(`/api/getappsingenre/?genre=${genreId}&cc=de&l=english`).then(res => res.json());