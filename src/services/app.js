import { get,post } from '../utils'

export async function login (params) {
  return post('/api/login',{
    data: params,
  })
}

export async function logout () {
  return get('/api/logout',{})
}

export async function userInfo () {
  return get('/api/userInfo',{})
}
