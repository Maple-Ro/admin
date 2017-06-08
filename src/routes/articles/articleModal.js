import React from 'react'
import PropTypes from 'prop-types'
import {Upload, Icon, message, Form, Input, InputNumber, Radio, Modal, Tabs, Select, Button} from 'antd'
import DraftEditor from '../../components/Editor/Editor';

const FormItem = Form.Item;
const uploadImageCallBack = function () {

};
const onEditorStateChange = function () {

};
const editorState = function () {

};
const editorProps = {
  editorState: editorState,
  toolbarClassName: "home-toolbar",
  wrapperClassName: "home-wrapper",
  editorClassName: "home-editor",
  onEditorStateChange: onEditorStateChange,
  uploadCallback: uploadImageCallBack
};
function modal({
                 visible, type, item = {}, onOk, onCancel,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                 },
               }) {
  function handleOk() {
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

  const modalOpts = {
    title: `${type === 'create' ? 'new article' : 'edit article'}`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  };

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

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="article title" hasFeedback {...formTitleLayout}>
          {getFieldDecorator('title', {
            initialValue: item.title,
            rules: [{required: true, message: 'title is required!'}],
          })(
            <Input placeholder="enter the title"/>
          )}
        </FormItem>
        <FormItem label='article category' hasFeedback {...formItemLayout}>
          {getFieldDecorator('category', {
            initialValue: item.ac_id,
            rules: [
              {
                required: true,
                message: 'article category is required'
              }
            ]
          })(<Select placeholder='--select article category--'>
            {item.category && item.category.map((item, key) => <Select.Option value={String(item.id)} key={key}>{item.name || item.id}</Select.Option>)}
          </Select>)}
        </FormItem>
        <FormItem>
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
