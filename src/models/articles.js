import {create,remove,update,query} from '../services/articles';
import {parse} from 'qs';
import {message} from 'antd';
export default {
  namespace:'article',
  state : {
    list:[],//数据源
    total:0,//总条数
    page:1,//当前页面
    bordered: false,//是否有边界
    loading: false,//是否有loading效果
    size: 'middle',//列表尺寸
    expandedRowRender,//是否支持拓展列
    title,//表格标题
    showHeader:true,//是否显示表格抬头
    footer:{},//是否有底部
    isMotion: localStorage.getItem('antdAdminUserIsMotion') === 'true',//是否有动画
  },
  subscriptions:{
    setup({dispatch, history}){
      return history.listen(({pathname,query})=>{
        if(pathname==='/article/lists'){
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
