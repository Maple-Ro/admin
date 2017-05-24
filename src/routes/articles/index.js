import React, {PropTypes} from 'react';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import articleList from './articlesList';
import articleFilter from './articleFilter';
import New from './new';

function Article({ location, dispatch, articles, loading}) {
  console.log('articles',articles)
  const { list, pagination} = articles;
  const { field, keyword } = location.query;

  //表单数据处理
  const articleListProps = {
    dataSource: list,
    loading,
    pagination,
    location,
    onPageChange (page) {
      const { query, pathname } = location
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
        type: 'articles/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }
  //表单搜索
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
      dispatch({
        type: 'article/new',
        payload: {
          modalType: 'create',
        },
      })
    }
  }

  return (
    <div className="content-inner">
      <articleFilter {...articleFilterProps} />
      <articleList {...articleListProps} />
    </div>
  )
}
Article.PropTypes={
  articles: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool
}

export default connect(({articles, loading})=>({articles, loading:loading.models.articles}))(Article);
