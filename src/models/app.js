import { login,queryWeather, logout } from '../services/app'
import { parse } from 'qs'

export default {
  namespace: 'app',
  state: {
    login: false,
    user: {
      name: 'Endless',
    },
    // weather: {
    //   city: 'Shanghai',
    //   temperature: '5',
    //   name: 'sun',
    //   icon: 'http://www.zuimeitianqi.com/res/icon/0_big.png',
    //   dateTime: new Date().format('MM-dd hh:mm'),
    // },
    loginButtonLoading: false,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: []
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'queryWeather' }); //获取天气信息等
      window.onresize = () => {
        dispatch({ type: 'changeNavbar' })
      }
    },
  },
  effects: {
    *login ({payload,}, { call, put }) {
      yield put({ type: 'showLoginButtonLoading' })
      const { success, username } = yield call(login, parse(payload))
      if (success) {
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              name: username,
            },
          } })
      } else {
        yield put({type: 'loginFail',})
      }
    },
    *queryWeather ({payload,}, { call, put }) {
      const { success, data } = yield call(queryWeather, parse(payload))
      if (success) {
        yield put({
          type: 'loadWeatherSuccess',
          payload: {data},
        })
      }
    },
    *logout ({payload,}, { call, put }) {
      const data = yield call(logout, parse(payload))
      if (data.success) {
        yield put({
          type: 'logoutSuccess',
        })
      }
    },
    *switchSider ({payload,}, { put }) {
      yield put({
        type: 'handleSwitchSider',
      })
    },
    *changeTheme ({payload,}, { put }) {
      yield put({
        type: 'handleChangeTheme',
      })
    },
    *changeNavbar ({payload,}, { put }) {
      if (document.body.clientWidth < 769) {
        yield put({ type: 'showNavbar' })
      } else {
        yield put({ type: 'hideNavbar' })
      }
    },
    *switchMenuPopver ({payload,}, { put }) {
      yield put({
        type: 'handleSwitchMenuPopver',
      })
    },
  },
  reducers: {
    loginSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
        login: true,
        loginButtonLoading: false,
      }
    },
    logoutSuccess (state) {
      return {
        ...state,
        login: false,
      }
    },
    loadWeatherSuccess(state){
      return {
        ...state
      }
    },
    loginFail (state) {
      return {
        ...state,
        login: false,
        loginButtonLoading: false,
      }
    },
    showLoginButtonLoading (state) {
      return {
        ...state,
        loginButtonLoading: true,
      }
    },
    handleSwitchSider (state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },
    handleChangeTheme (state) {
      localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },
    showNavbar (state) {
      return {
        ...state,
        isNavbar: true,
      }
    },
    hideNavbar (state) {
      return {
        ...state,
        isNavbar: false,
      }
    },
    handleSwitchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },
    handleNavOpenKeys (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
