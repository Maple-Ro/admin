import { get } from '../utils'

export async function info () {
  return get('/api/info',{})
}
export async function queryWeather() {
  return get('/api/weather',{})
}
