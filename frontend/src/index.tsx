import React, { createElement } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './state';
import App from './components/App';
import { updatePeople, updateRequests } from './state/actions';
import getPeople from './utilities/getPeople';
import getRequests from './utilities/getRequests';

// Populate the store
import MuiThemeProvider from '@material-ui/core/es/styles/MuiThemeProvider';
import { theme } from './theme';
import 'typeface-eb-garamond';
import 'typeface-rubik';
import getRequests from './utilities/getRequests';

// Populate the store

(async () => {
  const people = await getPeople();
  store.dispatch(updatePeople(...people.data.response));
})();

(async () => {
  const requests = await getRequests();
  store.dispatch(updateRequests(...requests.data.response));
})();

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>
);

render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
