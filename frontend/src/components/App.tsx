import React, { createElement } from 'react';
import { Route, Switch } from 'react-router';
import { CssBaseline } from '@material-ui/core';
import Main from '../routes/Main';

const App = () => (
  <>
    <CssBaseline />
    <Switch>
      <Route path="/" component={Main} />
    </Switch>
  </>
);

export default App;
