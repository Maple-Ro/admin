import axios from 'axios';
import{apiURL, imgURL} from '../utils/config';
import {get, post} from '../utils'

/**
 * 接受当前页和每页显示数量两个参数组成的参数组
 * @param params
 * @returns {Promise.<*>}
 */
export async function query(params) {
  return get('/api/article/lists', {
    data: params
  })
}

export async function create(params) {
  return post('/api/article/create', {
    data: params
  })
}

export async function remove(params) {
  return post('/api/article/del', {
    data: params
  })
}

export async function down(params) {
  return post('/api/article/down', {
    data: params
  })
}

export async function up(params) {
  return post('/api/article/up', {
    data: params
  })
}

export async function update(params) {
  return post('/api/article/edit', {
    data: params
  })
}

export async function uploadCallback(file) {
  const data = new FormData();
  data.append('file', file);
  return axios.post(apiURL + '/api/article/upload', data)
    .then(response => {
      return {
        data: {
          link: imgURL + response.data.data.path
        }
      }
    });
}

export async function catelist() {
  return get('/api/category/list')
}

export async function new_cate(params) {
  return post('/api/category/new', {
    data: params
  })
}

export async function edit_cate(params) {
  return post('/api/category/edit', {
    data: params
  })
}
