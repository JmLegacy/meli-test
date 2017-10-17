import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';

import App from './components/App';
import Result from './components/Result';
import Product from './components/Product';

const Routes = (props) => (
  <Router>
    <div className='main-cont'>
        <Route exact path="/" component={App} />
        <Route exact path="/items" component={Result} />
        <Route exact path="/items/:id" component={Product} />
    </div>
  </Router>
);

export default Routes;