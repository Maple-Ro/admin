import { get, post } from '../utils'

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

export async function update (params) {
  return post('/api/article/edit',{
    data: params
  })
}
