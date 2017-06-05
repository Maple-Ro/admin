import React, {PropTypes} from 'react';
import styles from './chart.less';
import createG2 from 'g2-react';
import {log} from '../../../utils';

const config = {
  width: 800,
  height: 500,
  plotCfg: {
    margin: [20, 60, 80, 120]
  },
  forceFit: true, //是否适应容器的宽高
  animate: true
}
const Chart = createG2(chart => {
  chart.col('ip', {
    type: 'cat',
    alias: '区域'
  });
  chart.col('count', {
    alias: '请求次数'
  });
  chart.interval().position('ip*count').color('ip');
  chart.render();
  chart.on('plotclick', function (ev) {
    // var item = ev.items[0];
    console.log(ev);
  })
})

function MyChart({data}) {
  return (
    <Chart
      data={data}
      width={config.width}
      height={config.height}
      plotCfg={config.plotCfg}
      forceFit={config.forceFit}
      animate={config.animate}
    />
  );
}

Chart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  plotCfg: PropTypes.object,
  forceFit: PropTypes.bool,
  animate: PropTypes.bool
}

export default MyChart;
