// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Image from './image';

const dummyProps = {
  src: 'kobzol',
  alt: 'alt',
  className: 'xxx',
};

test('Image renders with placeholder', () => {
  const component = renderer.create(<Image imageProps={dummyProps} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Image renders without placeholder', () => {
  const component = renderer.create(<Image imageProps={dummyProps} showPlaceholder={false} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Image properly handles image loading', () => {
  const imageWrapper = mount(<Image imageProps={dummyProps} />);
  expect(imageWrapper.state().isImageLoaded).toBe(false);
  (imageWrapper.instance(): Object).handleImageLoaded();
  expect(imageWrapper.state().isImageLoaded).toBe(true);
});
