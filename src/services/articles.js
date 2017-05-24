import { get, post } from '../utils'

/**
 * 接受当前页和每页显示数量两个参数组成的参数组
 * @param params
 * @returns {Promise.<*>}
 */
export async function query (params) {
  return get('/api/article/lists',{
    data:params
  })
}

export async function create (params) {
  return post('/api/article/create',{
    data: params
  })
}

export async function remove (params) {
  return post('/api/article/del',{
    data: params
  })
}
export async function down (params) {
  return post('/api/article/down',{
    data: params
  })
}

export async function update (params) {
  return post('/api/article/edit',{
    data: params
  })
}
