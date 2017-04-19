import { get } from '../utils'

export async function myCity () {
  return get('http://www.zuimeitianqi.com/zuimei/myCity',{})
}

export async function queryWeather () {
  return get('http://www.zuimeitianqi.com/zuimei/queryWeather',{})
}

export async function query () {
  return get('/api/dashboard',{})
}
