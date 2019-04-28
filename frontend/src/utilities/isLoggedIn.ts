import axios from 'axios';
import getAuthHeader from './getAuthHeader';

export default async () => {
  if (window.localStorage.getItem('token')) {
    const authed = await axios.get('http://localhost:8080/api/auth/me', {
      headers: getAuthHeader(),
    });
    console.log(authed);
    if (authed.data.success) {
      console.log(authed.data.success);
      return true;
    }
  }
  return false;
};
