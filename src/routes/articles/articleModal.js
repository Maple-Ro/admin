import React from 'react'
import PropTypes from 'prop-types'
import {Form, Input, Modal, Select, Switch} from 'antd'
import DraftEditor from '../../components/Editor/MyEditor';
const FormItem = Form.Item;
const modal = ({
                 visible, type, item = {}, onOk, onCancel, isView,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                   setFieldsValue
                 }, cateList, tagsList
               }) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }
  /**
   * 回调函数，更新content隐藏域内容
   * @param content
   */
  const getContents = function (content) {
    setFieldsValue({
      content: content
    })
  }

  const editorProps = {
    getContents: getContents,
    content: item.content || '',
    readOnly: isView
  };

  const modalOpts = {
    width: 1200,
    title: `${type + ' article'}`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  };

  /**
   * 布局相关 TODO Make it pretty
   * @type {{labelCol: {span: number}, wrapperCol: {span: number}}}
   */
  const formItemLayout = {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 5,
    },
  };

  const formTitleLayout = {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 10,
    },
  };

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: {span: 24, offset: 0},
      sm: {span: 20, offset: 4},
    },
  };

  /**
   * 分类下拉相关
   * @param input
   * @param option
   */
  const filterOption = (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  const SelectProps = {
    placeholder: "Select a category",
    showSearch: true,
    optionFilterProp: "children",
    filterOption: filterOption
  }
  const cateOptionLists = cateList.map(d => < Select.Option key={d._id} value={d.name}>{d.name}</ Select.Option>)

  /***
   * 标签分类相关
   * @type {XML}
   */
  tagsList = tagsList.length===0 ? tagsList : [{name:'test'}]; //array
  const tagsOptionList = tagsList.map(d => < Select.Option key={d.name} value={d.name}>{d.name}</ Select.Option>)
  function tagsHandleChange(value) {
    setFieldsValue({
      tags: value
    });
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="Title" hasFeedback key="Title">
          {getFieldDecorator('title', {
            initialValue: item.title,
            rules: [{required: true, message: 'Title is required!'}]
          })(
            <Input placeholder="Enter the title"/>
          )}
        </FormItem>
        <FormItem label="Category" hasFeedback key="Category">
          {getFieldDecorator('category', {
            initialValue: item.category,
            rules: [{required: true, message: 'Category is required!'}]
          })(
            <Select {...SelectProps}>
              {cateOptionLists}
            </Select>
          )}
        </FormItem>
        <FormItem label="State" key="State">
          {getFieldDecorator('state', {
            valuePropName: 'checked',
            initialValue: item.state
          })(
            <Switch checkedChildren={'发表'} unCheckedChildren={'草稿'}/>
          )}
        </FormItem>
        <FormItem label="Tags" hasFeedback key="Tags">
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
        <FormItem label="Content" key="Content">
          {getFieldDecorator('content', {
            initialValue: item.content,
            rules: [{required: true, message: 'content is required!'}]
          })(
            <Input type="hidden"/>
          )}
          <DraftEditor {...editorProps}/>
        </FormItem>
      </Form>
    </Modal>
  )
}
modal.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  type: PropTypes.string,
  item: PropTypes.object,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
};

export default Form.create()(modal)
