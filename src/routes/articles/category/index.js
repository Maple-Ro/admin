import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'dva';
import List from './list';
import Modal from './modal';

function Category({location, dispatch, articles, loading}) {

  const {currentItem, modalVisible, cateModalType, cateList} = articles;

  //分类面板数据
  const tagListProps = {
    data: cateList,
    location,
    loading,
    onEditItem (item) {
      dispatch({
        type: 'articles/showModal',
        payload: {
          cateModalType: 'edit',
          currentItem: item
        },
      })
    },
    onAdd () {
      dispatch({
        type: 'articles/showModal',
        payload: {
          cateModalType: 'new',
        },
      })
    }
  }


  //分类modal属性
  const cateModalProps = {
    item: cateModalType === 'new' ? {} : currentItem,
    type: cateModalType,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: `articles/${cateModalType + '_cate'}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'articles/hideModal',
      })
    },
  };

  return (
    <div>
      <List {...tagListProps} />
      <Modal {...cateModalProps}/>
    </div>
  )
}
Category.PropTypes = {
  articles: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool
}

export default connect(({articles, loading}) => ({articles, loading: loading.models.articles}))(Category);
