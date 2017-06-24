import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'dva';
import {Tag} from 'antd'
function Tags({location, dispatch, articles, loading}) {

  const {tagsList} = articles;
  let preColor = ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple', 'yellow'];
  const tagsListTags = tagsList.map(d=>{
    const color = preColor[Math.floor(Math.random() * preColor.length)];
    return <Tag key={d._id} color={color} style={{marginBottom:3}}>#{d.name}</Tag>
  })

  return (
    <div style={{
      width: 500,
      background: 'rgb(187, 234, 234)',
      padding: 20,
      borderRadius: 6
    }}>{tagsListTags}</div>
  )
}
Tags.PropTypes = {
  articles: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool
}

export default connect(({articles, loading}) => ({articles, loading: loading.models.articles}))(Tags);
