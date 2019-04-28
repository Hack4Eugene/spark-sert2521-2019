import axios from 'axios';
import getAuthHeader from './getAuthHeader';
import { Person } from '../routes/PersonForm';

export default async ({ name, bio, slug, requests }: Person) => {
  await axios
    .post(
      'http://localhost:8080/api/people',
      { name, bio, slug },
      {
        headers: getAuthHeader(),
      }
    )
    .then(response => console.log(response));
  await axios
    .post(`http://localhost:8080/api/people/${slug}/requests`, requests, {
      headers: getAuthHeader(),
    })
    .then(response => console.log(response));
};
