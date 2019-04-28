import axios from 'axios';
import getAuthHeader from './getAuthHeader';
import { Person } from '../routes/PersonForm';
import getHost from './getHost';

const makeFileString = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    console.log(file);
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve({ imageStr: reader.result });
    };
  });
};

export default async ({ name, bio, slug, image, requests }: Person) => {
  console.log(image);
  const imageStr = await makeFileString(image);
  console.log(imageStr);
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
