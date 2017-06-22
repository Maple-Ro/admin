import React from "react";
import PropTypes from 'prop-types';
import {connect} from "dva";
import {Card, Col, Row} from "antd";
import {NumberCard, OS, Weather, MyChart, MyMap} from "./components";

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

function Dashboard({dashboard}) {
  const {weather, os, numbers,charts} = dashboard;
  const NumberCards = numbers.map((item,key)=><Col key={key} lg={6} md={12}>
    <NumberCard {...item}/>
  </Col>)
  return (
    <div>
    <Row gutter={24}>
      {NumberCards}
      <Col lg={8} md={24}>
        <Card bordered={false} {...bodyStyle}>
          <OS {...os} />
        </Card>
      </Col>
      <Col lg={6} md={24}>
        <Card bordered={false} {...bodyStyle}>
          <Weather {...weather} />
        </Card>
      </Col>
      <Col lg={10} md={24}>
      <div><MyMap/></div>
    </Col>
    </Row>
      <Row>
        <Col>
          <MyChart data={charts}/>
        </Col>
      </Row>
    </div>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
}

export default connect(({dashboard}) => ({dashboard}))(Dashboard)
