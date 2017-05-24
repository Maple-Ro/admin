import {Modal, Table} from "antd";
import React, {PropTypes} from "react";
import styles from "./style.less";
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import {DropOption} from '../../components'
const confirm = Modal.confirm

function List({dataSource, loading, pagination, onPageChange, onDeleteItem, onEditItem, onDownItem, location}) {
  const handleMenuClick = (id, type) => {
    if (type === 'del') {
      confirm({
        title: '确定要删除这篇文章么?',
        onOk(){
          onDeleteItem(id)
        }
      })
    } else if (type === 'down') {
      confirm({
        title: '确定要下架这篇文章么?',
        onOk(){
          onDownItem(id)
        }
      })
    }
  }

  const columns = [{
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
  }, {
    title: 'Create_at',
    dataIndex: 'created_at',
    key: 'created_at',
    width: 150
  },
    {
      title: 'Update_at',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 150
    }, {
      title: 'Action',
      key: 'action',
      width: 360,
      render: (text, record) => (
        <span>
      <span className={styles.ant_divider}><a href="#" onClick={handleMenuClick(record._id, 'del')}>Delete</a></span>
      <span className={styles.ant_divider}><a href="#" onClick={onEditItem(record)}>Edit</a></span>
      <span className={styles.ant_divider}><a href="#" onClick={handleMenuClick(record._id, 'down')}>Down</a></span>
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
