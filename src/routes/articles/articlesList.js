import {Modal, Table, Tag} from "antd";
import React from "react";
import PropTypes from 'prop-types'
import styles from "./style.less";
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody';
import DropOption from '../../components/DropOption'

const confirm = Modal.confirm;
function List({dataSource, loading, pagination, onPageChange, onDeleteItem, onEditItem, onDownItem, onUpItem, location, onViewItem}) {
  const handleMenuClick = (record, e) => {
    switch (e.key){
      case 'edit': onEditItem(record);break;
      case 'del': confirm({
        title:'Really want to del it',onOk(){
        onDeleteItem(record._id);
      }}); break;
      case 'up': onUpItem(record._id);break;
      case 'down': onDownItem(record._id);break;
      default:break;
    }
  }
  const columns = [
    {
      title: 'State',
      key: 'state',
      'width': 100,
      render: (record) => record.state ? <span href="#" className={styles.paper_formal}>&nbsp;</span> :
        <span href="#" className={styles.paper_draft}>&nbsp;</span>
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'Category',
      width: 75
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 150
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      width: 200,
      render: (text, record) => {
        let preColor = ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple', 'yellow'];
       return record.tags.map(d => {
          const color = preColor[Math.floor(Math.random() * preColor.length)];
          return <Tag key={d} color={color} style={{marginBottom:3}}>#{d}</Tag>
        })
      }
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      width: 300,
      render: (text, record) => {
        let contents = JSON.parse(text)
        let i = 0, content = '';
        for (i in contents.blocks) {
          content += contents.blocks[i].text
        }
        content = content.substring(0, 100)
        return <a onClick={() => {
          onViewItem(record)
        }}>{content}</a>
      }
    }, {
      title: 'Create time',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 75
    },
    {
      title: 'Update time',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 75
    },
    {
      title: 'Action',
      key: 'action',
      width: 60,
      render: (text, record) => {
        let options = [{ key: 'edit', name: 'edit' }, { key: 'del', name: 'del' }];
        !record.state ? options.push({key:'up', name:'up'}) : options.push({key:'down', name:'down'});
        return <DropOption menuOptions={options} onMenuClick={e=>handleMenuClick(record, e)}/>
      },
    }];

  const getBodyWrapperProps = {
    page: location.query.page,
    current: pagination.current,
  }

  const getBodyWrapper = body => {
    return <AnimTableBody {...getBodyWrapperProps} body={body}/>
  }

  return (
    <div>
      <Table
        dataSource={dataSource}
        className={classnames({[styles.table]: true})}
        columns={columns}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        size={"default"}
        rowKey={record => record._id}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}
List.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  onPageChange: PropTypes.func,
  pagination: PropTypes.object,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func
};

export default List;
