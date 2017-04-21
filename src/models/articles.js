import {create,remove,update,query} from '../services/articles';
import {parse} from 'qs';
import {message} from 'antd';
export default {
  namespace:'article',
  state : {
    list:[],
    total:0,
    page:1,
    bordered: false,
    loading: false,
    size: 'default',
    expandedRowRender,
    title,
    showHeader:true,
    footer:{},
    isMotion: localStorage.getItem('antdAdminUserIsMotion') === 'true',
  },
  subscriptions:{
    setup({dispatch, history}){
      return history.listen(({pathname,query})=>{
        if(pathname==='/article/list'){
          dispatch({
            type:'fetch',payload:query
          });
        }
      });
    },
  },
  effects:{
  *fetch({payload},{call,put}){
    const {data} = yield call(query,payload);
    yield put({
      type:'save',
      payload:{
        list:data.data,
        total:parseInt(data.total, 10),
        page:parseInt(data.page, 10)
      }
    })
  },
    *reload({action},{put,select}){
    const page = yield select(state=>state.article.page);
    yield put({type:'fetch', payload:{page}});
    },
    *create({payload:values},{call,put}){
    const {success} = yield call(create, values);
    if(success){
      message.success('save success', 3);
      yield put({
        type:'reload'})
    }
  }
  },
  reducers:{
    save(state, action){
      return {
        ...state,
        ...action.payload
      }
    }
  }
}
