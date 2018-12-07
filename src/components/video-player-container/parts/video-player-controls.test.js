// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayerInterface from './video-player-controls';

test('Video is playing + selected postition is 0', () => {
  const tree : string = renderer.create(
    <VideoPlayerInterface
      episodeTitle={'Whatever'}
      isVideoPlaying
      selectedPosition={0}
      progress={0}
      currentTime={'10:10'}
      endOfVideo={'20:20'}
      isVisible
      isBackButtonSelected
    />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video is playing + selected postition is 1', () => {
  const tree : string = renderer.create(
    <VideoPlayerInterface
      episodeTitle={'Whatever'}
      isVideoPlaying
      selectedPosition={1}
      progress={0}
      currentTime={'10:10'}
      endOfVideo={'20:20'}
      isVisible
      isBackButtonSelected
    />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video is playing + selected postition is 2', () => {
  const tree : string = renderer.create(
    <VideoPlayerInterface
      episodeTitle={'Whatever'}
      isVideoPlaying
      selectedPosition={2}
      progress={0}
      currentTime={'10:10'}
      endOfVideo={'20:20'}
      isVisible
      isBackButtonSelected
    />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video is not playing ', () => {
  const tree : string = renderer.create(
    <VideoPlayerInterface
      episodeTitle={'Whatever'}
      isVideoPlaying={false}
      selectedPosition={0}
      progress={0}
      currentTime={'10:10'}
      endOfVideo={'20:20'}
      isVisible
      isBackButtonSelected
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
