// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/app/app';
import SeriesDetail from './components/series-detail/series-container';
import './index.css';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/series/:id" component={SeriesDetail} />
    <Route path="/" component={App} />
    <Route path="/:selectedEpisodeId" component={App} />
  </Router>
), document.getElementById('root'));
