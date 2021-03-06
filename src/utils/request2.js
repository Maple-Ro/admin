// import axios from 'axios';
import {message} from 'antd';
import{apiURL} from './config';
import 'whatwg-fetch'
//message 全局配置
message.config({
  top: 50
});

// axios.defaults.baseURL = apiURL;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
// //axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('Authorization')
//
// const fetch = (url, options) => {
//   const { method = 'get', data } = options
//   switch (method.toLowerCase()) {
//     case 'get':
//       return axios.get(url, { params: data })
//     case 'delete':
//       return axios.delete(url, { data })
//     case 'head':
//       return axios.head(url, data)
//     case 'post':
//       if(data instanceof FormData) return axios.post(url, data);
//       return axios.post(url, stringify(data))
//     case 'put':
//       return axios.put(url, stringify(data))
//     case 'patch':
//       return axios.patch(url, data)
//     default:
//       return axios(options)
//   }
// };

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  }
}

function handelData(res) {
  const data = res.data
  if(data.status !== 200) {
    message.error(data.msg)
  }
  return data;
}

function handleError(error) {
  const data = error.response.data
  if(data.errors) {
    message.error(`${data.message}：${data.errors}`, 5)
  } else if(data.error) {
    message.error(`${data.error}：${data.error_description}`, 5)
  } else {
    message.error('unknown error！', 5)
  }
  return { success: false }
}


export default function request(url, options) {
  return fetch(apiURL+url,{...options, headers:{
    'X-Authorization': localStorage.getItem('token'),
    'Content-type': 'application/json; charset=UTF-8'
  }})
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return Promise.resolve(res)
      }
    }).then(res => {
      return res.json()
    }).then(data => {
      return data
    }).catch(err => {
      console.log(err)
      message.error(err, 2)
    })
}

export function get(url, options=null) {
  return request(url, {
    ...options,
    method: 'GET'
  })
}

export function post(url, options=null) {
  const {data} = options;
  return request(url, {
    body: JSON.stringify(data), method: 'POST'})
}

export function put(url, options) {
  return request(url, {...options, method: 'put'})
}

export function deleted(url, options) {
  return request(url, {...options, method: 'deleted'})
}
