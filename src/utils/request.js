import axios from "axios";
import qs from "qs";
import lodash from "lodash";
import {apiURL} from "./config";
const fetch = (options) => {
  let {
    method = 'get',
    data,
    fetchType,
    url,
  } = options;
  url = apiURL + url;
  // if (fetchType === 'JSONP') {
  //   return new Promise((resolve, reject) => {
  //     jsonp(url, {
  //       param: `${qs.stringify(data)}&callback`,
  //       name: `jsonp_${new Date().getTime()}`,
  //       timeout: 4000,
  //     }, (error, result) => {
  //       if (error) {
  //         reject(error)
  //       }
  //       resolve({ statusText: 'OK', status: 200, data: result })
  //     })
  //   })
  // }

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(`${url}${!lodash.isEmpty(data) ? `?${qs.stringify(data)}` : ''}`);
    case 'delete':
      return axios.delete(url, {data});
    case 'head':
      return axios.head(url, data);
    case 'post':
      return axios.post(url, data);
    case 'put':
      return axios.put(url, data);
    case 'patch':
      return axios.patch(url, data);
    default:
      return axios(options)
  }
}

export default function request(options) {
  if (options.url && options.url.indexOf('//') > -1) {
    const origin = `${options.url.split('//')[0]}//${options.url.split('//')[1].split('/')[0]}`
    if (window.location.origin !== origin) {
      options.fetchType = 'CORS'
    }
  }

  return fetch(options).then((response) => {
    const {statusText, status} = response;
    console.log('response:');
    console.log(response);
    let data = response.data;
    console.log('data:');
    console.log(data);
    return {
      code: 0,
      status,
      message: statusText,
      ...data,
    }
  }).catch((error) => {
    const {
      response = {
        statusText: error.message || 'Network Error',
      },
    } = error
    return {code: 1, message: response.statusText}
  })
}
