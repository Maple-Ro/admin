import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import List from './articlesList';
import ArticleFilter from './articleFilter';
import ArticleModal from './articleModal';

function Articles({ location, dispatch, articles, loading}) {
  const { list, pagination, currentItem, modalVisible, modalType} = articles; // articles同对应的model的namespace
  const { field, keyword } = location.query;

  //表单数据处理
  const articleListProps = {
    dataSource: list,
    loading,
    pagination,
    location,
    onPageChange (page) {
      const { query, pathname } = location;
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'articles/remove',
        payload: id,
      })
    },
    onDownItem(id){
      dispatch({
        type:'articles/down',
        payload:id
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'articles/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }
  //表单头部操作区域
  const articleFilterProps = {
    field,
    keyword,
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/articles',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/articles',
      }))
    },
    onAdd () {
      debugger;
      dispatch({
        type: 'article/showModal',
        payload: {
          modalType: 'create',
        },
      })
    }
  };
  //表单model
  const articleModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: `articles/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'articles/hideModal',
      })
    },
  };
  const ArticleModalGen = () => <ArticleModal {...articleModalProps} />;
  return (
    <div className="content-inner">
      <ArticleFilter {...articleFilterProps} />
      <List {...articleListProps} />
      <ArticleModalGen />
    </div>
  )
}
Articles.PropTypes={
  articles: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool
}

export default connect(({articles, loading})=>({articles, loading:loading.models.articles}))(Articles);
