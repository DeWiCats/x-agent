export type AgentFormData = {
  // General tab
  image: string;
  name: string;
  handle: string;
  description: string;
  category: string;
  tags: string;

  // Instructions tab
  engagementHooks: string;
  engagementRules: string;
  ethicalBoundaries: string;
  factCheckThreshold: number;
  tone: number;
  style: number;
  stance: number;

  // Context tab
  context: string;

  // Settings tab
  isPublic: boolean;
  model: string;
};

export enum ImageStyle {
  ThreeDModel = "3D Model",
  AnalogFilm = "Analog Film",
  Anime = "Anime",
  Cinematic = "Cinematic",
  ComicBook = "Comic Book",
  CraftClay = "Craft Clay",
  DigitalArt = "Digital Art",
  Enhance = "Enhance",
  FantasyArt = "Fantasy Art",
  IsometricStyle = "Isometric Style",
  LineArt = "Line Art",
  Lowpoly = "Lowpoly",
  NeonPunk = "Neon Punk",
  Origami = "Origami",
  Photographic = "Photographic",
  PixelArt = "Pixel Art",
  Texture = "Texture",
  Advertising = "Advertising",
  FoodPhotography = "Food Photography",
  RealEstate = "Real Estate",
  Abstract = "Abstract",
  Cubist = "Cubist",
  Graffiti = "Graffiti",
  Hyperrealism = "Hyperrealism",
  Impressionist = "Impressionist",
  Pointillism = "Pointillism",
  PopArt = "Pop Art",
  Psychedelic = "Psychedelic",
  Renaissance = "Renaissance",
  Steampunk = "Steampunk",
  Surrealist = "Surrealist",
  Typography = "Typography",
  Watercolor = "Watercolor",
  FightingGame = "Fighting Game",
  GTA = "GTA",
  SuperMario = "Super Mario",
  Minecraft = "Minecraft",
  Pokemon = "Pokemon",
  RetroArcade = "Retro Arcade",
  RetroGame = "Retro Game",
  RPGFantasyGame = "RPG Fantasy Game",
  StrategyGame = "Strategy Game",
  StreetFighter = "Street Fighter",
  LegendOfZelda = "Legend of Zelda",
  Architectural = "Architectural",
  Disco = "Disco",
  Dreamscape = "Dreamscape",
  Dystopian = "Dystopian",
  FairyTale = "Fairy Tale",
  Gothic = "Gothic",
  Grunge = "Grunge",
  Horror = "Horror",
  Minimalist = "Minimalist",
  Monochrome = "Monochrome",
  Nautical = "Nautical",
  Space = "Space",
  StainedGlass = "Stained Glass",
  TechwearFashion = "Techwear Fashion",
  Tribal = "Tribal",
  Zentangle = "Zentangle",
  Collage = "Collage",
  FlatPapercut = "Flat Papercut",
  Kirigami = "Kirigami",
  PaperMache = "Paper Mache",
  PaperQuilling = "Paper Quilling",
  PapercutCollage = "Papercut Collage",
  PapercutShadowBox = "Papercut Shadow Box",
  StackedPapercut = "Stacked Papercut",
  ThickLayeredPapercut = "Thick Layered Papercut",
  Alien = "Alien",
  FilmNoir = "Film Noir",
  HDR = "HDR",
  LongExposure = "Long Exposure",
  NeonNoir = "Neon Noir",
  Silhouette = "Silhouette",
  TiltShift = "Tilt-Shift",
}
