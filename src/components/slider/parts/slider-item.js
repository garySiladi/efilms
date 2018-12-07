// @flow
import React from 'react';
import classnames from 'classnames';
import Image from '../../image/image';
import './slider-item.css';

type SliderItemType = {
  title: string,
  subtitle?: string,
  thumbnail?: ?Object,
  type: string,
  episode_count?: number,
  className: string,
  isSelected: boolean,
  isFullWidth?: boolean,
  isEpisodeExpanded: boolean,
};

class SliderItem extends React.Component {
  static isItemSeries(type) {
    return type === 'Series';
  }
  static setTeaserImage(thumbnail, isFullWidth) {
    if (isFullWidth) {
      return thumbnail && thumbnail.full_width ? thumbnail.full_width.url : '';
    }
    return thumbnail && thumbnail.thumb ? thumbnail.thumb.url : '';
  }
  static defaultProps = {
    subtitle: '',
    thumbnail: null,
    episode_count: 0,
    isFullWidth: false,
  };
  props: SliderItemType;
  render() {
    const {
      title,
      subtitle,
      thumbnail,
      type,
      episode_count: episodeCount,
      className,
      isSelected,
      isFullWidth,
      isEpisodeExpanded,
    } = this.props;
    const isItemSeries = SliderItem.isItemSeries(type);
    return (
      <div
        className={classnames({
          [`${className}`]: true,
          [`${className}--selected`]: isSelected && !isEpisodeExpanded,
          [`${className}--full-width`]: isFullWidth,
          [`${className}--series-item`]: isItemSeries,
        })}
      >
        <Image
          imageProps={{
            src: SliderItem.setTeaserImage(thumbnail, isFullWidth),
            alt: title,
            className: 'slider-item__image',
          }}
        />
        {isFullWidth ? null : (
          <div className="slider-item__container">
            <div className="slider-item__title">{title}</div>
            <div className="slider-item__subtitle">
              {isItemSeries ? `${String(episodeCount)} episodes` : subtitle}
            </div>
          </div>
        )}
        <div
          className={classnames({
            [`${className}__chevron`]: true,
            [`${className}__chevron--visible`]: isSelected && isEpisodeExpanded,
            [`${className}__chevron--small`]: isFullWidth,
          })}
        />
      </div>
    );
  }
}

export default SliderItem;
