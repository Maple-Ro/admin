import {login, logout} from '../services/app';
import {parse} from 'qs';

export default {
  namespace: 'app',
  state: {
    login:sessionStorage.getItem('isLogin')==='true'&&localStorage.getItem('token'),
    user: {
      name: 'Endless',
    },
    loginButtonLoading: false,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: []
  },
  subscriptions: {
    setup ({dispatch}) {
      window.onresize = () => {
        dispatch({type: 'changeNavbar'})
      }
    },
  },
  effects: {
    *login ({payload}, {call, put}) {
      yield put({type: 'showLoginButtonLoading'})
      const {success, username, jwt} = yield call(login, parse(payload))
      if (success) {
        sessionStorage.setItem('isLogin', 'true');
        localStorage.setItem('token',jwt);

        yield put({type: 'dashboard/weather'});
        yield put({type: 'dashboard/card'});
        yield put({type: 'dashboard/os'});
        yield put({type: 'dashboard/browser'});
        yield put({type: 'dashboard/charts'});
        yield put({type: 'dashboard/map'});

        yield put({
          type: 'loginSuccess',
          payload: {user: {name: username}}
        })
      } else {
        yield put({type: 'loginFail'})
      }
    },
    *logout ({payload}, {call, put}) {
      const data = yield call(logout, parse(payload))
      if (data.data.success) {
        sessionStorage.removeItem('isLogin')
        localStorage.removeItem('token')
        yield put({type: 'logoutSuccess',})
      }
    },
    *switchSider ({payload}, {put}) {
      yield put({
        type: 'handleSwitchSider',
      })
    },
    *changeTheme ({payload}, {put}) {
      yield put({
        type: 'handleChangeTheme',
      })
    },
    *changeNavbar ({payload}, {put}) {
      if (document.body.clientWidth < 769) {
        yield put({type: 'showNavbar'})
      } else {
        yield put({type: 'hideNavbar'})
      }
    },
    *switchMenuPopver ({payload}, {put}) {
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
