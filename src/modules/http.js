import axios from 'axios';

export default class Http {
  request(method, url, data, params) {
    return axios({ method, url, data, params });
  }
}