// @flow
import React from 'react';
import { mount, shallow } from 'enzyme';
import VideoPlayer from './video-player';
import * as storage from '../../../api/local-storage';

const dummySeries = {
  title: 't1',
  description: 'aaa',
  additional_assets: [{
    key: 'eco_background',
    file: {
      url: 'xxx',
    },
  }, {
    key: 'eco_detail_logo',
    file: {
      url: 'yyy',
    },
  }, {
    key: 'eco_sponsor_logo',
    file: {
      url: 'zzz',
    },
  }],
  published_episodes: [{
    id: 119,
    title: 'Saving Corals',
    thumbnail: {
      url: 'https://cdn.twivel.io/uploads/economist/episode/thumbnail/119/episode_875X480.jpg',
    },
    type: 'Episode',
  }, {
    id: 141,
    title: 'The deep ocean is the final frontier on planet Earth',
    thumbnail: {
      url: 'https://cdn.twivel.io/uploads/economist/episode/thumbnail/141/episode_875X480.jpg',
    },
    type: 'Episode',
  }, {
    id: 5,
    title: 'Bogus',
    thumbnail: {
      url: 'https://cdn.twivel.io/uploads/economist/episode/thumbnail/141/episode_875X480.jpg',
    },
    type: 'Episode',
  }],
};

