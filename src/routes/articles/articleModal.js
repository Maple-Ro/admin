import React, { PropTypes } from 'react'
import { Upload, Icon, message, Form, Input, InputNumber, Radio, Modal, Tabs, Select, Button } from 'antd'
import UEditor from '../../Editor/UEditor'

const FormItem = Form.Item
const TabPane = Tabs.TabPane;
const Option = Select.Option;


const formItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 5,
  },
}

const formTitleLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 10,
  },
}


const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};


class modal extends React.Component{
  constructor(props){
    super(props)

    this.state={
      article_content:'',
      article_image:'',
    }
  }

  handleImage = (value)=>{
    this.setState({
      article_image: value
    })
  }
  handleContent = (value)=>{
    this.setState({
      article_content: value
    })
  }
  handleSelectCategory = (value)=>{
    this.setState({
      ac_id: value
    })
  }

  render (){
    const {
      visible,
      type,
      item,
      onOk,
      onCancel,
      form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
      }
    }= this.props

    const handleOk = (e) => {
      e.preventDefault();
      validateFields((errors,values) => {
        if (errors) {
          return
        }

        const data = {
          ...values,
          article_content:this.state.article_content,
          article_image:this.state.article_image ? this.state.article_image : item.article_image,
        }

        onOk(data)
      })
    }

    const modalOpts = {
      title: `${type === 'create' ? '新建新闻' : '修改新闻'}`,
      visible,
      onOk: handleOk,
      onCancel,
      maskClosable:false,
      wrapClassName: 'vertical-center-modal',
      width:900,
    }

    const formItemLayout = {
      labelCol: {
        span: 3,
      },
      wrapperCol: {
        span: 5,
      },
    }

    const formTitleLayout = {
      labelCol: {
        span: 3,
      },
      wrapperCol: {
        span: 10,
      },
    }


    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };

    console.log(item)
    const imgdata = {article_image:item.article_image}

    return (
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          <Tabs defaultActiveKey="1"  size='small'>
            <TabPane tab="基础信息" key="1">
              <FormItem label="文章标题"  hasFeedback {...formTitleLayout}>
                {getFieldDecorator('article_title', {
                  initialValue: item.article_title,
                  rules: [{ required: true, message: '请输入文章标题!' }],
                })(
                  <Input   placeholder="请输入文章标题" />
                )}
              </FormItem>
              <FormItem label='文章分类' hasFeedback {...formItemLayout}>
                {getFieldDecorator('gc_id', {
                  initialValue:  item.ac_id ,
                  rules: [
                    {
                      required: true,
                      message: '请选择文章分类'
                    }
                  ]
                })(<Select placeholder='--请选择文章分类--'>
                  {item.cateItem && item.cateItem.map((item, key) => <Select.Option value={String(item.id)} key={key}>{item.ac_name || item.id}</Select.Option>)}
                </Select>)}
              </FormItem>

              <FormItem label="文章摘要"   {...formTitleLayout}>
                {getFieldDecorator('article_summary', {
                  initialValue: item.article_summary,
                  rules: [{ required: true, message: '请输入文章摘要!' }],
                })(
                  <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} placeholder="请输入文章摘要" />
                )}
              </FormItem>
              <FormItem label="文章来源"   {...formItemLayout}>
                {getFieldDecorator('info_from', {
                  initialValue: item.info_from,
                  rules: [{ required: false, message: '请输入文章来源!' }],
                })(
                  <Input placeholder="请输入文章来源" />
                )}
              </FormItem>
              <FormItem label="文章作者"   {...formItemLayout}>
                {getFieldDecorator('author', {
                  initialValue: item.author,
                  rules: [{ required: false, message: '请输入文章作者!' }],
                })(
                  <Input placeholder="请输入文章作者" />
                )}
              </FormItem>
              <FormItem label="文章链接"   {...formItemLayout}>
                {getFieldDecorator('article_url', {
                  initialValue: item.author,
                  rules: [{ required: false, message: '请输入文章跳转链接!' }],
                })(
                  <Input placeholder="请输入文章跳转链接" />
                )}
              </FormItem>
              <FormItem label="图片"  {...formItemLayout}>
                <Avatar handleImage={this.handleImage.bind(this)}  {...imgdata}/>
              </FormItem>
            </TabPane>
            <TabPane tab="详情内容" key="2">
              <FormItem>
                <UEditor id="content" handleContent={this.handleContent.bind(this)} content={item.goods_body} />
              </FormItem>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    )
  }
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  type: PropTypes.string,
  item: PropTypes.object,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
