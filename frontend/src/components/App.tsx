import React, { createElement } from 'react';
import { Route, Switch } from "react-router";
import { CssBaseline } from "@material-ui/core";

const App = () => (
    <>
      <CssBaseline />
      <Switch>
        <Route path="/" component={() => null} />
      </Switch>
    </>
);

export default App;
