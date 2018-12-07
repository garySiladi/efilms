// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import SidePanelCard from './side-panel-card';

const minimumCardDataProps = {href: 'xxx', icon: 'yyy', title: 'zzz'};

test('SidePanelCard renders with minimum props', () => {
  const component = renderer.create(<SidePanelCard {...minimumCardDataProps} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('SidePanelCard renders with isActive and onClick', () => {
  const component = renderer.create(
    <SidePanelCard
      {...minimumCardDataProps}
      isActive
      onClick={() => {}}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
