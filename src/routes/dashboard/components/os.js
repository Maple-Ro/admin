import React, {PropTypes} from 'react'
import {Card} from 'antd'

function OS({usage, space, cpu, data, staticInfo}) {
  const {os, distribution, kernel, PHP, nginx, mysql, mongodb, redis, uptime, uptime_booted} = staticInfo;
  return (
    <Card title="OS basic info">
      <p><span>os:</span><span>{os}</span></p>
      <p><span>distribution:</span><span>{distribution}</span></p>
      <p><span>kernel:</span><span>{kernel}</span></p>
      <p><span>PHP:</span><span>{PHP}</span></p>
      <p><span>nginx:</span><span>{nginx}</span></p>
      <p><span>mysql:</span><span>{mysql}</span></p>
      <p><span>mongodb:</span><span>{mongodb}</span></p>
      <p><span>redis:</span><span>{redis}</span></p>
      <p><span>uptime:</span><span>{uptime}</span></p>
      <p><span>uptime_booted:</span><span>{uptime_booted}</span></p>
    </Card>
  )
}

OS.propTypes = {
  staticInfo: PropTypes.object.isRequired
}

export default OS
