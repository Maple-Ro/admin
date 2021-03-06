import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col } from 'antd'
import { Search } from '../../components'

const ArticleFilter = ({field, keyword, onSearch, onAdd}) => {
  const searchGroupProps = {
    field,
    keyword,
    size: 'large',
    select: true,
    selectOptions: [{ value: 'title', name: 'Title' }, { value: 'category', name: 'Category' },{ value: 'tags', name: 'Tags' },{ value: 'content', name: 'Content' }],
    selectProps: {
      defaultValue: field || 'title',
    },
    onSearch: (value) => {
      onSearch(value)
    },
  };
  return (
    <Row gutter={24}>
      <Col lg={8} md={12} sm={16} xs={24} style={{ marginBottom: 16 }}>
        <Search {...searchGroupProps} />
      </Col>
      <Col lg={{ offset: 8, span: 8 }} md={12} sm={8} xs={24} style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button size="large" type="ghost" onClick={onAdd}>Add</Button>
      </Col>
    </Row>
  )
};

ArticleFilter.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string
}

export default Form.create()(ArticleFilter)
