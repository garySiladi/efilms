// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Slider from './slider';

const dummySliderItems = [
  {
    title: 'Episode 1 Title',
    type: 'Episode 1',
  },
  {
    title: 'Episode 2 Title',
    type: 'Episode 2',
    thumbnail: {
      thumb: {
        url: 'xxx',
      },
    },
  },
  {
    title: 'Some title',
    type: 'Series',
  },
];

const additionalProps = {
  className: 'home-slider',
  sliderTitle: 'Slider title',
};

const sliderDummyProps = [
  {
    ...additionalProps,
    data: dummySliderItems,
    isSelected: true,
    isBeforeSelected: false,
    isHidden: false,
    selectedEpisode: 4,
  },
  {
    ...additionalProps,
    data: dummySliderItems,
    isSelected: false,
    isBeforeSelected: true,
    isHidden: true,
    selectedEpisode: 10,
  },
  {
    ...additionalProps,
    data: dummySliderItems,
    isSelected: false,
    isBeforeSelected: false,
    isHidden: false,
    selectedEpisode: 9,
  },
  {
    ...additionalProps,
    data: dummySliderItems,
    isSelected: false,
    isBeforeSelected: false,
    isHidden: false,
    selectedEpisode: 122,
    isEpisodeExpanded: true,
    isAfterSelected: true,
  },
];

jest.mock('./parts/slider-item', () =>
  jest.fn(() => <div>SliderItem</div>),
);

test('Slider renders correctly', () => {
  sliderDummyProps.forEach((props) => {
    const tree : string = renderer.create(<Slider {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
