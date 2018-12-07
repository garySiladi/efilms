// @flow
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from './app';
import * as API from '../../api/fetch';

const mockData = [
  {
    title: 'Ocean',
    id: 1,
    series_id: null,
    thumbnail_size: 'string',
    items: [
      {
        id: 0,
        series_id: 1,
        title: 'zzz',
        type: 'Series',
        subtitle: 'string',
        description: 'string',
        video_url: 'string',
        thumbnail: {
          url: 'url',
        },
      },
      {
        id: 1,
        series_id: null,
        title: 'xxx',
        type: 'Episode',
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
        type: 'Episode',
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
    series_id: null,
    thumbnail_size: 'string',
    items: [
      {
        id: 32,
        series_id: 2,
        title: 'asd',
        type: 'Episode',
        subtitle: 'string',
        description: 'string',
        video_url: 'string',
        thumbnail: {
          url: 'url',
        },
      },
      {
        id: 54,
        series_id: 2,
        title: 'aza',
        type: 'Episode',
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
    title: 'Recommended',
    id: 3,
    series_id: null,
    thumbnail_size: 'string',
    items: [
      {
        id: 3,
        series_id: 3,
        title: 'xxx',
        type: 'Episode',
        subtitle: 'string',
        description: 'string',
        video_url: 'string',
        thumbnail: {
          url: 'url',
        },
      },
      {
        id: 4,
        series_id: 3,
        title: 'aaa',
        type: 'Episode',
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

const mockDataWithUnwantedEpisodes = [
  {
    title: 'Wanted',
    id: 1,
    series_id: 3,
    type: 'Episode',
    thumbnail_size: 'string',
    items: [
      {
        id: 5,
        series_id: 5,
        title: 'xxx',
        type: 'Episode',
        subtitle: 'string',
        description: 'string',
        video_url: 'string',
        thumbnail: {
          url: 'url',
        },
      },
      {
        id: 6,
        series_id: 6,
        title: 'aaa',
        type: 'Episode',
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
    title: 'Unwanted 1',
    id: 10,
    series_id: 3,
    type: 'Episode',
    thumbnail_size: 'string',
    items: [
      {
        id: 7,
        series_id: 7,
        title: 'xxx',
        type: 'Episode',
        subtitle: 'string',
        description: 'string',
        video_url: 'string',
        thumbnail: {
          url: 'url',
        },
      },
      {
        id: 8,
        series_id: 8,
        title: 'aaa',
        type: 'Episode',
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

const mockedLocationData = {
  query: {},
};

jest.mock('../home-container/home-container', () =>
  jest.fn(() => <div>Home Container</div>),
);

function connectEvent(type, wrapper, handleFunction) {
  const app: Object = wrapper.instance();
  let event = new KeyboardEvent('', { code: type });
  if (typeof type === 'number') {
    event = new KeyboardEvent('', { which: type });
  }
  if (handleFunction === 'handleKeyPress') {
    app.handleKeyPress(event);
  } else if (handleFunction === 'handleReturnFromEpisode') {
    app.handleReturnFromEpisode(event);
  }
}
describe('App: ', () => {
  test('homepage navigation works', () => {
    const app = mount(<App params={{}} location={mockedLocationData} />);
    jest.useFakeTimers();
    const appInstance: Object = app.instance();
    expect(app.state().didScroll).toEqual(false);
    app.setState({ series: mockData });
    // no functionaility, just need to cover all branches, default switch
    connectEvent('Shift', app, 'handleKeyPress');
    // we have the first episode of the first series selected [0,0]
    // we select the second episode of the first series [0,1]
    connectEvent('ArrowRight', app, 'handleKeyPress');
    expect(app.state().selectedEpisode).toEqual(1);
    // we start navigating down 2 positions
    connectEvent('ArrowDown', app, 'handleKeyPress');
    expect(app.state().selectedSeries).toEqual(1);
    connectEvent('ArrowDown', app, 'handleKeyPress');
    expect(app.state().selectedSeries).toEqual(2);
    // we push the ArrowDown button, but there is no place at the bottom to navigate
    connectEvent('ArrowDown', app, 'handleKeyPress');
    expect(app.state().selectedSeries).toEqual(2);
    // we navigate down when episode selected popup is showed
    appInstance.handleArrowDown(1, mockData.length);
    expect(app.state().goToEpisode).toEqual(false);
    expect(app.state().selectedEpisode).toBe(0);
    expect(app.state().selectedSeries).toBe(2);
    appInstance.handleArrowDown(2, mockData.length);
    expect(app.state().goToEpisode).toEqual(false);
    expect(app.state().selectedEpisode).toBe(0);
    expect(app.state().selectedSeries).toBe(2);
    // we navigate up 2 positions to [1,0]
    connectEvent('ArrowUp', app, 'handleKeyPress');
    connectEvent('ArrowUp', app, 'handleKeyPress');
    expect(app.state().selectedSeries).toEqual(0);
    // we try the upper bounds
    connectEvent('ArrowUp', app, 'handleKeyPress');
    expect(app.state().selectedSeries).toEqual(0);
    connectEvent('Enter', app, 'handleKeyPress');
    connectEvent('ArrowRight', app, 'handleKeyPress');
    expect(app.state().selectedEpisode).toEqual(1);
    appInstance.handleWheel({ deltaY: -5, preventDefault: () => {} });
    jest.runTimersToTime(400);
    expect(setTimeout.mock.calls[0][1]).toBe(300);
    appInstance.handleWheel({ deltaY: 5, preventDefault: () => {} });
    jest.clearAllTimers();
    // the Backspace button resets the selected episode
    connectEvent('Backspace', app, 'handleKeyPress');
    expect(app.state().selectedEpisode).toEqual(0);
    connectEvent('ArrowRight', app, 'handleKeyPress');
    expect(app.state().selectedEpisode).toEqual(1);
    connectEvent('ArrowRight', app, 'handleKeyPress');
    connectEvent('ArrowLeft', app, 'handleKeyPress');
    connectEvent('ArrowLeft', app, 'handleKeyPress');
    expect(app.state().selectedEpisode).toEqual(0);
    connectEvent('ArrowLeft', app, 'handleKeyPress');
    connectEvent('ArrowRight', app, 'handleKeyPress');
    connectEvent('Enter', app, 'handleKeyPress');
    expect(app.state().goToEpisode).toEqual(true);
    appInstance.handleWheel({ deltaY: 5, preventDefault: () => {} });
    // no functionaility, just need to cover all branches, default switch
    connectEvent('Shift', app, 'handleKeyPress');
    connectEvent('Enter', app, 'handleKeyPress');
    connectEvent('ArrowRight', app, 'handleKeyPress');
    connectEvent('ArrowRight', app, 'handleReturnFromEpisode');
  });
  test('homepage navigation works for WEBOS', () => {
    const app = mount(<App params={{}} location={mockedLocationData} />);
    app.setState({ series: mockData });
    connectEvent('Backspace', app, 'handleKeyPress');
    expect(app.state().selectedEpisode).toEqual(0);
    // we have the first episode of the first series selected [0,0]
    // we select the second episode of the first series [0,1]
    // Right
    connectEvent(39, app, 'handleKeyPress');
    expect(app.state().selectedEpisode).toEqual(1);
    // Left
    connectEvent(37, app, 'handleKeyPress');
    expect(app.state().selectedEpisode).toEqual(0);
    // Down
    connectEvent(40, app, 'handleKeyPress');
    expect(app.state().selectedSeries).toEqual(1);
    // Up
    connectEvent(38, app, 'handleKeyPress');
    expect(app.state().selectedSeries).toEqual(0);
    // w
    connectEvent(38, app, 'handleKeyPress');
    expect(app.state().selectedSeries).toEqual(0);
    connectEvent(13, app, 'handleKeyPress');
    connectEvent(39, app, 'handleKeyPress');
    expect(app.state().selectedEpisode).toEqual(1);
    connectEvent(8, app, 'handleKeyPress');
  });
  test('function setEpisodeByParam() works', () => {
    const urlParams = {
      selectedEpisodeId: '32',
    };
    let output: ?Object = App.setEpisodeByParam(urlParams.selectedEpisodeId, mockData);
    expect(output).not.toBeNull();
    if (output) {
      expect(output.selectedSeries).toEqual(1);
      expect(output.selectedEpisode).toEqual(0);
      expect(output.goToEpisode).toEqual(true);
    }
    // test the searching function with non-existant episode ID
    output = App.setEpisodeByParam('100', mockData);
    expect(output).not.toBeNull();
    if (output) {
      expect(output.selectedSeries).toEqual(0);
      expect(output.selectedEpisode).toEqual(0);
      expect(output.goToEpisode).toEqual(false);
    }
  });
  test('mounts/unmounts', () => {
    const wrapper = shallow(<App params={{}} location={mockedLocationData} />);
    wrapper.unmount();
  });
});

test('removes Featured and More from the Economist from JSON', () => {
  const series = App.massageSeries(mockDataWithUnwantedEpisodes);
  expect(series).toEqual([
    mockDataWithUnwantedEpisodes[0],
  ]);
});

test('adds Recommended series when recommended query param is set', () => {
  // $FlowFixMe
  API.getRecommendedEpisodes = jest.fn()
  .mockReturnValue(
    new Promise((resolve) => {
      resolve(mockData[2]);
    }),
  );

  const app = mount(
    <App
      params={{}}
      location={{
        query: {
          recommended: "103",
        },
      }}
    />
  );
});
