import { get } from '../utils'

export async function query () {
  return get('/api/dashboard',{})
}
