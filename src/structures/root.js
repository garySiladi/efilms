export type SliderStructure = {
  data?: Array<Object>,
  className?: string,
  sliderTitle?: string,
  isFullWidth?: boolean,
}

export type SeriesStructure = {
  title: string,
}

export type RootStructure = {
  shelves: SeriesStructure[],
};
