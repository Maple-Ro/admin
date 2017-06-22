import React from "react";
import PropTypes from 'prop-types';
import {connect} from "dva";
import {Col, Row} from "antd";
import {MyChart, MyMap} from "./../components";

function SS({dashboard}) {
  const {charts} = dashboard;
  return (
    <div>
      <Row gutter={24}>
        <Col>
          <div>
            <p style={{textAlign:'center',paddingTop:15,paddingBottom:15,fontSize:18}}>Shadowsocks Service Call Map</p>
            <MyMap/>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <p style={{textAlign:'center',paddingTop:15,paddingBottom:15,fontSize:18}}>Shadowsocks Service Call Counts</p>
          <MyChart data={charts}/>
        </Col>
      </Row>
    </div>
  )
}

SS.propTypes = {
  dashboard: PropTypes.object,
}

export default connect(({dashboard}) => ({dashboard}))(SS)
