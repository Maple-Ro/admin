import { info, qWeather, qCard, qOs, qBrowser } from '../services/dashboard';
import { parse } from 'qs';
import {log} from '../utils';
// zuimei 摘自 http://www.zuimeitianqi.com/res/js/index.js

export default {
  namespace: 'dashboard',
  state: {
    weather: {
      city: 'N/A',
      temperature: 'N/A',
      weatherName: 'N/A',
      icon: 'N/A',
      dateTime: new Date().format('MM-dd'),
    },
    quote: {
      avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
    },
    numbers: [],
    browser: [],
    cpu: {},
    user: {
      avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
    },
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({type:'weather'});
      dispatch({ type: 'card' });
      dispatch({ type: 'os' });
      dispatch({ type: 'browser' });
    },
  },
  effects: {
    *weather({payload}, {call,put}){
      const {success, weather} = yield call(qWeather,parse(payload));
      if(success){
        yield put({
          type:'loadWeatherSuccess',
          payload:{
            weather:weather
          }
        })
      }
    },
    *card({payload},{call,put}){
      const {data} = yield call(qCard,parse(payload));
      yield put({type:'cardInfo',payload:{card:data}})
    },
    *os({payload},{call,put}){
      const {info} = yield call(qOs,parse(payload));
      yield put({type:'osInfo',payload:{cpu:info}})
    },
    *browser({payload},{call,put}){
      const {data} = yield call(qBrowser,parse(payload));
      yield put({type:'browserInfo',payload:{browser:data}})
    },
  },
  reducers: {
    loadWeatherSuccess(state, action){
      // log(action.payload);// {weather:object}
      // log(...action.payload);  undefined
      return {
        ...state,
        ...action.payload
      }
    },
    cardInfo(state,action){
      return {
        ...state,
        ...action.payload
      }
    },
    osInfo(state,action){
      log(action.payload);
      return {
        ...state,
        ...action.payload
      }
    },
    browserInfo(state,action){
      return {
        ...state,
        ...action.payload
      }
    },
  },
}
