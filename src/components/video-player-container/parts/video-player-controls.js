// @flow
import React from 'react';
import classnames from 'classnames';
import FontAwesome from 'react-fontawesome';
import './video-player-controls.css';

export type VideoPlayerInterfaceProps = {
  episodeTitle: string,
  isVideoPlaying: boolean,
  progress: number,
  currentTime: string,
  endOfVideo: string,
  isBackButtonSelected: boolean,
  selectedPosition: number,
  isVisible: boolean,
};

const VideoPlayerInterface = ({
  episodeTitle,
  isVideoPlaying,
  progress,
  isBackButtonSelected,
  selectedPosition,
  currentTime,
  endOfVideo,
  isVisible,
}: VideoPlayerInterfaceProps) => {
  const progressBarStyle = {
    width: `${progress}%`,
  };
  const createNavigationControlClassname = position => classnames({
    'player-interface__navigation-control': true,
    selected: selectedPosition === position,
  });
  return (
    <div className={classnames('player-interface', { 'player-interface--hidden': !isVisible })}>
      <div className="player-interface__top">
        <button
          className={classnames(
            'player-interface__back-button',
            { selected: isBackButtonSelected },
          )}
        >
          <FontAwesome
            name="chevron-left"
            className={classnames(
              'player-interface__navigation-icons',
              'player-interface__navigation-icons--back',
            )}
          />
        </button>
        <span className="player-interface__episode-title">
          {episodeTitle}
        </span>
      </div>
      <div className="player-interface__bottom">
        <div className="player-interface__progress-time">
          <div className="player-interface__progress-time--current">{currentTime}</div>
          <div className="player-interface__progress-time--final">{endOfVideo}</div>
        </div>
        <div className="player-interface__progress-bar-container" >
          <div className="player-interface__progress-bar" style={progressBarStyle} />
        </div>
        <div className="player-interface__navigation-wrapper">
          <button
            className={createNavigationControlClassname(0)}
          >
            <FontAwesome
              name="step-backward"
              className={classnames(
                'player-interface__navigation-icons',
                'player-interface__navigation-icons--step-backward',
              )}
              id="1"
            />
          </button>
          <button
            className={createNavigationControlClassname(1)}
          >
            <FontAwesome
              name="backward"
              className={classnames(
                'player-interface__navigation-icons',
                'player-interface__navigation-icons--rewind',
              )}
              id="2"
            />
          </button>
          <button
            className={createNavigationControlClassname(2)}
          >
            <FontAwesome
              name={isVideoPlaying ? 'pause' : 'play'}
              className={classnames(
                'player-interface__navigation-icons',
                {
                  'player-interface__navigation-icons--play': !isVideoPlaying,
                  'player-interface__navigation-icons--pause': isVideoPlaying,
                },
              )}
              id="3"
            />
          </button>
          <button
            className={createNavigationControlClassname(3)}
          >
            <FontAwesome
              name="forward"
              className={classnames(
                'player-interface__navigation-icons',
                'player-interface__navigation-icons--forward',
              )}
              id="4"
            />
          </button>
          <button
            className={createNavigationControlClassname(4)}
          >
            <FontAwesome
              name="step-forward"
              className={classnames(
                'player-interface__navigation-icons',
                'player-interface__navigation-icons--step-forward',
              )}
              id="5"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
export default VideoPlayerInterface;
