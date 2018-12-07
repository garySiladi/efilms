// @flow
import React from 'react';
import { browserHistory } from 'react-router';
import { getRoot, getRecommendedEpisodes } from '../../api/fetch';
import HomeContainer from '../home-container/home-container';
import './app.css';

type AppParamsProps = {
  selectedEpisodeId?: string, // eslint-disable-line
};

type AppProps = {
  params: AppParamsProps,
  location: {
    query: {
      recommended?: ?string,
    }
  }
};

export type SeriesItemType = {
  id: number,
  series_id: ?number,
  type: string,
  title: string,
  subtitle: string,
  description: string,
  video_url: string,
  thumbnail: {
    url: string,
  },
};

export type SeriesType = {
  id: number,
  series_id: ?number,
  items: Array<SeriesItemType>,
  title: string,
  thumbnail_size: string,
}

class App extends React.Component {
  static createRecommendedSlider(dataRecommended) {
    return {
      id: -1, // we are setting a custom ID because recommended is not in JSON
      series_id: -1,
      title: 'Recommended',
      items: dataRecommended.items,
      type: 'series',
      thumbnail_size: '',
    };
  }
  static massageSeries(series: Array<SeriesType>) {
    // remove All Series
    return series.filter(shelf => shelf.id !== 10);
  }
  static setEpisodeByParam(id: ?string, series: Array<SeriesType>) {
    const foundEpisodes = [];
    series.forEach((shelf, shelfIndex) => {
      shelf.items.forEach((episode, episodeIndex) => {
        if (episode.id === Number(id) && episode.type === 'Episode') {
          foundEpisodes.push([shelfIndex, episodeIndex]);
        }
      });
    });
    const firstResult = foundEpisodes[0];
    return {
      selectedSeries: firstResult ? firstResult[0] : 0,
      selectedEpisode: firstResult ? firstResult[1] : 0,
      goToEpisode: firstResult instanceof Array,
    };
  }
  constructor(props: AppProps) {
    super(props);
    this.state = {
      series: [],
      selectedSeries: 0,
      selectedEpisode: 0,
      goToEpisode: false,
      didScroll: false,
    };
    (this: any).handleKeyPress = this.handleKeyPress.bind(this);
    (this: any).handleWheel = this.handleWheel.bind(this);
    (this: any).scrollSeries = this.scrollSeries.bind(this);
    (this: any).handleReturnFromEpisode = this.handleReturnFromEpisode.bind(this);
    (this: any).handleArrowDown = this.handleArrowDown.bind(this);
  }
  state: {
    series: Array<SeriesType>,
    selectedSeries: number,
    selectedEpisode: number,
    goToEpisode: boolean,
    didScroll: boolean,
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    document.addEventListener('wheel', this.handleWheel);
    const {
      params,
      location: {
        query: {
          recommended: recommendedUserID,
        },
      },
    } = this.props;
    getRoot()
    .then((dataSeries) => {
      const modifiedSeries = this.state.series.concat(
        App.massageSeries(dataSeries.shelves || []),
      );
      this.setState({
        series: modifiedSeries,
        ...App.setEpisodeByParam(params.selectedEpisodeId, modifiedSeries),
      });
    });
    if (recommendedUserID) {
      getRecommendedEpisodes(recommendedUserID)
      .then((dataRecommended) => {
        const modifiedSeries =
          [App.createRecommendedSlider(dataRecommended)].concat(this.state.series);
        this.setState({
          series: modifiedSeries,
          ...App.setEpisodeByParam(params.selectedEpisodeId, modifiedSeries),
        });
      });
    }
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
    document.removeEventListener('wheel', this.handleWheel);
  }
  props: AppProps;
  scrollSeries(event: KeyboardEvent | WheelEvent) {
    const {
      selectedSeries,
      series,
      goToEpisode,
    } = this.state;
    event.preventDefault();
    if (goToEpisode) return;
    const isTargetUp = event instanceof KeyboardEvent ? event.code === 'ArrowUp' || event.which === 38 : event.deltaY < 0;
    this.resetSelectedEpisode();
    if (selectedSeries !== 0 && isTargetUp) {
      this.setState({
        selectedSeries: selectedSeries - 1,
      });
    } else if (selectedSeries !== series.length - 1 && !isTargetUp) {
      this.setState({
        selectedSeries: selectedSeries + 1,
      });
    }
  }
  handleReturnFromEpisode(event: KeyboardEvent) {
    event.preventDefault();
    this.setState({
      goToEpisode: false,
    });
  }
  handleWheel(event: WheelEvent) {
    event.preventDefault();
    if (!this.state.didScroll) {
      this.setState({
        didScroll: true,
      }, () => {
        setTimeout(() => {
          this.setState({
            didScroll: false,
          });
        }, 300);
      });
    }
    this.scrollSeries(event);
  }
  handleArrowDown(currentSeries: number, seriesLength: number) {
    if (currentSeries !== seriesLength - 1) {
      this.resetSelectedEpisode();
      this.setState({
        selectedSeries: currentSeries + 1,
      });
    }
  }
  handleKeyPress(event: KeyboardEvent) { // TODO: maybe export this functionality to another file
    const {
      selectedSeries,
      series,
      selectedEpisode,
      goToEpisode,
    } = this.state;
    if (goToEpisode) return;
    switch (event.code || event.which) {
      case 37:
      case 'ArrowLeft':
        event.preventDefault();
        if (selectedEpisode !== 0) {
          this.setState({
            selectedEpisode: selectedEpisode - 1,
          });
        }
        break;
      case 39:
      case 'ArrowRight':
        event.preventDefault();
        if (selectedEpisode !== series[selectedSeries].items.length - 1) {
          this.setState({
            selectedEpisode: selectedEpisode + 1,
          });
        }
        break;
      case 38:
      case 'ArrowUp':
      case 40:
      case 'ArrowDown':
        this.scrollSeries(event);
        break;
      case 13:
      case 'Enter':
        if (series[selectedSeries].items[selectedEpisode].type === 'Series') {
          const seriesId = series[selectedSeries].series_id || '';
          browserHistory.push(`/series/${seriesId}`);
        } else {
          event.stopImmediatePropagation();
          const episodeId = series[selectedSeries].items[selectedEpisode].id;
          browserHistory.replace(`/${episodeId}`);
          this.setState({
            goToEpisode: true,
          });
        }
        break;
      case 8:
      case 461:
      case 'Backspace':
        event.preventDefault();
        this.resetSelectedEpisode();
        break;
      default:
    }
  }
  resetSelectedEpisode() {
    this.setState({
      selectedEpisode: 0,
    });
  }
  render() {
    const {
      series,
      selectedSeries,
      selectedEpisode,
      goToEpisode,
    } = this.state;
    return (
      <div className="app">
        <HomeContainer
          series={series}
          selectedSeries={selectedSeries}
          selectedEpisode={selectedEpisode}
          goToEpisode={goToEpisode}
          closePopupFunction={this.handleReturnFromEpisode}
          selectLowerSeries={this.handleArrowDown}
        />
      </div>
    );
  }
}

export default App;
