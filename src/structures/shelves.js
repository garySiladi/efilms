export type LandscapeStructure = {
  url: string,
}

export type ThumbnailStructure = {
  url: string,
  landscape: landscapeStructure,
}

export type ItemsStructure = {
  title: string,
  description: string,
  created_at: string,
  updated_at: string,
  thumbnail: ThumbnailStructure[],
}

export type ShelvesStructure = {
  title: string,
  items: ItemsStructure[],
}

export type DataStructure = {
  shelves: ShelvesStructure[],
};
