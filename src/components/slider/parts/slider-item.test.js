// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import SliderItem from './slider-item';

const dummyData = [
  {
    title: 'Episode 6 Title',
    type: 'Episode',
    id: 6,
    subtitle: 'subtitle',
    // $FlowFixMe
    thumbnail: {
      thumb: {
        url: 'url',
      },
    },
    className: 'slider-item',
    isSelected: false,
    isBeforeSelected: false,
    isSelectedSeries: false,
    isEpisodeExpanded: false,
  },
  {
    title: 'Series 1 Title',
    type: 'Series',
    id: 9,
    episode_count: 10,
    // $FlowFixMe
    thumbnail: {
      thumb: {
        url: 'url',
      },
    },
    className: 'slider-item',
    isSelected: false,
    isBeforeSelected: true,
    isSelectedSeries: true,
    isEpisodeExpanded: false,
  },
  {
    title: 'Episode 19 Title',
    type: 'Episode',
    id: 19,
    subtitle: 'subtitle',
    // $FlowFixMe
    thumbnail: {},
    className: 'slider-item',
    isSelected: true,
    isBeforeSelected: false,
    isSelectedSeries: true,
    isEpisodeExpanded: false,
  },
  {
    title: 'Episode 19 Title',
    type: 'Episode',
    id: 19,
    subtitle: 'subtitle',
    // $FlowFixMe
    thumbnail: {},
    className: 'slider-item',
    isSelected: true,
    isBeforeSelected: false,
    isSelectedSeries: false,
    isEpisodeExpanded: true,
  },
];

const fullWidthDummyData = [
  {
    title: 'Episode 1 Title',
    type: 'Episode',
    id: 1,
    subtitle: 'subtitle',
    // $FlowFixMe
    thumbnail: {
      full_width: {
        url: 'url',
      },
    },
    className: 'slider-item',
    isSelected: false,
    isBeforeSelected: false,
    isSelectedSeries: false,
    isEpisodeExpanded: false,
  },
  {
    title: 'Episode 2 Title',
    type: 'Episode',
    id: 2,
    subtitle: 'subtitle',
    // $FlowFixMe
    thumbnail: {},
    className: 'slider-item',
    isSelected: false,
    isBeforeSelected: false,
    isSelectedSeries: false,
    isEpisodeExpanded: false,
  },
];

test('SliderItem renders correctly', () => {
  dummyData.forEach((data) => {
    const tree: string = renderer.create(<SliderItem {...data} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

test('SliderItem renders correctly when full-width', () => {
  fullWidthDummyData.forEach((data) => {
    const tree: string = renderer.create(<SliderItem {...data} isFullWidth />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
