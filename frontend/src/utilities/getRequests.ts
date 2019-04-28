import getHost from './getHost';
import axios from 'axios';

export default () => axios(getHost() + '/api/requests');
