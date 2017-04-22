import { Table, Icon, Switch, Radio, Checkbox } from 'antd';

const columns = [{
  title: 'Title',
  dataIndex: 'title',
  key: 'title',
  width: 150,
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Summary',
  dataIndex: 'summary',
  key: 'summary',
  width: 400,
}, {
  title: 'Create_at',
  dataIndex: 'create_at',
  key: 'create_at',
  width:150
},
  {
  title: 'Update_at',
  dataIndex: 'update_at',
  key: 'update_at',
  width:150
}, {
  title: 'Action',
  key: 'action',
  width: 360,
  render: (text, record) => (
    <span>
      <a href="#">Show</a>
      <span className="ant-divider" />
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <a href="#">Edit</a>
    </span>
  ),
}];



function Article() {

}

// export default connect(()=>(''))(Article);
