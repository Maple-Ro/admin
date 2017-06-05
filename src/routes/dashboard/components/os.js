import React, { PropTypes } from 'react'
import styles from './cpu.less'
import CountUp from 'react-countup'
import {Card} from 'antd'
const countUpProps = {
  start: 0,
  duration: 2.75,
  useEasing: true,
  useGrouping: true,
  separator: ',',
}

function OS ({ usage, space, cpu, data, staticInfo }) {
  // const {os, distribution, kernel, PHP, nginx, mysql, mongodb, redis, uptime, uptime_booted} = staticInfo;
  return (<div className={styles.cpu}>
    <div className={styles.number}>
      <div className={styles.item}>
        <p>usage</p>
        <p><CountUp
          end={usage}
          suffix="MB"
          {...countUpProps}
        /></p>
      </div>
      <div className={styles.item}>
        <p>space</p>
        <p><CountUp
          end={space}
          suffix="GB"
          {...countUpProps}
        /></p>
      </div>
      <div className={styles.item}>
        <p>cpu</p>
        <p><CountUp
          end={cpu}
          suffix="%"
          {...countUpProps}
        /></p>
      </div>
    </div>
    {
      staticInfo ?
      <Card title="Server basic info" bordered={true}>
        <p>Os：{staticInfo.os}</p>
        <p>Distribution：{staticInfo.distribution}</p>
        <p>Kernel：{staticInfo.kernel}</p>
        <p>PHP：{staticInfo.PHP}</p>
        <p>Nginx：{staticInfo.nginx}</p>
        <p>Mysql：{staticInfo.mysql}</p>
        <p>Mongodb：{staticInfo.mongodb}</p>
        <p>Redis：{staticInfo.redis}</p>
        <p>Uptime：{staticInfo.uptime}</p>
        <p>Uptime_booted；{staticInfo.uptime_booted}</p>
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
