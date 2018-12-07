// @flow
import React from 'react';
import { browserHistory } from 'react-router';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import SidePanel from './side-panel';

const dummyUser = { id: 1, name: 'xxx', imgUrl: 'yyy' };

jest.mock('./parts/side-panel-card', () =>
  jest.fn(() => <div>Side Panel Card</div>),
);

test('SidePanel renders correctly', () => {
  const component = renderer.create(<SidePanel user={dummyUser} isSelected={false} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('SidePanel expands if the prop isSelected is false', () => {
  const sidePanel = shallow(<SidePanel user={dummyUser} isSelected={false} />);
  expect(sidePanel.hasClass('side-panel--expanded')).toEqual(false);
});

test('SidePanel does not expand if the prop isSelected is true', () => {
  const sidePanel = shallow(<SidePanel user={dummyUser} isSelected />);
  expect(sidePanel.hasClass('side-panel--expanded')).toEqual(true);
});

test('mounts/unmounts', () => {
  const sidePanel = shallow(<SidePanel user={dummyUser} isSelected />);
  sidePanel.unmount();
});

test('SidePanel navigation works', () => {
  browserHistory.push = jest.fn();
  const sidePanel = mount(<SidePanel user={dummyUser} isSelected />);
  const sidePanelInstance: Object = sidePanel.instance();
  const fakeEvent = { code: 'ArrowUp' };
  // Start at search card
  expect(sidePanel.state().selectedCard).toEqual(1);
  sidePanelInstance.handleKeyPress(fakeEvent);
  // moves to profile card
  expect(sidePanel.state().selectedCard).toEqual(0);
  sidePanelInstance.handleKeyPress(fakeEvent);
  // doesn't move beyond top
  expect(sidePanel.state().selectedCard).toEqual(0);
  fakeEvent.code = 'ArrowDown';
  sidePanelInstance.handleKeyPress(fakeEvent);
  // properly moves bottom to search card
  expect(sidePanel.state().selectedCard).toEqual(1);
  sidePanelInstance.handleKeyPress(fakeEvent);
  sidePanelInstance.handleKeyPress(fakeEvent);
  // goes to very bottom to favorites card
  expect(sidePanel.state().selectedCard).toEqual(3);
  sidePanelInstance.handleKeyPress(fakeEvent);
  // doesn't go past last card
  expect(sidePanel.state().selectedCard).toEqual(3);
  fakeEvent.code = 'Enter';
  sidePanelInstance.handleKeyPress(fakeEvent);
  // changes browserhistory
  expect(browserHistory.push.mock.calls.length).toEqual(1);
  expect(browserHistory.push.mock.calls[0]).toEqual(['/favorites']);
  fakeEvent.code = 'whatever';
  // handles default
  sidePanelInstance.handleKeyPress(fakeEvent);
  expect(sidePanel.state().selectedCard).toEqual(3);
  expect(browserHistory.push.mock.calls.length).toEqual(1);
  expect(browserHistory.push.mock.calls[0]).toEqual(['/favorites']);
});

test('does not handle events when not selected', () => {
  const sidePanel = mount(<SidePanel user={dummyUser} />);
  const sidePanelInstance: Object = sidePanel.instance();
  const fakeEvent = { code: 'ArrowUp' };
  expect(sidePanel.state().selectedCard).toEqual(1);
  sidePanelInstance.handleKeyPress(fakeEvent);
  // does nothing
  expect(sidePanel.state().selectedCard).toEqual(1);
});

test('Resets selected position to 1 on unselecting', () => {
  const sidePanel = mount(<SidePanel user={dummyUser} />);
  const sidePanelInstance: Object = sidePanel.instance();
  const fakeEvent = { code: 'ArrowUp' };
  expect(sidePanel.state().selectedCard).toEqual(1);
  sidePanel.setProps({ isSelected: true });
  expect(sidePanel.state().selectedCard).toEqual(1);
  sidePanelInstance.handleKeyPress(fakeEvent);
  expect(sidePanel.state().selectedCard).toEqual(0);
  sidePanel.setProps({ isSelected: false });
  expect(sidePanel.state().selectedCard).toEqual(1);
});

test('Test webOS navigation', () => {
  const sidePanel = mount(<SidePanel user={dummyUser} />);
  const sidePanelInstance: Object = sidePanel.instance();
  const fakeEvent = { code: 38 };
  expect(sidePanel.state().selectedCard).toEqual(1);
  sidePanel.setProps({ isSelected: true });
  sidePanelInstance.handleKeyPress(fakeEvent);
  const fakeEvent1 = { which: 40 };
  sidePanelInstance.handleKeyPress(fakeEvent1);
  const fakeEvent2 = { which: 13 };
  sidePanelInstance.handleKeyPress(fakeEvent2);
});
