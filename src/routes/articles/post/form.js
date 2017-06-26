import React from 'react'
import PropTypes from 'prop-types'
import DraftEditor from '../../../components/Editor/MyEditor'
import {Form, Select, Switch, Row, Col, Input, Button,Affix} from 'antd'
import {routerRedux} from 'dva/router';
const FormItem = Form.Item;

class MyForm extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 10},
    };
    const formItemLayout2 = {
      labelCol: {span: 3},
      wrapperCol: {span: 12},
    };
    let {getFieldDecorator, setFieldsValue, validateFields, getFieldsValue} = this.props.form;
    let {cateList, tagsList, item, dispatch} = this.props;
    const getContents = function (content) {
      setFieldsValue({
        content: content
      })
    }
    const editorProps = {
      getContents: getContents,
      content: item.content || '',
      readOnly: false
    };
    const filterOption = (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    const SelectProps = {
      placeholder: "Select a category",
      showSearch: true,
      optionFilterProp: "children",
      filterOption: filterOption
    }
    const cateOptionLists = cateList.map(d => < Select.Option key={d._id} value={d.name}>{d.name}</ Select.Option>)
    const tagsOptionList = tagsList.map(d => < Select.Option key={d.name} value={d.name}>{d.name}</ Select.Option>)
    const tagsHandleChange = value => {
      setFieldsValue({
        tags: value
      });
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      let type2 = !this.props.type ? 'create' : 'update';
      validateFields((err, values) => {
        if (err) {
          return;
        }
        const data = {
          ...getFieldsValue(),
          key: item.key,
        }
        dispatch({type: `${'articles/'+type2}`, payload: data})
      });
    }
    return (
      <div>
        <Form layout="vertical" onSubmit={handleSubmit}>
          <Affix  onChange={affixed => console.log(2,affixed)} style={{textAlign:'right',top: 0, right: 20, zIndex:999}}>
            <Button ghost   size="large" style={{marginRight:10}} onClick={e=>{
              dispatch(routerRedux.push({
                pathname: '/articles/list',
              }))
            }}>Back</Button>
            <Button type="primary" htmlType="submit" size="large">Submit</Button>
          </Affix>
          <FormItem label="Title" hasFeedback key="Title" colon {...formItemLayout}>
            {getFieldDecorator('title', {
              initialValue: item.title,
              rules: [{required: true, message: 'Title is required!'}]
            })(
              <Input placeholder="Enter the title"/>
            )}
          </FormItem>
          <Row gutter={24}>
            <Col lg={8} md={24}>
              <FormItem label="Category" hasFeedback key="Category" {...formItemLayout} colon>
                {getFieldDecorator('category', {
                  initialValue: item.category,
                  rules: [{required: true, message: 'Category is required!'}]
                })(
                  <Select {...SelectProps}>
                    {cateOptionLists}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col lg={8} md={24}>
              <FormItem label="Tags" hasFeedback key="Tags" {...formItemLayout2} colon>
                {getFieldDecorator('tags', {
                  initialValue: item.tags,
                  rules: [{message: 'Tags is required!', type: 'array'}]
                })(
                  <Select
                    placeholder="Enter or select a tag"
                    mode="tags"
                    dropdownMenuStyle={{maxHeight: 200, overflow: 'auto'}}
                    maxTagTextLength={10}
                    onChange={tagsHandleChange}
                    tokenSeparators={[' ', ',']}
                  >
                    {tagsOptionList}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col lg={8} md={24}>
              <FormItem label="State" key="State" {...formItemLayout2} colon>
                {getFieldDecorator('state', {
                  valuePropName: 'checked',
                  initialValue: item.state
                })(
                  <Switch checkedChildren={'发表'} unCheckedChildren={'草稿'}/>
                )}
              </FormItem>
            </Col>
          </Row>
          <FormItem label="Content" key="Content" colon style={{minHeight:300}}>
            {getFieldDecorator('content', {
              initialValue: item.content,
              rules: [{required: true, message: 'content is required!'}]
            })(
              <Input type="hidden"/>
            )}
            <DraftEditor {...editorProps}/>
          </FormItem>

        </Form>
      </div>)
  }
}
MyForm.propTypes = {
  form: PropTypes.object.isRequired,
  cateList: PropTypes.array,
  tagsList: PropTypes.array,
  dispatch: PropTypes.func,
  item: PropTypes.object,
};

export default Form.create()(MyForm);
