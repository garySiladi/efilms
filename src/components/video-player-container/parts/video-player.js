// @flow
import React from 'react';
// $FlowFixMe
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import 'videojs-playlist';
import VideoPlayerInterface from './video-player-controls';
import './video-player.css';
import { saveVideoProgress, getProgressTimeById } from '../../../api/local-storage';

import type { SeriesType } from '../../series-detail/series-container';

window.videojs = videojs;
// eslint-disable-next-line
require('videojs-contrib-hls/dist/videojs-contrib-hls.js');

export type VideoPlayerPropsType = {
  episodeTitle: string,
  videoUrl: string,
  videoID: number,
  isVideoExpanded: boolean,
  posterImage: ?string,
  handleVideoExpansion: Function,
  playlist?: ?SeriesType,
};
export type VideoPlayerStateType = {
  isVideoPlaying: boolean,
  timeProgress: number,
  isNavigationSelected: boolean,
  isBackButtonSelected: boolean,
  selectedPosition: number,
  showInterface: boolean,
  videoTitle: string,
}

const videoJsOptions = (videoUrl: string, poster?: ?string) => ({
  preload: 'auto',
  autoplay: true,
  controls: false,
  poster,
  sources: [{
    src: videoUrl,
    type: 'application/x-mpegURL',
  }],
});

