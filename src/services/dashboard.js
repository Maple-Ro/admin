import { get } from '../utils'

export async function info () {
  return get('/api/info',{})
}
