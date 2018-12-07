// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import EpisodeSelected from './episode-selected';
import { mockData } from '../home-container/home-container.test';

jest.mock('./parts/episode-description', () =>
  jest.fn(() => <div>EpisodeDescription</div>),
);

jest.mock('../video-player-container/parts/video-player', () =>
  jest.fn(() => <div>VideoPlayer</div>),
);

function connectEvent(event, type, wrapper) {
  const changedEvent: Object = event;
  if (typeof type === 'number') {
    changedEvent.which = type;
  } else if (typeof type === 'string') {
    changedEvent.code = type;
  }
  const episodeSelected: Object = wrapper.instance();
  episodeSelected.handleKeyPress(event);
}

describe('HomeContainer ', () => {
  test('renders with data', () => {
    const tree : string = renderer.create(<EpisodeSelected
      id={3}
      url="https://cdn.twivel.io/uploads/economist/episode/thumbnail/141/episode_875X480.jpg"
      title="title xyz"
      subtitle="subtitle xyz"
      description="description xyz"
      closePopupFunction={() => {}}
      selectedSeries={3}
      selectedEpisode={4}
      selectLowerSeries={() => {}}
      handleVideo={() => {}}
      series={mockData}
      videoUrl="https://cdn-films.economist.com/OCEANS/OCEANDEEP.m3u8"
      seriesId={7}
      isSelectedHomeContainer
      isShown
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('handles keyboard events when homeContainer is selected', () => {
    const episodeSelected = mount(<EpisodeSelected
      id={3}
      url="https://cdn.twivel.io/uploads/economist/episode/thumbnail/141/episode_875X480.jpg"
      title="title xyz"
      subtitle="subtitle xyz"
      description="description xyz"
      closePopupFunction={() => {}}
      selectedSeries={3}
      selectedEpisode={4}
      selectLowerSeries={() => {}}
      handleVideo={null}
      series={mockData}
      videoUrl="https://cdn-films.economist.com/OCEANS/OCEANDEEP.m3u8"
      seriesId={7}
      isSelectedHomeContainer
      isShown
    />);
    const event = new Event('keyDown');
    // when home container is selected there are 2 buttons
    expect(episodeSelected.state().selectedItem).toEqual(0);
    connectEvent(event, 'Shift', episodeSelected);
    connectEvent(event, 'ArrowDown', episodeSelected);
    connectEvent(event, 'ArrowRight', episodeSelected);
    expect(episodeSelected.state().selectedItem).toEqual(1);
    connectEvent(event, 'ArrowRight', episodeSelected);
    expect(episodeSelected.state().selectedItem).toEqual(1);
    connectEvent(event, 'Enter', episodeSelected);
    connectEvent(event, 'ArrowLeft', episodeSelected);
    expect(episodeSelected.state().selectedItem).toEqual(0);
    connectEvent(event, 'ArrowLeft', episodeSelected);
    connectEvent(event, 'Enter', episodeSelected);
    connectEvent(event, 'ArrowUp', episodeSelected);
    connectEvent(event, 'Enter', episodeSelected);
    connectEvent(event, 'ArrowRight', episodeSelected);
    connectEvent(event, 'Backspace', episodeSelected);
    // when home container is unselected and there is just 1 button
    episodeSelected.setState({ isSelectedHomeContainer: false });
    expect(episodeSelected.state().selectedItem).toEqual(0);
    connectEvent(event, 'Enter', episodeSelected);
    connectEvent(event, 'ArrowLeft', episodeSelected);
    connectEvent(event, 'Enter', episodeSelected);
    connectEvent(event, 'ArrowRight', episodeSelected);
    connectEvent(event, 'Backspace', episodeSelected);
  });
  test('handles keyboard events when homeContainer is selected for WEBOS TV', () => {
    const episodeSelected = mount(<EpisodeSelected
      id={3}
      url="https://cdn.twivel.io/uploads/economist/episode/thumbnail/141/episode_875X480.jpg"
      title="title xyz"
      subtitle="subtitle xyz"
      description="description xyz"
      closePopupFunction={() => {}}
      selectedSeries={3}
      selectedEpisode={4}
      selectLowerSeries={() => {}}
      handleVideo={() => {}}
      series={mockData}
      videoUrl="https://cdn-films.economist.com/OCEANS/OCEANDEEP.m3u8"
      seriesId={7}
      isSelectedHomeContainer
      isShown
    />);
    const event = new Event('keyDown');
    // when home container is selected there are 2 buttons
    connectEvent(event, 8, episodeSelected);
    connectEvent(event, 40, episodeSelected);
    connectEvent(event, 39, episodeSelected);
    connectEvent(event, 37, episodeSelected);
    connectEvent(event, 38, episodeSelected);
    connectEvent(event, 13, episodeSelected);
  });
  test('handles keyboard events when homeContainer is unselected', () => {
    const episodeSelected = mount(<EpisodeSelected
      id={3}
      url="https://cdn.twivel.io/uploads/economist/episode/thumbnail/141/episode_875X480.jpg"
      title="title xyz"
      subtitle="subtitle xyz"
      description="description xyz"
      closePopupFunction={() => {}}
      selectedSeries={3}
      selectedEpisode={4}
      selectLowerSeries={() => {}}
      handleVideo={() => {}}
      series={mockData}
      videoUrl="https://cdn-films.economist.com/OCEANS/OCEANDEEP.m3u8"
      seriesId={7}
      isSelectedHomeContainer={false}
      isShown
    />);
    const event = new Event('keyDown');
    // when home container is unselected there is just 1 button
    expect(episodeSelected.state().selectedItem).toEqual(0);
    connectEvent(event, 'ArrowLeft', episodeSelected);
    connectEvent(event, 'ArrowUp', episodeSelected);
    connectEvent(event, 'ArrowRight', episodeSelected);
    connectEvent(event, 'ArrowDown', episodeSelected);
    connectEvent(event, 'Backspace', episodeSelected);
    connectEvent(event, 'Backspace', episodeSelected);
  });
  test('handles keyboard events without closePopupFunction', () => {
    const episodeSelected = mount(<EpisodeSelected
      id={3}
      url="https://cdn.twivel.io/uploads/economist/episode/thumbnail/141/episode_875X480.jpg"
      title="title xyz"
      subtitle="subtitle xyz"
      description="description xyz"
      videoUrl="https://cdn-films.economist.com/OCEANS/OCEANDEEP.m3u8"
      seriesId={7}
      isSelectedHomeContainer
      closePopupFunction={() => {}}
      selectedSeries={3}
      selectedEpisode={4}
      selectLowerSeries={() => {}}
      handleVideo={() => {}}
      series={mockData}
      isShown
    />);
    const event = new Event('keyDown');
    // when home container is unselected and there is just 1 button
    expect(episodeSelected.state().selectedItem).toEqual(0);
    connectEvent(event, 'ArrowUp', episodeSelected);
    connectEvent(event, 'Backspace', episodeSelected);
  });
  test('mounts/unmounts', () => {
    const wrapper = shallow(<EpisodeSelected
      id={3}
      url="url xyz"
      title="title xyz"
      subtitle="subtitle xyz"
      description="description xyz"
      closePopupFunction={() => {}}
      videoUrl=""
      seriesId={7}
      selectedSeries={3}
      selectedEpisode={4}
      selectLowerSeries={() => {}}
      handleVideo={() => {}}
      series={mockData}
      isSelectedHomeContainer
      isShown
    />);
    wrapper.unmount();
  });
  test('hides buttons', () => {
    const tree : string = renderer.create(<EpisodeSelected
      id={3}
      url="https://cdn.twivel.io/uploads/economist/episode/thumbnail/141/episode_875X480.jpg"
      title="title xyz"
      subtitle="subtitle xyz"
      description="description xyz"
      closePopupFunction={() => {}}
      videoUrl="https://cdn-films.economist.com/OCEANS/OCEANDEEP.m3u8"
      seriesId={7}
      selectedSeries={3}
      selectedEpisode={4}
      selectLowerSeries={() => {}}
      handleVideo={() => {}}
      series={mockData}
      isSelectedHomeContainer
      hideButtons={false}
      isShown
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
