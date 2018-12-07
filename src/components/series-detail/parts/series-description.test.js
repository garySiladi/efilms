// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import SeriesDescription from './series-description';

const seriesAssetMockData = {
  file: {
    url: 'u1',
  },
};
const sponsorAssetMockData = {
  file: {
    url: 'u2',
  },
};

test('SeriesDescription renders with data', () => {
  const tree : string = renderer.create(
    <SeriesDescription
      backgroundUrl="xxx"
      description="aaa"
      seriesLogoUrl={seriesAssetMockData.file.url}
      sponsorLogoUrl={sponsorAssetMockData.file.url}
      isWatchnowBtnSelected={false}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
