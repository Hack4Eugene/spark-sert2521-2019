import axios from 'axios';
import getHost from './getHost';

export default async () => axios(getHost() + '/api/people');
