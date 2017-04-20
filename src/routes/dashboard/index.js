import React, {PropTypes} from "react";
import {connect} from "dva";
import {Card, Col, Row} from "antd";
import {Browser, Cpu, User, Weather} from "./components";
import styles from "./index.less";
import {color} from "../../utils";

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

function Dashboard({dashboard}) {
  const {weather, browser, cpu, user} = dashboard
  return (
    <Row gutter={24}>
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
    </Row>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
}

export default connect(({dashboard}) => ({dashboard}))(Dashboard)
