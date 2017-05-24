import {Modal, Table} from "antd";
import React, {PropTypes} from "react";
import styles from "./style.less";

const confirm = Modal.confirm
function List({dataSource, loading, pagination, onPageChange, onDeletedItem, onEditItem}) {
  function deleteHandler(id) {
    confirm({
      title: '确定要删除这条记录么?',
      onOk(){
        onDeletedItem(id);
      }
    })
  }

  const columns = [{
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    width: 150,
    render: text => <a href="#">{text}</a>,
  }, {
    title: 'Summary',
    dataIndex: 'content',
    key: 'summary',
    width: 400,
  }, {
    title: 'Create_at',
    dataIndex: 'create_at',
    key: 'create_at',
    width: 150
  },
    {
      title: 'Update_at',
      dataIndex: 'update_at',
      key: 'update_at',
      width: 150
    }, {
      title: 'Action',
      key: 'action',
      width: 360,
      render: (text, record) => (
        <span>
      <span className="ant-divider"><a href="#" onClick={deleteHandler(record.id)}>Delete</a></span>
      <span className="ant-divider"><a href="#" onClick={onEditItem(record)}>Edit</a></span>
    </span>
      ),
    }];
  return (
    <div>
      <Table
        dataSource={dataSource}
        className={styles.table}
        scroll={{x: 1200}}
        columns={columns}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        middle
        rowKey={record => record.id}
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
