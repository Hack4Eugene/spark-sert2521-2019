import axios from 'axios';
import getAuthHeader from './getAuthHeader';
import { Person } from '../routes/PersonForm';
import getHost from './getHost';

export default async ({ name, bio, slug, requests }: Person) => {
  await axios
    .post(
      getHost() + '/api/people',
      { name, bio, slug },
      {
        headers: getAuthHeader(),
      }
    )
    .then(response => console.log(response));
  await axios
    .post(getHost() + `/api/people/${slug}/requests`, requests, {
      headers: getAuthHeader(),
    })
    .then(response => console.log(response));
};
