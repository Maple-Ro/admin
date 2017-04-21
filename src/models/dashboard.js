import { info,queryWeather } from '../services/dashboard';
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
    sales: [],
    quote: {
      avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
    },
    numbers: [],
    recentSales: [],
    comments: [],
    completed: [],
    browser: [],
    cpu: {},
    user: {
      avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
    },
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({type:'queryWeather'});
      // dispatch({ type: 'info' });
    },
  },
  effects: {
    *queryWeather({payload}, {call,put}){
      const {success, weather} = yield call(queryWeather,parse(payload));
      if(success){
        yield put({
          type:'loadWeatherSuccess',
          payload:{
            weather:weather
          }
        })
      }
    }
  },
  reducers: {
    loadWeatherSuccess(state, action){
      // log(action.payload); {weather:object}
      // log(...action.payload);  undefined
      return {
        ...state,
        ...action.payload
      }
    }
  },
}
