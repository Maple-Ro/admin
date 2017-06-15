import {create, remove, update, query, down, up, uploadCallback} from '../services/articles';
import {parse} from 'qs';
import {message} from 'antd';

export default {
  namespace: 'articles',
  state: {
    list: [],//数据源
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    isView:false,
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
      pageSize:null
    },
  },
  subscriptions: {
    setup({dispatch, history}){
      return history.listen((location) => {
        if (location.pathname === '/articles') {
          dispatch({
            type: 'query', payload: location.query
          });
        }
      });
    },
  },
  effects: {
    *query({payload}, {call, put}){
      const {data} = yield call(query, payload);
      if(data){
        yield put({
          type: 'updateState',
          payload: {
            list: data.data,
            pagination: {
              total: parseInt(data.pagination.total, 10),
              current: parseInt(data.pagination.current, 10) || 1,
              pageSize: parseInt(payload.pageSize, 10) || 10,
            }
          }
        })
      }
    },
    *reload({action}, {put, select}){
      const page = yield select(state => state.articles.pagination.current);
      yield put({type: 'query', payload: {page}});
    },
    *create({payload}, {call, put}){
      yield put({type: 'hideModal'})
      const {data} = yield call(create, payload);
      if (data.success) {
        message.success('save success', 1);
        yield put({type: 'reload'})
      }
    },
    *update({payload}, {select, call, put}){
      yield put({type: 'hideModal'})
      const id = yield select(({articles}) => articles.currentItem._id)
      const newArticle = {...payload, id}
      const data = yield call(update, newArticle)
      if (data.data.success) {
        message.success('update success', 1);
        yield put({type: 'reload'})
      }
    },
    *remove ({payload}, {call, put}) {
      const data = yield call(remove, {id: payload})
      if (data.data.success) {
        yield put({type: 'reload'})
      }
    },
    *down ({payload}, {call, put}) {
      const data = yield call(down, {id: payload})
      if (data.data.success) {
        yield put({type: 'reload'})
      }
    },
    *up ({payload}, {call, put}) {
      const data = yield call(up, {id: payload})
      if (data.data.success) {
        yield put({type: 'reload'})
      }
    }
  },
  reducers: {
    updateState(state, action){
      const {list, pagination} = action.payload;
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination
        }
      }
    },
    showModal (state, action) {
      return {...state, ...action.payload, modalVisible: true}
    },
    hideModal (state) {
      return {...state, modalVisible: false}
    },
  }
}
