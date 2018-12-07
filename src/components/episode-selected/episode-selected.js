// @flow
import React from 'react';
import { browserHistory } from 'react-router';
import classnames from 'classnames';
import FontAwesome from 'react-fontawesome';
import EpisodeDescription from './parts/episode-description';
import VideoPlayer from '../video-player-container/parts/video-player';
import './episode-selected.css';
import type { SeriesType } from '../app/app';

type EpisodeSelectedType = {
  id: number,
  url: string,
  title: string,
  subtitle: string,
  description: string,
  selectedSeries: number,
  closePopupFunction: Function,
  selectLowerSeries: Function,
  handleVideo: ?Function,
  videoUrl: string,
  series: Array<SeriesType>,
  seriesId: ?number,
  isSelectedHomeContainer: boolean,
  isShown: boolean,
  hideButtons?: boolean,
};

class episodeSelected extends React.Component {
  static defaultProps = {
    hideButtons: true,
  };
  constructor(props: EpisodeSelectedType) {
    super(props);
    this.state = {
      selectedItem: 0,
      isVideoExpanded: false,
    };
    (this: any).handleKeyPress = this.handleKeyPress.bind(this);
    (this: any).handleVideoExpansion = this.handleVideoExpansion.bind(this);
  }
  state: {
    selectedItem: number,
    isVideoExpanded: boolean,
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleVideoExpansion(position: boolean) {
    if (this.props.handleVideo) {
      this.props.handleVideo(position);
    }
    this.setState({
      isVideoExpanded: position,
    });
  }
  handleKeyPress(event: KeyboardEvent) {
    const {
      selectedItem,
      isVideoExpanded,
    } = this.state;
    const {
      closePopupFunction,
      selectLowerSeries,
      selectedSeries,
      isSelectedHomeContainer,
      series,
      seriesId,
      id,
      isShown,
    } = this.props;
    if (isVideoExpanded) return;
    switch (event.code || event.which) {
      case 38:
      case 'ArrowUp':
        event.preventDefault();
        closePopupFunction(event);
        if (isSelectedHomeContainer) {
          browserHistory.replace('/');
        }
        break;
      case 40:
      case 'ArrowDown':
        event.preventDefault();
        if (isSelectedHomeContainer) {
          closePopupFunction(event);
          selectLowerSeries(selectedSeries, series.length);
          browserHistory.replace('/');
        }
        break;
      case 37:
      case 'ArrowLeft':
        event.preventDefault();
        if (isSelectedHomeContainer) {
          if (selectedItem > 0) {
            this.setState({
              selectedItem: selectedItem - 1,
            });
          }
        }
        break;
      case 39:
      case 'ArrowRight':
        event.preventDefault();
        if (isSelectedHomeContainer) {
          if (selectedItem < 1) {
            this.setState({
              selectedItem: selectedItem + 1,
            });
          }
        }
        break;
      case 8:
      case 461:
      case 'Backspace':
        event.preventDefault();
        closePopupFunction(event);
        if (isSelectedHomeContainer) {
          browserHistory.replace('/');
        }
        break;
      case 13:
      case 'Enter':
        event.preventDefault();
        if (selectedItem === 0 && isShown) {
          event.stopImmediatePropagation();
          this.handleVideoExpansion(true);
        }
        if (selectedItem === 1 && seriesId) {
          browserHistory.push(`/series/${seriesId}?expandedEpisode=${id}`);
        }
        break;
      default:
    }
  }
  props: EpisodeSelectedType;
  render() {
    const {
      id,
      url,
      subtitle,
      title,
      description,
      videoUrl,
      isShown,
      hideButtons,
    } = this.props;
    const {
      selectedItem,
      isVideoExpanded,
    } = this.state;
    const episodesSelectedClassName = classnames({
      'episode-selected': true,
      'episode-selected--expanded': isShown,
    });
    const videoContainerClassName = classnames({
      'video-container': true,
      'video-container--expanded': isVideoExpanded,
    });
    const expandButtonClassName = classnames({
      'episode-selected__image': true,
      'episode-selected__image--selected': selectedItem === 0 && isShown,
    });
    return (
      <div className={episodesSelectedClassName}>
        <div className="episode-selected__teaser-wrapper">
          <div className={videoContainerClassName}>
            {isShown ? (
              <VideoPlayer
                videoUrl={videoUrl}
                episodeTitle={title}
                isVideoExpanded={isVideoExpanded}
                posterImage={url}
                videoID={id}
                handleVideoExpansion={this.handleVideoExpansion}
              />
            ) : null}
          </div>
          <div className={expandButtonClassName}>
            <FontAwesome
              name="chevron-left"
              className="expand-button__arrow expand-button__arrow--first"
            />
            <FontAwesome
              name="chevron-left"
              className="expand-button__arrow expand-button__arrow--second"
            />
          </div>
        </div>
        <div className="episode-selected__info-container">
          <EpisodeDescription
            title={title} description={description} subtitle={subtitle}
            className="episode-description-wrapper"
          />
          {hideButtons ? null : (
            <div className="episode-buttons">
              <div
                className={classnames({
                  'episode-buttons__learn': true,
                  'episode-buttons__learn--selected': selectedItem === 1,
                })}
              >
                Learn More
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default episodeSelected;
