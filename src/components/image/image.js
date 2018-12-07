// @flow
import React from 'react';
import classnames from 'classnames';
import './image.css';

type ImagePropType = {
  imageProps: {
    src: string,
    alt: string,
    className: string,
  },
  showPlaceholder?: boolean,
};

type ImageStateType = {
  isImageLoaded: boolean,
};

export default class Image extends React.Component {
  static defaultProps = {
    showPlaceholder: true,
  };

  constructor(props: ImagePropType) {
    super(props);
    this.state = { isImageLoaded: false };
    (this: any).handleImageLoaded = this.handleImageLoaded.bind(this);
  }

  state: ImageStateType;

  handleImageLoaded() {
    this.setState({ isImageLoaded: true });
  }

  props: ImagePropType;
  render() {
    const {
      showPlaceholder,
      imageProps: {
        alt,
        src,
        ...otherImageProps
      },
    } = this.props;
    return (
      <div className={classnames('image', { 'image--placeholder': showPlaceholder })}>
        <div className={classnames('image__holder', { 'image__holder--loaded': this.state.isImageLoaded })}>
          <img
            onLoad={this.handleImageLoaded}
            src={src}
            alt={alt}
            {...otherImageProps}
          />
        </div>
      </div>
    );
  }
}
