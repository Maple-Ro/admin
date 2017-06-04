import React, {PropTypes} from "react";
import {connect} from "dva";
import {Card, Col, Row} from "antd";
import {NumberCard, Browser, Cpu, Weather, MyChart, OS} from "./components";
import styles from "./index.less";
import {color,log} from "../../utils";

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

function Dashboard({dashboard}) {
  const {weather, cpu, numbers} = dashboard;
  const NumberCards = numbers.map((item,key)=><Col key={key} lg={6} md={12}>
    <NumberCard {...item}/>
  </Col>)
  return (
    <div>
    <Row gutter={24}>
      {NumberCards}
      <Col lg={8} md={24}>
        <Card bordered={false} {...bodyStyle}>
          <OS {...cpu}/>
        </Card>
      </Col>
      <Col lg={8} md={24}>
        <Card bordered={false} {...bodyStyle}>
          <Cpu {...cpu} />
        </Card>
      </Col>
      <Col lg={8} md={24}>
        <Card bordered={false} {...bodyStyle}>
          <Weather {...weather} />
        </Card>
      </Col>
    </Row>
    </div>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
}

export default connect(({dashboard}) => ({dashboard}))(Dashboard)
