import axios from 'axios';
import getAuthHeader from './getAuthHeader';
import getHost from './getHost';

export default async () => {
  if (window.localStorage.getItem('token')) {
    const authed = await axios.get(getHost() + '/api/auth/me', {
      headers: getAuthHeader(),
    });

    return authed.data.response;
  }
};
