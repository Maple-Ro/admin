import { get } from '../utils'

export async function info () {
  return get('/api/info')
}
export async function qWeather() {
  return get('/api/weather')
}

export async function qOs() {
  return get('/api/os')
}

export async function qCard() {
  return get('/api/card')
}

export async function qBrowser() {
  return get('/api/browser')
}

export async function qChart() {
  return get('/api/chart')
}