class VideoPlayer extends React.Component {
  static getProgress(player) {
    return (100 / player.duration()) * player.currentTime();
  }
  static renderTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time - (minutes * 60);
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${seconds}`;
  }
  static saveVideoTime(player, id) {
    const currentTime = Math.round(player.currentTime());
    const duration = Math.round(player.duration());
    const percentage = Math.round(currentTime / Math.round(duration / 100));
    saveVideoProgress(id, percentage);
  }
  static createVideoSaver(player, videoId) {
    return setInterval(() => {
      VideoPlayer.saveVideoTime(player, videoId);
    }, 1000);
  }
  constructor(props: VideoPlayerPropsType) {
    super(props);
    (this: any).moveTime = 10;
    (this: any).videoNode = null;
    (this: any).player = null;
    (this: any).videoSaver = null;
    (this: any).videoShower = null;
    this.state = {
      isVideoPlaying: true,
      timeProgress: 0,
      selectedPosition: 2,
      isBackButtonSelected: false,
      isNavigationSelected: true,
      showInterface: false,
      videoTitle: props.episodeTitle,
    };
    (this: any).handleFastForward = this.handleFastForward.bind(this);
    (this: any).handlePlay = this.handlePlay.bind(this);
    (this: any).handlePause = this.handlePause.bind(this);
    (this: any).handleRewind = this.handleRewind.bind(this);
    (this: any).handleVideoLoad = this.handleVideoLoad.bind(this);
    (this: any).handleEndReached = this.handleEndReached.bind(this);
    (this: any).handleTimeUpdate = this.handleTimeUpdate.bind(this);
    (this: any).showFormattedTime = this.showFormattedTime.bind(this);
    (this: any).handleKeyPress = this.handleKeyPress.bind(this);
    (this: any).handlePlayPause = this.handlePlayPause.bind(this);
    (this: any).hideInterface = this.hideInterface.bind(this);
    (this: any).handleEventSource = this.handleEventSource.bind(this);
  }
  state: VideoPlayerStateType;
  componentDidMount() {
    const {
      videoID,
      videoUrl,
      isVideoExpanded,
      posterImage,
      playlist,
    } = this.props;
    (this: any).player = videojs((this: any).videoNode, videoJsOptions(videoUrl, posterImage));
    (this: any).player.muted(!isVideoExpanded);
    if (isVideoExpanded) {
      (this: any).videoSaver = VideoPlayer.createVideoSaver((this: any).player, videoID);
    }
    document.addEventListener('keydown', this.handleKeyPress);
    if (playlist) {
      const episodes = playlist.published_episodes;
      const currentEpisodeIndex = episodes.findIndex(episode => videoID === episode.id);
      (this: any).player.playlist(
        episodes.map(episode => videoJsOptions(episode.video_url, episode.thumbnail.url)),
        currentEpisodeIndex,
      );
      this.updateVideoTitle(episodes[currentEpisodeIndex].title);
      (this: any).player.playlist.autoadvance(0);
      (this: any).player.on('playlistitem', () => {
        this.updateVideoTitle(episodes[(this: any).player.playlist.currentItem()].title);
      });
      this.handleVideoLoad();
    }
  }
  componentDidUpdate(prevProps: VideoPlayerPropsType) {
    if ((this: any).player) {
      (this: any).player.muted(!this.props.isVideoExpanded);
    }
    if (!prevProps.isVideoExpanded && this.props.isVideoExpanded) {
      this.handleVideoLoad();
      (this: any).videoSaver = VideoPlayer.createVideoSaver((this: any).player, this.props.videoID);
    }
  }
  componentWillUnmount() {
    clearInterval((this: any).videoSaver);
    clearTimeout((this: any).videoShower);
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  updateVideoTitle(title: string) {
    this.setState({ videoTitle: title });
  }
  handleEventSource(event: KeyboardEvent) {
    const {
      isVideoExpanded,
      handleVideoExpansion,
    } = this.props;
    event.stopImmediatePropagation();
    handleVideoExpansion(!isVideoExpanded);
  }
  handleKeyPress(event: KeyboardEvent) {
    const {
      isVideoExpanded,
    } = this.props;
    if (!isVideoExpanded) return;
    switch (event.code || event.which) {
      case 38:
      case 'ArrowUp':
        event.preventDefault();
        this.setState({
          isBackButtonSelected: true,
          isNavigationSelected: false,
          selectedPosition: -1,
        });
        break;
      case 40:
      case 'ArrowDown':
        event.preventDefault();
        this.setState({
          isNavigationSelected: true,
          isBackButtonSelected: false,
          selectedPosition: 2,
        });
        break;
      case 37:
      case 'ArrowLeft':
        event.preventDefault();
        this.moveLeft();
        break;
      case 39:
      case 'ArrowRight':
        event.preventDefault();
        this.moveRight();
        break;
      case 13:
      case 'Enter':
        event.preventDefault();
        if (this.state.isBackButtonSelected) {
          this.handleEventSource(event);
          return;
        }
        switch (this.state.selectedPosition) {
          case 0: {
            if (this.props.playlist) {
              (this: any).player.playlist.previous();
            } else {
              (this: any).player.currentTime(0);
            }
            break;
          }
          case 1: {
            this.handleRewind();
            break;
          }
          case 2: {
            this.handlePlayPause();
            break;
          }
          case 3: {
            this.handleFastForward();
            break;
          }
          case 4: {
            if (this.props.playlist) {
              (this: any).player.playlist.next();
            } else {
              (this: any).player.currentTime((this: any).player.duration() - 5);
            }
            break;
          }
          default: {
            throw new Error('Tried to handle Enter on unrecognised position.');
          }
        }
        break;
      case 8:
      case 461:
      case 413:
      case 'Backspace':
        event.preventDefault();
        this.handleEventSource(event);
        return;
      case 415:
      case 19:
        this.handlePlayPause();
        break;
      case 412:
        this.handleRewind();
        break;
      case 417:
        this.handleFastForward();
        break;
      default:
    }
    this.setState({ showInterface: true });
    clearTimeout((this: any).videoShower);
    this.hideInterface();
  }
  moveLeft() {
    if (this.state.isNavigationSelected) {
      if (this.state.selectedPosition > 0) {
        this.setState({
          selectedPosition: this.state.selectedPosition -1,
        });
      }
    }
  }
  moveRight() {
    if (this.state.isNavigationSelected) {
      if (this.state.selectedPosition < 4) {
        this.setState({
          selectedPosition: this.state.selectedPosition +1,
        });
      }
    }
  }
  handlePlayPause() {
    if (this.state.isVideoPlaying) {
      this.handlePause();
    } else {
      this.handlePlay();
    }
  }
  handlePlay() {
    this.setState({
      isVideoPlaying: true,
    });
    (this: any).player.play();
  }
  handlePause() {
    this.setState({
      isVideoPlaying: false,
    });
    (this: any).player.pause();
  }
  handleRewind() {
    (this: any).player.currentTime((this: any).player.currentTime() - (this: any).moveTime);
  }
  handleFastForward() {
    if ((this: any).player.remainingTime() > 10) {
      (this: any).player.currentTime((this: any).player.currentTime() + (this: any).moveTime);
    }
  }
  handleVideoLoad() {
    const {
      videoID: id,
      isVideoExpanded,
    } = this.props;
    const lagTime = 5;
    const lastTimeProgress: number = getProgressTimeById(id);
    const videoLengthSecs = Math.round((this: any).player.duration());
    const defaultTimeStamp = Math.round(videoLengthSecs / 3);
    const timeProgressSecs = isVideoExpanded ?
      Math.round((videoLengthSecs * (lastTimeProgress / 100)) - lagTime):
      defaultTimeStamp;
    (this: any).player.currentTime(timeProgressSecs);
  }
  handleEndReached() {
    this.setState({
      isVideoPlaying: false,
    });
  }
  handleTimeUpdate() {
    const progress = VideoPlayer.getProgress((this: any).player);
    this.setState({
      timeProgress: Math.round(progress),
    });
  }
  showFormattedTime(getTime: Function) {
    let time = '00:00';
    if ((this: any).player) {
      const roundedTime = Math.round(getTime((this: any).player));
      time = VideoPlayer.renderTime(roundedTime);
    }
    return time;
  }
  hideInterface() {
    if (this.state.isVideoPlaying) {
      (this: any).videoShower = setTimeout(() => {
        this.setState({
          showInterface: false,
          selectedPosition: 2,
          isBackButtonSelected: false,
          isNavigationSelected: true,
        });
      }, 1500);
    }
  }
  render() {
    const videoPlayerInterface = this.props.isVideoExpanded ? (
      <VideoPlayerInterface
        episodeTitle={this.state.videoTitle}
        isVideoPlaying={this.state.isVideoPlaying}
        progress={this.state.timeProgress}
        currentTime={this.showFormattedTime(player => player.currentTime())}
        endOfVideo={this.showFormattedTime(player => player.duration())}
        isBackButtonSelected={this.state.isBackButtonSelected}
        selectedPosition={this.state.selectedPosition}
        isVisible={this.state.showInterface}
      />
    ) : null;
    return (
      <div className="video-player">
        <div data-vjs-player>
          <video
            ref={(node) => { (this: any).videoNode = node; }}
            onLoadedData={this.handleVideoLoad}
            onEnded={this.handleEndReached}
            onTimeUpdate={this.handleTimeUpdate}
            className="video-js vjs-big-play-centered"
          />
          {videoPlayerInterface}
        </div>
      </div>
    );
  }
}

export default VideoPlayer;
