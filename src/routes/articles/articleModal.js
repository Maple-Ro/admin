import React from 'react'
import PropTypes from 'prop-types'
import {Form, Input, Modal, Select} from 'antd'
import DraftEditor from '../../components/Editor/Editor';
import {convertToRaw} from 'draft-js'

const FormItem = Form.Item;
const uploadImageCallBack = ({dispatch, payload}) => {
  dispatch({type: 'articles/upload', payload: payload})
};
const onEditorStateChange = (editorState, editorContent) => {
debugger
  let editorContents = editorState;
  editorContents[index] = editorContent;
  editorContents = [...editorContents];
  DraftEditor.setState({
    editorContents,
  });
  console.log('editorContents', editorContents)
  console.log('editorContent', editorContent)
}
const modal = ({
                 visible, type, item = {}, onOk, onCancel,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
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
      console.log('DraftEditor', DraftEditor.editorState)
      data.content = JSON.stringify(convertToRaw(DraftEditor.editorState.getCurrentContent()), null, 4)
      onOk(data)
    })
  }
  const content = item.content || ''
  const editorProps = {
    toolbarClassName: "home-toolbar",
    wrapperClassName: "home-wrapper",
    editorClassName: "home-editor",
    editorState: content,
    uploadCallback: uploadImageCallBack,
    onEditorStateChange: onEditorStateChange
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
            // rules: [{required: true, message: 'title is required!'}],
          })(
            <Input placeholder="Enter the title"/>
          )}
        </FormItem>
        <FormItem label="Content">
          <DraftEditor
            {...editorProps}
          />
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
