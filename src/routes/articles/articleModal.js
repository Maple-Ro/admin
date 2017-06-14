import React from 'react'
import PropTypes from 'prop-types'
import {Form, Input, Modal, Select} from 'antd'
import DraftEditor from '../../components/Editor/MyEditor';
import {imgURL} from '../../utils/config';
const FormItem = Form.Item;

const modal = ({
                 visible, type, item = {}, onOk, onCancel,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                   setFieldsValue
                 },
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

  const getContents = function (content) {
    setFieldsValue({
      content: content
    })
  }
  const editorProps = {
    getContents: getContents,
    content: item.content || '{"entityMap": {},"blocks": [{"key": "1ahm2","text": "Enter Your Ideas...","type": "unstyled","depth": 0,"inlineStyleRanges": [],"entityRanges": []}]}'
  };
  const modalOpts = {
    width: 1200,
    title: `${type === 'create' ? 'New article' : 'Edit article'}`,
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
        <FormItem label="Title" hasFeedback {...formTitleLayout}>
          {getFieldDecorator('title', {
            initialValue: item.title,
            rules: [{required: true, message: 'title is required!'}]
          })(
            <Input placeholder="Enter the title"/>
          )}
        </FormItem>
        <FormItem label="Content">
          {getFieldDecorator('content', {
            initialValue: item.content,
            rules: [{required: true, message: 'content is required!'}]
          })(
            <Input placeholder="Enter the content" type="hidden"/>
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
