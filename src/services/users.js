import { get, post } from '../utils'

export async function query () {
  return get('/api/users',{})
}

export async function create (params) {
  return post('/api/users',{
    data: params
  })
}

export async function remove (params) {
  return post('/api/users',{
    data: params
  })
}

export async function update (params) {
  return post('/api/users',{
    data: params
  })
}
