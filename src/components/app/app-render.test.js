// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';
import * as API from '../../api/fetch';

jest.mock('../side-panel/side-panel', () =>
  jest.fn(() => <div>Side Panel</div>),
);

jest.mock('../home-container/home-container', () =>
  jest.fn(() => <div>Home Container</div>),
);

const mockedLocationData = {
  query: {},
};

// $FlowFixMe
API.getRoot = jest.fn()
.mockReturnValue(
  new Promise((resolve) => {
    resolve({ shelves: [] });
  }),
);

describe('App: ', () => {
  test('renders correctly', () => {
    const tree : string = renderer.create(<App params={{}} location={mockedLocationData} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
