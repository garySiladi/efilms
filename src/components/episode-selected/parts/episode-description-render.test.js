// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import EpisodeDescription from './episode-description';

test('EpisodeDescription renders correctly', () => {
  const tree : string = renderer.create(<EpisodeDescription />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('EpisodeDescription renders with data', () => {
  const tree : string = renderer.create(<EpisodeDescription
    title="title xyz"
    subtitle="subtitle xyz"
    description="description xyz"
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
