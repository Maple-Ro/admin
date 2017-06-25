import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'dva';
import MyArticleForm from './form'

function Post({location, dispatch, articles, loading}) {
const {query} = location;
  const {currentItem, cateList, tagsList} = articles;
  const item = currentItem || {};
  const props = {
    item,
    cateList,
    tagsList,
    dispatch,
    ...query
  }
  return (
    <div>
      <MyArticleForm {...props}/>
    </div>
  )
}
Post.PropTypes = {
  articles: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool
}

export default connect(({articles, loading}) => ({articles, loading: loading.models.articles}))(Post);
