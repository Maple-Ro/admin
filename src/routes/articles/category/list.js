/**
 * Created by stanley on 2017/6/16 0016.
 */
import {Tag, Button} from 'antd';
import React from "react";
import PropTypes from 'prop-types'

const preColor = ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple', 'yellow'];
//预设color样式，可相应的自定义
//.ant-tag-orange {
// color: #f56a00;
// background: #fde3cf;
// border-color: #fde3cf;
// }
function list({data, onEditItem, onAdd}) {
  const cateLists = data.map((cate, index) => {
    let color = preColor[Math.floor(Math.random() * preColor.length)];
    // let color = '#',
    // red = Math.floor(Math.random()*256).toString(16),
    // green = Math.floor(Math.random()*256).toString(16),
    // blue = Math.floor(Math.random()*256).toString(16);
    // color += red+green+blue
    return <Button
      key={index}
      onClick={()=>onEditItem(cate)}
      type="primary"
      style={
        {
        padding:5,
        margin:5
        }
      }
    >{cate.name}</Button>;
  });

  const bg = {
    width: 500,
    background: 'rgb(187, 234, 234)',
    padding: 20,
    borderRadius: 6
  };

  return (<div style={bg}>
    {cateLists}
    <Button type="dashed" ghost onClick={()=>onAdd()} icon="plus"/>
  </div>)
}
list.propTypes = {
  data: PropTypes.array,
  onEditItem: PropTypes.func,
  onAdd: PropTypes.func
};

export default list;
