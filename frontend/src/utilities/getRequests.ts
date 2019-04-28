import axios from 'axios';
import getHost from './getHost';

export default () => axios(getHost() + '/api/requests');
