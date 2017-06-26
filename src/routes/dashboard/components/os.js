import React  from 'react'
import PropTypes from 'prop-types'
import styles from './cpu.less'
import {Card, Progress} from 'antd'
// const countUpProps = {
//   start: 0,
//   duration: 2.75,
//   useEasing: true,
//   useGrouping: true,
//   separator: ',',
// }

function OS ({ ram_percent, ram_usage, space_used, space_percent, cpu, data, staticInfo }) {

  return (<div className={styles.cpu}>
    <div className={styles.number}>
      <div className={styles.item}>
        <p>usage：{ram_usage}MB</p>
        <div>
          <Progress type="circle" percent={parseFloat(ram_percent)} strokeWidth={12} status="active"  />
        </div>
      </div>
      <div className={styles.item}>
        <p>space：{space_used}GB</p>
        <div>
          <Progress type="circle" percent={parseFloat(space_percent)} strokeWidth={12} status="active"  />
        </div>
      </div>
    </div>
    {
      staticInfo ?
      <Card bordered={true}>
        <p>Os：{staticInfo.os}</p>
        <p>Distribution：{staticInfo.distribution}</p>
        <p>Kernel：{staticInfo.kernel}</p>
        <p>PHP：{staticInfo.PHP}</p>
        <p>Nginx：{staticInfo.nginx}</p>
        <p>Mysql：{staticInfo.mysql}</p>
        <p>Mongodb：{staticInfo.mongodb}</p>
        <p>Redis：{staticInfo.redis}</p>
        <p>Uptime：{staticInfo.uptime}</p>
        <p>Uptime_booted：{staticInfo.uptime_booted}</p>
      </Card> : ''
    }
  </div>)
}

OS.propTypes = {
  data: PropTypes.array,
  usage: PropTypes.number,
  space: PropTypes.number,
  cpu: PropTypes.number,
};

export default OS
