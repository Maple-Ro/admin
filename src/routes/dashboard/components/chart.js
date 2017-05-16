import React, {PropTypes} from 'react';
import styles from './chart.less';
import createG2 from 'g2-react';
import {log} from '../../../utils';

const config = {
  width:800,
  height:500,
  plotCfg:{
    margin:[20, 60, 80, 120]
  },
  forceFit:false
}
const Chart = createG2(chart=>{
  chart.col('ip', {
    type:'cat'
  });
  chart.col('count');
  chart.interval().position('ip*count').color('ip');
  chart.render();
})

function MyChart({data}) {
  log(data);//undefined
    return (
        <Chart
          data={data}
          width={config.width}
          height={config.height}
          plotCfg={config.plotCfg}
          forceFit={config.forceFit}
        />
    );
}

Chart.propTypes={
  data:PropTypes.array,
  width:PropTypes.number,
  height:PropTypes.number,
  plotCfg:PropTypes.object,
  forceFit:PropTypes.bool
}

export default MyChart;
