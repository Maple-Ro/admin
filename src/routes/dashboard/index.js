import React, {PropTypes} from "react";
import {connect} from "dva";
import {Card, Col, Row} from "antd";
import {NumberCard, Browser, Cpu, User, Weather, MyChart} from "./components";
import styles from "./index.less";
import {color,log} from "../../utils";

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

function Dashboard({dashboard}) {
  log(dashboard)
  const {weather, browser, cpu, user, numbers, charts} = dashboard;

  const NumberCards = numbers.map((item,key)=><Col key={key} lg={6} md={12}>
    <NumberCard {...item}/>
  </Col>)
  return (
    <Row gutter={24}>
      {NumberCards}
      <Col lg={6} md={24}>
        <Row gutter={24}>
          <Col lg={24} md={12}>
            <Card bordered={false} className={styles.weather} bodyStyle={{
              padding: 0,
              height: 204,
              background: color.blue,
            }}>
              <Weather {...weather} />
            </Card>
          </Col>
        </Row>
      </Col>
      <Col lg={8} md={24}>
        <Card bordered={false} {...bodyStyle}>
          <Browser data={browser}/>
        </Card>
      </Col>
      <Col lg={8} md={24}>
        <Card bordered={false} {...bodyStyle}>
          <Cpu {...cpu} />
        </Card>
      </Col>
      <Col lg={8} md={24}>
        <Card bordered={false} bodyStyle={{...bodyStyle.bodyStyle, padding: 0}}>
          <User {...user} />
        </Card>
      </Col>
      <Col lg={8} md={24}>
        <MyChart data={charts}/>
      </Col>
    </Row>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
}

export default connect(({dashboard}) => ({dashboard}))(Dashboard)
