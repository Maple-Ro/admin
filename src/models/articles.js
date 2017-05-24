import {create,remove,update,query} from '../services/articles';
import {parse} from 'qs';
import {message} from 'antd';

export default {
  namespace:'articles',
  state : {
    list:[],//数据源
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  },
  subscriptions:{
    setup({dispatch, history}){
      return history.listen(({pathname,query})=>{
        if(pathname==='/articles/list'){
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
    console.log('article-list',data.data);
    yield put({
      type:'updateState',
      payload:{
        list:data.data,
        pagination:{
          total:parseInt(data.total, 10),
          current:parseInt(data.current, 10)
        }
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
    updateState(state, action){
      const {list,pagination} = action.payload;
      return {
        ...state,
        list,
        pagination:{
          ...state.pagination,
          ...pagination
        }
      }
    }
  }
}
