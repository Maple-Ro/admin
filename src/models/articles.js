import {create,remove,update,query} from '../services/articles';
import {parse} from 'qs';

export default {
  namespace:'article',
  state : {
    list:[],
    bordered: false,
    loading: false,
    size: 'default',
    expandedRowRender,
    title,
    showHeader:true,
    footer:{},
    isMotion:true,
    rowSelection: {},
    scroll: {},
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  },
  subscriptions:{

  },
  effects:{

  },
  reducers:{

  }
}
