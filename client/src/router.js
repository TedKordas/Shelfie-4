import React from 'react';
import { Route } from 'react-router-dom';

import Home from './components/Home';
import Shelf from './components/Shelf';
import Bin from './components/Bin';

export default (
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/shelf/:name" component={Shelf} />
    <Route exact path="/shelf/:name/:bin" component={Bin} />
  </div>
);
