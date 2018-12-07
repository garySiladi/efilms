// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import HomeContainer from './home-container';

export const mockData = [
  {
    title: 'Ocean',
    id: 1,
    series_id: 1,
    thumbnail_size: 'string',
    items: [
      {
        id: 1,
        series_id: 1,
        title: 'xxx',
        type: 'yyy',
        subtitle: 'string',
        description: 'string',
        video_url: 'string',
        thumbnail: {
          url: 'url',
        },
      },
      {
        id: 2,
        series_id: 1,
        title: 'aaa',
        type: 'bbb',
        subtitle: 'string',
        description: 'string',
        video_url: 'string',
        thumbnail: {
          url: 'url',
        },
      },
    ],
  },
  {
    title: 'Some series',
    id: 2,
    series_id: 2,
    thumbnail_size: 'string',
    items: [
      {
        id: 32,
        series_id: 1,
        title: 'asd',
        type: 'ttt',
        subtitle: 'string',
        description: 'string',
        video_url: 'string',
        thumbnail: {
          url: 'url',
        },
      },
      {
        id: 54,
        series_id: 1,
        title: 'aza',
        type: 'sds',
        subtitle: 'string',
        description: 'string',
        video_url: 'string',
        thumbnail: {
          url: 'sampleUrl',
        },
      },
    ],
  },
  {
    title: 'Recommended',
    id: 3,
    series_id: 3,
    thumbnail_size: 'string',
    items: [
      {
        id: 3,
        series_id: 1,
        title: 'xxx',
        type: 'yyy',
        subtitle: 'string',
        description: 'string',
        video_url: 'string',
        thumbnail: {
          url: 'url',
        },
      },
      {
        id: 4,
        series_id: 1,
        title: 'aaa',
        type: 'bbb',
        subtitle: 'string',
        description: 'string',
        video_url: 'string',
        thumbnail: {
          url: 'url',
        },
      },
    ],
  },
];

jest.mock('../slider/slider', () =>
  jest.fn(() => <div>Slider</div>),
);

jest.mock('../episode-selected/episode-selected', () =>
  jest.fn(() => <div>EpisodeSelected</div>),
);

describe('HomeContainer: ', () => {
  test('renders correctly without data', () => {
    const tree : string = renderer.create(
      <HomeContainer
        series={[]}
        isSelected={false}
        selectedSeries={0}
        selectedEpisode={0}
        goToEpisode={false}
        closePopupFunction={() => {}}
        selectLowerSeries={() => {}}
        isSelectedHomeContainer={false}
        hideSidebarFunction={() => {}}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('renders correctly with data and goToEpisode prop enabled', () => {
    const tree : string = renderer.create(
      <HomeContainer
        series={mockData}
        isSelected
        selectedSeries={1}
        selectedEpisode={1}
        goToEpisode
        closePopupFunction={() => {}}
        selectLowerSeries={() => {}}
        isSelectedHomeContainer
        hideSidebarFunction={() => {}}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('renders correctly with data but without goToEpisode enabled', () => {
    const tree : string = renderer.create(
      <HomeContainer
        series={mockData}
        isSelected
        selectedSeries={1}
        selectedEpisode={1}
        goToEpisode={false}
        closePopupFunction={() => {}}
        selectLowerSeries={() => {}}
        isSelectedHomeContainer
        hideSidebarFunction={() => {}}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
