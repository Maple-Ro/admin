import {Modal, Table} from "antd";
import React from "react";
import PropTypes from 'prop-types'
import styles from "./style.less";
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody';

const confirm = Modal.confirm;
function List({dataSource, loading, pagination, onPageChange, onDeleteItem, onEditItem, onDownItem, onUpItem, location}) {
  const handleMenuDeleteClick = (id) => {
    confirm({
      title: 'Really delete this paper?',
      onOk(){
        onDeleteItem(id)
      }
    })
  }
  const handleMenuDownClick = (id) => {
    confirm({
      title: 'Really down this paper?',
      onOk(){
        onDownItem(id)
      }
    })
  };
  const handleMenuUpClick = (id) => {
    confirm({
      title: 'Really up this paper?',
      onOk(){
        onUpItem(id)
      }
    })
  };

  const columns = [
    {
      title: 'State',
      key: 'is_draft',
      'width': 100,
      render: (record) => record.is_draft === 1 ? <a href="#" className={styles.paper_draft}>&nbsp;</a> :
        <a href="#" className={styles.paper_formal}>&nbsp;</a>
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 150,
      render: text => <a href="#">{text}</a>,
    }, {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      width: 400,
      render: text => {
        let contents = JSON.parse(text)
        let i =0, content='';
        for(i in contents.blocks){
          content += contents.blocks[i].text
        }
        content = content.substring(0, 100)
        return <a href="#">{content}</a>
      }
    }, {
      title: 'Create_at',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 75
    },
    {
      title: 'Update_at',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 75
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: (text, record) => (
        <span>
      <span className={styles.ant_divider}><a href="#" onClick={() => {
        handleMenuDeleteClick(record._id)
      }}>Delete</a></span>
      <span className={styles.ant_divider}><a href="#" onClick={() => {
        onEditItem(record)
      }}>Edit</a></span>
      <span className={styles.ant_divider}>{record.is_draft === 1 ? <a href="#" onClick={() => {
        handleMenuUpClick(record._id)
      }}>Up</a> :
        <a href="#" onClick={() => {
          handleMenuDownClick(record._id)
        }}>Down</a>}</span>
    </span>
      ),
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
