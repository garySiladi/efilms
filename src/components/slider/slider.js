// @flow
import React from 'react';
import classnames from 'classnames';
import SliderItem from './parts/slider-item';
import SliderStructure from '../../structures/root';
import './slider.css';

class Slider extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static getHorizontalOffset(selectedEpisode, data) {
    const sliderMarginWidth = 115;
    const sliderItemWidth = 320;
    const homePageWidth = window.innerWidth - sliderMarginWidth;
    const viewportHorizontalSlotNumber = Math.trunc(homePageWidth / sliderItemWidth);
    const itemsToTheRightFromSelected = data.length - selectedEpisode;
    const areMoreEpisodesThanSlots = data.length > viewportHorizontalSlotNumber;
    const itemsBeforeSelectedEpisode =
      areMoreEpisodesThanSlots ? data.length - viewportHorizontalSlotNumber : 0;
    return (viewportHorizontalSlotNumber > itemsToTheRightFromSelected ?
      itemsBeforeSelectedEpisode : selectedEpisode) * (sliderItemWidth * -1);
  }
  static defaultProps = {
    data: [],
    className: 'slider',
    sliderTitle: 'Slider Title',
    isFullWidth: false,
    selectedEpisode: 1,
    resetOnUnselect: true,
  };
  props: SliderStructure
  render() {
    const {
      isSelected,
      isAfterSelected,
      isEpisodeExpanded,
      className,
      sliderTitle,
      selectedEpisode,
      data: episodes,
      resetOnUnselect,
    } = this.props;
    const sliderClassName = classnames(
      { [`${className}`]: true },
      { [`${className}--selected`]: isSelected },
      { [`${className}--after-expanded`]: isAfterSelected && isEpisodeExpanded },
    );
    const calcOffset = isSelected || !resetOnUnselect ?
      Slider.getHorizontalOffset(selectedEpisode, episodes) : 0;
    return (
      <div className={sliderClassName} >
        <div className="slider-title">{sliderTitle}</div>
        <div
          className="slider-items"
          style={{ transform: `translate(${calcOffset}px, 0px)` }}
        >
          {this.props.data.map((item, index) =>
            <SliderItem
              {...item}
              key={item.title}
              className="slider-item"
              isSelectedSeries={isSelected}
              isSelected={isSelected && index === selectedEpisode}
              isFullWidth={this.props.isFullWidth}
              isEpisodeExpanded={isEpisodeExpanded}
            />,
          )}
        </div>
      </div>
    );
  }
}

export default Slider;
