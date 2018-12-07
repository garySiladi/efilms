// @flow
import React from 'react';
import { browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';
import classnames from 'classnames';
import Slider from '../slider/slider';
import EpisodeSelected from '../episode-selected/episode-selected';
import VideoPlayer from '../video-player-container/parts/video-player';
import { getSeriesByID } from '../../api/fetch';
import { getLastWatchedEpisodeID } from '../../api/local-storage';
import './series-container.css';
import SeriesDescription from './parts/series-description';

export type SeriesContainerProps = {
  params: {
    id: number,
  },
  location: {
    query: {
      expandedEpisode: string,
    },
  },
};
export type PublishedEpisodeType = {
  id: number,
  series_id: number,
  thumbnail: {
    url: string,
  },
  title: string,
  subtitle: string,
  description: string,
  video_url: string,
};
export type SeriesType = {
  title: string,
  description: string,
  additional_assets: [
    {
      key: string,
      file: {
        url: string,
      },
    },
    {
      key: string,
      file: {
        url: string,
      },
    },
    {
      key: string,
      file: {
        url: string,
      },
    },
  ],
  published_episodes: Array<PublishedEpisodeType>
};
type SeriesContainerState = {
  series: ?SeriesType,
  lastWatchedEpisode: ?PublishedEpisodeType,
  selectedEpisode: number,
  isSliderSelected: boolean,
  isEpisodeDetailSelected: boolean,
  goToEpisodeDetail: boolean,
  isWatchnowBtnSelected: boolean,
  isWatchnowBtnClicked: boolean,
  isBackButtonSelected: boolean,
  isVideoPlaying: boolean,
};

class SeriesContainer extends React.Component {
  static getLastWatchedEpisode(series: SeriesType) {
    const episodeIDs = series.published_episodes.map(episode => episode.id);
    const lastWatchedEpisodeID = getLastWatchedEpisodeID(episodeIDs);
    return series.published_episodes.find(episode => episode.id === lastWatchedEpisodeID);
  }
  constructor(props: SeriesContainerProps) {
    super(props);
    this.state = {
      series: null,
      lastWatchedEpisode: null,
      selectedEpisode: 0,
      isSliderSelected: true,
      goToEpisodeDetail: false,
      isEpisodeDetailSelected: false,
      isWatchnowBtnSelected: false,
      isWatchnowBtnClicked: false,
      isBackButtonSelected: false,
      isVideoPlaying: false,
    };
    (this: any).handleKeyPress = (this: any).handleKeyPress.bind(this);
    (this: any).handleExpand = (this: any).handleExpand.bind(this);
    (this: any).handleReturnFromEpisode = (this: any).handleReturnFromEpisode.bind(this);
    (this: any).handleVideoExpansion = (this: any).handleVideoExpansion.bind(this);
    (this: any).handleVideoPlaying = (this: any).handleVideoPlaying.bind(this);
  }
  state: SeriesContainerState
  componentWillMount() {
    getSeriesByID(this.props.params.id)
    .then((series) => {
      const expandedEpisodeId = Number(this.props.location.query.expandedEpisode);
      const foundPosition = series.published_episodes.findIndex(
        episode => episode.id === expandedEpisodeId,
      );
      const lastWatchedEpisode = SeriesContainer.getLastWatchedEpisode(series);
      this.setState({
        series,
        lastWatchedEpisode,
        selectedEpisode: foundPosition < 0 ? 0 : foundPosition,
      });
    })
    .catch(err => err);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    this.handleExpand();
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleExpand() {
    if (this.props.location.query.expandedEpisode) {
      this.setState({
        goToEpisodeDetail: true,
      });
    }
  }
  handleVideoExpansion(isExpanded: boolean) {
    let lastWatchedEpisode = null;
    if (this.state.series) {
      lastWatchedEpisode = SeriesContainer.getLastWatchedEpisode(this.state.series);
    }
    this.setState({
      isWatchnowBtnClicked: isExpanded,
      lastWatchedEpisode,
    });
  }
  handleVideoPlaying(isVideoPlaying: boolean) {
    this.setState({ isVideoPlaying });
  }
  handleReturnFromEpisode() {
    this.setState({ goToEpisodeDetail: false });
  }
  handleKeyPress(event: KeyboardEvent) {
    const {
      series,
      goToEpisodeDetail,
      selectedEpisode,
      isSliderSelected,
      isWatchnowBtnSelected,
      isWatchnowBtnClicked,
      isBackButtonSelected,
      isVideoPlaying,
    } = this.state;
    if (isVideoPlaying || isWatchnowBtnClicked) {
      return;
    }
    switch (event.code || event.which) {
      case 37:
      case 'ArrowLeft':
        event.preventDefault();
        if (goToEpisodeDetail) return;
        if (isSliderSelected && selectedEpisode !== 0) {
          this.setState({
            selectedEpisode: selectedEpisode - 1,
          });
        }
        break;
      case 39:
      case 'ArrowRight':
        event.preventDefault();
        if (isSliderSelected && series &&
          selectedEpisode < series.published_episodes.length - 1 && !goToEpisodeDetail) {
          this.setState({
            selectedEpisode: selectedEpisode + 1,
          });
        }
        break;
      case 38:
      case 'ArrowUp':
        event.preventDefault();
        if (isWatchnowBtnSelected) {
          this.setState({
            isWatchnowBtnSelected: false,
            isBackButtonSelected: true,
          });
        }
        if (isSliderSelected && !goToEpisodeDetail) {
          this.setState({
            isSliderSelected: false,
            isWatchnowBtnSelected: true,
          });
        }
        if (isSliderSelected && goToEpisodeDetail) {
          this.setState({
            goToEpisodeDetail: false,
          });
        }
        break;
      case 40:
      case 'ArrowDown':
        event.preventDefault();
        if (isWatchnowBtnSelected) {
          this.setState({
            isSliderSelected: true,
            isWatchnowBtnSelected: false,
          });
        } else if (isBackButtonSelected) {
          this.setState({
            isBackButtonSelected: false,
            isWatchnowBtnSelected: true,
          });
        } else {
          this.setState({ goToEpisodeDetail: true });
        }
        break;
      case 13:
      case 'Enter':
        if (isSliderSelected && !goToEpisodeDetail) {
          event.stopImmediatePropagation();
          this.setState({ goToEpisodeDetail: true });
        }
        if (isWatchnowBtnSelected) {
          this.setState({
            isWatchnowBtnClicked: true,
          });
        }
        if (isBackButtonSelected) {
          browserHistory.push('/');
        }
        break;
      case 8:
      case 461:
      case 'Backspace':
        if (!goToEpisodeDetail && !isWatchnowBtnClicked) {
          browserHistory.push('/');
        }
        break;
      default:
    }
  }
  render() {
    const {
      series,
      lastWatchedEpisode,
      selectedEpisode,
      isSliderSelected,
      goToEpisodeDetail,
      isWatchnowBtnSelected,
      isWatchnowBtnClicked,
      isBackButtonSelected,
    } = this.state;
    const assetKeys = ['eco_background', 'eco_detail_logo', 'eco_sponsor_logo'];
    const [
      backgroundAsset,
      logoAsset,
      sponsorAsset,
    ] = assetKeys.map(key => series ? series.additional_assets.find(
        asset => asset.key === key,
      ) : null,
    );
    const backgroundStyle = backgroundAsset ? {
      backgroundImage: `url(${backgroundAsset.file.url})`,
    } : null;
    const selectedEpisodeData = series && series.published_episodes[selectedEpisode];
    const seriesDescriptionContainer = series ? (
      <SeriesDescription
        isWatchnowBtnSelected={isWatchnowBtnSelected}
        description={series.description}
        seriesLogoUrl={logoAsset ? logoAsset.file.url : null}
        sponsorLogoUrl={sponsorAsset ? sponsorAsset.file.url : null}
      />
    ) : null;
    const episodeDetailsContainer = selectedEpisodeData ? (
      <EpisodeSelected
        id={selectedEpisodeData.id}
        key={selectedEpisodeData.id}
        url={selectedEpisodeData.thumbnail.url}
        title={selectedEpisodeData.title}
        subtitle={selectedEpisodeData.subtitle}
        description={selectedEpisodeData.description}
        closePopupFunction={this.handleReturnFromEpisode}
        videoUrl={selectedEpisodeData.video_url}
        seriesId={selectedEpisodeData.series_id}
        isSelectedHomeContainer={false}
        isShown={goToEpisodeDetail}
        selectedSeries={0}
        series={[]}
        selectLowerSeries
        handleVideo={this.handleVideoPlaying}
      />
    ) : null;
    const slider = series ? (
      <Slider
        data={series.published_episodes}
        className="home-slider"
        sliderTitle={series.title}
        key={series.title}
        isSelected={isSliderSelected}
        selectedEpisode={selectedEpisode}
        isEpisodeExpanded={goToEpisodeDetail}
        resetOnUnselect={false}
      />
    ): null;
    const lastWatchedVideo = isWatchnowBtnClicked && lastWatchedEpisode ? (
      <VideoPlayer
        videoUrl={lastWatchedEpisode.video_url}
        episodeTitle={lastWatchedEpisode.title}
        isVideoExpanded
        posterImage={lastWatchedEpisode.thumbnail.url}
        videoID={lastWatchedEpisode.id}
        handleVideoExpansion={this.handleVideoExpansion}
        playlist={series}
      />
    ): null;
    const backButtonClassname = classnames({
      'series-container__back-button': true,
      'series-container__back-button--selected': isBackButtonSelected,
      'series-container__back-button--hidden': goToEpisodeDetail,
    });
    const seriesContentClassname = classnames({
      'series-content': true,
      'series-content--expanded': goToEpisodeDetail,
    });
    return (
      <div className="series-container">
        {lastWatchedVideo}
        <div className={backButtonClassname}>
          <FontAwesome
            name="chevron-left"
          />
        </div>
        <div className="series-container__background" style={backgroundStyle} />
        <div className="gradient-cover" />
        <div className={seriesContentClassname}>
          {seriesDescriptionContainer}
          {slider}
          {episodeDetailsContainer}
        </div>
      </div>
    );
  }
}

export default SeriesContainer;