test('renders correctly', () => {
  const videoPlayer = mount(
    <VideoPlayer
      videoUrl="https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8"
      posterImage={null}
      videoID={5}
      isVideoExpanded={false}
      episodeTitle="hello"
      handleVideoExpansion={() => {}}
    />);
  videoPlayer.unmount();
});
test('renders correctly with playlist', () => {
  // $FlowFixMe
  storage.getProgressTimeById = jest.fn(() => 10);
  const videoPlayer = mount(
    <VideoPlayer
      videoUrl="https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8"
      posterImage={null}
      videoID={141}
      isVideoExpanded={false}
      episodeTitle="hello"
      handleVideoExpansion={() => {}}
      playlist={dummySeries}
    />);
  videoPlayer.unmount();
});
test('does not break on unmount', () => {
  const videoPlayer = mount(
    <VideoPlayer
      videoUrl="https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8"
      posterImage={null}
      videoID={5}
      isVideoExpanded={false}
      episodeTitle="hello"
      handleVideoExpansion={() => {}}
    />);
  const vP: Object = videoPlayer.instance();
  vP.player = null;
  videoPlayer.unmount();
});
test('Test functions', () => {
  // $FlowFixMe
  storage.getProgressTimeById = jest.fn(() => 10);
  const videoPlayer = shallow(
    <VideoPlayer
      videoUrl="https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8"
      posterImage={null}
      videoID={5}
      isVideoExpanded={false}
      episodeTitle="hello"
      handleVideoExpansion={() => {}}
    />);
  expect(videoPlayer.state().isVideoPlaying).toEqual(true);
  const vP: Object = videoPlayer.instance();
  vP.player = {
    play: jest.fn(),
    pause: jest.fn(),
    muted: jest.fn(),
    dispose: jest.fn(),
    remainingTime: jest.fn().mockReturnValueOnce(100).mockReturnValue(5),
    currentTime: jest.fn(() => 20),
    duration: jest.fn(() => 50),
  };
  expect(VideoPlayer.getProgress(vP.player)).toEqual(40);
  vP.handlePlay();
  expect(videoPlayer.state().isVideoPlaying).toEqual(true);
  vP.handlePause();
  expect(videoPlayer.state().isVideoPlaying).toEqual(false);
  vP.handlePlayPause();
  expect(videoPlayer.state().isVideoPlaying).toEqual(true);
  vP.handlePlayPause();
  expect(videoPlayer.state().isVideoPlaying).toEqual(false);
  vP.handleFastForward();
  expect(videoPlayer.state().isNavigationSelected).toEqual(true);
  vP.moveLeft();
  expect(videoPlayer.state().selectedPosition).toEqual(1);
  expect(vP.player.currentTime()).toEqual(20);
  vP.handleFastForward();
  expect(vP.player.currentTime()).toEqual(20);
  vP.handleRewind();
  expect(vP.player.currentTime()).toEqual(20);
  vP.handleVideoLoad();
  vP.handleEndReached();
  expect(videoPlayer.state().isVideoPlaying).toEqual(false);
  expect(vP.player.currentTime()).toEqual(20);
  vP.handleTimeUpdate();
  expect(videoPlayer.state().timeProgress).toEqual(40);
  vP.moveLeft();
});
function connectEvent(event, type, wrapper) {
  const changedEvent: Object = event;
  if (typeof type === 'number') {
    changedEvent.which = type;
  } else if (typeof type === 'string') {
    changedEvent.code = type;
  }
  const app: Object = wrapper.instance();
  app.handleKeyPress(event);
}
test('renderTime renders time correctly if minutes and seconds > 10', () => {
  expect(VideoPlayer.renderTime(999)).toEqual('16:39');
});
test('videoPlayer not expanded works', () => {
  const app = mount(
    <VideoPlayer
      videoUrl="https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8"
      isVideoExpanded={false}
      episodeTitle="hello"
      posterImage={null}
      videoID={5}
      handleVideoExpansion={() => {}}
    />,
  );
  const event = new Event('keyDown');
  const prevState = app.state();
  connectEvent(event, 'ArrowUp', app);
  expect(app.state()).toEqual(prevState);
});
test('videoPlayer navigation works', () => {
  const app = mount(
    <VideoPlayer
      videoUrl="https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8"
      isVideoExpanded
      episodeTitle="hello"
      posterImage={null}
      videoID={5}
      handleVideoExpansion={() => {}}
    />,
  );
  expect(app.state().isNavigationSelected).toEqual(true);
  const event = new Event('keyDown');
  connectEvent(event, 'ArrowUp', app);
  expect(app.state().isNavigationSelected).toEqual(false);
  expect(app.state().isBackButtonSelected).toEqual(true);
  connectEvent(event, 'ArrowRight', app);
  connectEvent(event, 'ArrowLeft', app);
  connectEvent(event, 'ArrowDown', app);
  expect(app.state().isNavigationSelected).toEqual(true);
  expect(app.state().isBackButtonSelected).toEqual(false);
  expect(app.state().selectedPosition).toEqual(2);
  connectEvent(event, 'ArrowRight', app);
  expect(app.state().selectedPosition).toEqual(3);
  connectEvent(event, 'ArrowRight', app);
  expect(app.state().selectedPosition).toEqual(4);
  connectEvent(event, 'ArrowRight', app);
  expect(app.state().selectedPosition).toEqual(4);
  connectEvent(event, 'ArrowLeft', app);
  expect(app.state().selectedPosition).toEqual(3);
  connectEvent(event, 'ArrowLeft', app);
  expect(app.state().selectedPosition).toEqual(2);
  connectEvent(event, 'ArrowLeft', app);
  expect(app.state().selectedPosition).toEqual(1);
  connectEvent(event, 'ArrowLeft', app);
  expect(app.state().selectedPosition).toEqual(0);
  connectEvent(event, 'ArrowLeft', app);
  expect(app.state().selectedPosition).toEqual(0);
  connectEvent(event, 'ArrowRight', app);
  expect(app.state().selectedPosition).toEqual(1);
  connectEvent(event, 'ArrowUp', app);
  expect(app.state().isBackButtonSelected).toEqual(true);
  expect(app.state().isNavigationSelected).toEqual(false);
  connectEvent(event, 'Enter', app);
  jest.fn(() => {});
  connectEvent(event, 'ArrowDown', app);
  expect(app.state().isNavigationSelected).toEqual(true);
  connectEvent(event, 'ArrowRight', app);
  connectEvent(event, 'ArrowRight', app);
  expect(app.state().selectedPosition).toEqual(4);
  connectEvent(event, 'Enter', app);
  jest.fn(() => {});
  connectEvent(event, 'ArrowLeft', app);
  expect(app.state().selectedPosition).toEqual(3);
  connectEvent(event, 'Enter', app);
  jest.fn(() => {});
  connectEvent(event, 'ArrowLeft', app);
  expect(app.state().selectedPosition).toEqual(2);
  connectEvent(event, 'Enter', app);
  jest.fn(() => {});
  connectEvent(event, 'ArrowLeft', app);
  expect(app.state().selectedPosition).toEqual(1);
  connectEvent(event, 'Enter', app);
  jest.fn(() => {});
  connectEvent(event, 'ArrowLeft', app);
  expect(app.state().selectedPosition).toEqual(0);
  connectEvent(event, 'Enter', app);
  jest.fn(() => {});
  app.setState({ selectedPosition: 10 }); // invalid navigation position
  const appInstance: Object = app.instance();
  expect(() => { appInstance.handleKeyPress({ preventDefault: () => {}, code: 'Enter' }) }).toThrow();
  jest.fn(() => {});
  connectEvent(event, 'Backspace', app);
  app.setProps({ showUI: false });
  jest.fn(() => {});
  connectEvent(event, 'Backspace', app);
  expect(app.props().showUI).toEqual(false);
  expect(app.state().isNavigationSelected).toEqual(true);
  expect(app.state().isBackButtonSelected).toEqual(false);
  connectEvent(event, 'Space', app);
});
test('videoPlayer navigation works with playlist', () => {
  const app = mount(
    <VideoPlayer
      videoUrl="https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8"
      isVideoExpanded
      episodeTitle="hello"
      posterImage={null}
      videoID={141}
      handleVideoExpansion={() => {}}
      playlist={dummySeries}
    />,
  );
  expect(app.state().isNavigationSelected).toEqual(true);
  const event = new Event('keyDown');
  connectEvent(event, 'ArrowRight', app);
  connectEvent(event, 'ArrowRight', app);
  // $FlowFixMe
  app.instance().player.playlist.currentItem = jest.fn(() => 1);
  // mock item changed event since we already mocked function which does it
  // $FlowFixMe
  app.instance().player.trigger('playlistitem');
  expect(app.state().selectedPosition).toEqual(4);
  connectEvent(event, 'Enter', app);
  jest.fn(() => {});
  connectEvent(event, 'ArrowLeft', app);
  expect(app.state().selectedPosition).toEqual(3);
  connectEvent(event, 'Enter', app);
  jest.fn(() => {});
  connectEvent(event, 'ArrowLeft', app);
  expect(app.state().selectedPosition).toEqual(2);
  connectEvent(event, 'Enter', app);
  jest.fn(() => {});
  connectEvent(event, 'ArrowLeft', app);
  expect(app.state().selectedPosition).toEqual(1);
  connectEvent(event, 'Enter', app);
  jest.fn(() => {});
  connectEvent(event, 'ArrowLeft', app);
  expect(app.state().selectedPosition).toEqual(0);
  connectEvent(event, 'Enter', app);
  jest.fn(() => {});
});
test('videoPlayer navigation works for WEBOS TV and Opera', () => {
  const app = mount(
    <VideoPlayer
      videoUrl="https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8"
      isVideoExpanded
      episodeTitle="hello"
      posterImage={null}
      videoID={5}
      handleVideoExpansion={() => {}}
    />,
  );
  expect(app.state().isNavigationSelected).toEqual(true);
  const event = new Event('keyDown');
  connectEvent(event, 39, app);
  expect(app.state().selectedPosition).toEqual(3);
  connectEvent(event, 37, app);
  expect(app.state().selectedPosition).toEqual(2);
  connectEvent(event, 40, app);
  expect(app.state().isNavigationSelected).toEqual(true);
  connectEvent(event, 38, app);
  expect(app.state().isBackButtonSelected).toEqual(true);
  connectEvent(event, 13, app);
  jest.fn(() => {});
  connectEvent(event, 8, app);
  connectEvent(event, 415, app);
  connectEvent(event, 412, app);
  connectEvent(event, 417, app);
  connectEvent(event, 'Space', app);
});
test('videoPlayer expanding works', () => {
  const app = mount(
    <VideoPlayer
      videoUrl="https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8"
      isVideoExpanded={false}
      episodeTitle="hello"
      posterImage={null}
      videoID={5}
      handleVideoExpansion={() => {}}
    />,
  );
  expect(app.props().isVideoExpanded).toEqual(false);
  app.setProps({ isVideoExpanded: true });
  expect(app.props().isVideoExpanded).toEqual(true);
  expect(app.state().timeProgress).toEqual(0);
});
test('Video progress saves properly', () => {
  // $FlowFixMe
  storage.saveVideoProgress = jest.fn();
  const mockedPlayer = {
    currentTime: jest.fn(() => 5),
    duration: jest.fn(() => 100),
  };
  VideoPlayer.saveVideoTime(mockedPlayer, 10);
  expect(mockedPlayer.currentTime.mock.calls.length).toBe(1);
  // $FlowFixMe
  expect(storage.saveVideoProgress.mock.calls).toEqual([[10, 5]]);
});
test('VideoSaver works properly', () => {
  jest.useFakeTimers();
  const dummyPlayer = {
    currentTime: jest.fn(() => 10),
    duration: jest.fn(() => 100),
  };
  VideoPlayer.createVideoSaver(dummyPlayer, 5);
  jest.runTimersToTime(1000);
  expect(setInterval.mock.calls.length).toBe(1);
  expect(setInterval.mock.calls[0][1]).toBe(1000);
  jest.clearAllTimers();
});
test('Clears interface after 1.5 seconds', () => {
  jest.useFakeTimers();
  const app = shallow(
    <VideoPlayer
      videoUrl="whatever"
      posterImage={null}
      videoID={5}
      isVideoExpanded={false}
      episodeTitle="hello"
      handleVideoExpansion={() => {}}
    />,
  );
  const appInstance: Object = app.instance();
  appInstance.hideInterface();
  jest.runTimersToTime(1500);
  expect(setTimeout.mock.calls.length).toBe(1);
  expect(setTimeout.mock.calls[0][1]).toBe(1500);
  jest.clearAllTimers();
});
