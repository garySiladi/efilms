![Codeship Crap](https://codeship.com/projects/3f1303d0-ea2d-0134-cc32-3e900762d5ee/status?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/varholak-peter/economist-films/badge.svg?branch=master)](https://coveralls.io/github/varholak-peter/economist-films?branch=master)


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Table of Contents

- [Setup](#setup)
- [Available Scripts](#available-scripts)
  - [yarn start](#yarn-start)
  - [yarn test](#yarn-test)
  - [yarn build](#yarn-build)
  - [yarn flow](#yarn-flow)
  - [yarn lint](#yarn-lint)
- [Running Tests](#running-tests)
  - [Filename Conventions](#filename-conventions)
  - [Command Line Interface](#command-line-interface)
  - [Version Control Integration](#version-control-integration)
  - [Writing Tests](#writing-tests)
  - [Snapshot Testing](#snapshot-testing)
  -[React routing](#setup)
  -[React routing](#example)
  -[React routing](#explanation)
  -[Fetch api](#example)


## Setup

### Instalation

Use `yarn install` to install packages from the `package.json`.

### Flow typed

Use `yarn global add flow-typed` to install flow-typed.
Afterwards use `flow-typed install` to grab definitions for packages defined in `package.json`.

You might need to restart the flow server by running `yarn flow stop` and then `yarn flow` for changes to take effect.

You can read more about flowtype on [flow-typed github page](https://github.com/flowtype/flow-typed).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

#### `yarn test:coverage`

Shows a unit test coverage report.

### `yarn build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `yarn flow`

Launches the flow server which checks for static types.
For more information visit [Flow documentation](https://flowtype.org/docs/getting-started.html).

### `yarn lint`

Lints Javascript and CSS in the `src/` directory and its subdirectories.

#### `yarn lint:js`

Lints `.js` files in `src/` directory and its subdirectories.

#### `yarn lint:css`

Lints `.css` files in `src/` directory and its subdirectories.

## Running Tests

This project uses [Jest](https://facebook.github.io/jest/) as its test runner.

Jest is a Node-based runner. This means that the tests always run in a Node environment and not in a real browser. This lets us enable fast iteration speed and prevent flakiness.

While Jest provides browser globals such as `window` thanks to [jsdom](https://github.com/tmpvar/jsdom), they are only approximations of the real browser behavior. Jest is intended to be used for unit tests of your logic and your components rather than the DOM quirks.

### Filename Conventions

Jest will look for test files with any of the following popular naming conventions:

* Files with `.js` suffix in `__tests__` folders.
* Files with `.test.js` suffix.
* Files with `.spec.js` suffix.

The `.test.js` / `.spec.js` files (or the `__tests__` folders) can be located at any depth under the `src/` top level folder.

### Command Line Interface

When you run `yarn test`, Jest will launch in the watch mode. Every time you save a file, it will re-run the tests, just like `yarn start` recompiles the code.

The watcher includes an interactive command-line interface with the ability to run all tests, or focus on a search pattern. It is designed this way so that you can keep it open and enjoy fast re-runs. You can learn the commands from the “Watch Usage” note that the watcher prints after every run:

![Jest watch mode](http://facebook.github.io/jest/img/blog/15-watch.gif)

### Version Control Integration

By default, when you run `yarn test`, Jest will only run the tests related to files changed since the last commit. This is an optimization designed to make your tests runs fast regardless of how many tests you have. However it assumes that you don’t often commit the code that doesn’t pass the tests.

Jest will always explicitly mention that it only ran tests related to the files changed since the last commit. You can also press `a` in the watch mode to force Jest to run all tests.

Jest will always run all tests on a [continuous integration](#continuous-integration) server or if the project is not inside a Git or Mercurial repository.

### Writing Tests

To create tests, add `it()` (or `test()`) blocks with the name of the test and its code. You may optionally wrap them in `describe()` blocks for logical grouping but this is neither required nor recommended.

Jest provides a built-in `expect()` global function for making assertions. A basic test could look like this:

```js
import sum from './sum';

it('sums numbers', () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(2, 2)).toEqual(4);
});
```

All `expect()` matchers supported by Jest are [extensively documented here](http://facebook.github.io/jest/docs/expect.html).<br>
You can also use [`jest.fn()` and `expect(fn).toBeCalled()`](http://facebook.github.io/jest/docs/expect.html#tohavebeencalled) to create “spies” or mock functions.

#### Snapshot Testing

Snapshot testing is a feature of Jest that automatically generates text snapshots of your components and saves them on the disk so if the UI output changes, you get notified without manually writing any assertions on the component output. [Read more about snapshot testing.](http://facebook.github.io/jest/blog/2016/07/27/jest-14.html)


### Setup

Open index.js and
  1.import Router, Route and browserHistory, we will use browserHistory because we will not use # in url path.
  2.import components which you would like to displayed
  3.wrap components into route element
  4.set url path and component which should be displayed
  5.use Link for set url path for navigation between components defined in step 4.

### Example
// index.js
```js
import { Router, Route, browserHistory } from 'react-router';
import App from "path to component"
import About from "path to component"

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
  */{add the routes here }*/
 <Route path="/about" component={About}/>
    </Router>
), document.getElementById('app'))
```
// components/App.js
```js
import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <Link to="/about">About</Link>
      </div>
    )
  }
})
```
### Explanation

As you could see in example above, firstly in index.js you need to import react router and then components which you would like to to show. You need to wrap those components into Router and then you need to define url path and component which should be displayed. Navigate to component where you would like to have same navigation. Use "Link" for define url path. Link is equivalent to <a></a> element. [Read more about routing](https://github.com/reactjs/react-router-tutorial)


### Example
```js
fetch(url).then(function(response) {
  // handle HTTP response
}, function(error) {
  // handle network error
})
```
For a more comprehensive API reference that this polyfill supports. [Read more about routing](https://github.github.io/fetch/)
