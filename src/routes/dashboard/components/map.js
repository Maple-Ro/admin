import React, {PropTypes} from 'react';
import styles from './map.less';
import createG2 from 'g2-react';
import G2 from 'g2';
import axios from 'axios';
import $ from 'jquery';
import {log} from '../../../utils';
import base_map from './world.geo.json';

const config = {
  width:800,
  height:500,
  plotCfg:{
    margin:[20, 60, 80, 120]
  },
  forceFit:true, //是否适应容器的宽高
  animate:true
}




  axios.get('china-pm.json').then(function (response) {
    const pointView = chart.createView();
    pointView.source(response.data);
    pointView.point().position(Stat.map.location('long*lant'))
      .size('value', 12, 1)
      .color('#6A006F')
      .tooltip('name*value')
      .shape('circle')
      .style({
        shadowBlur: 10,
        shadowColor: '#6A006F'
      });
    chart.render();
  });

function MyMap({data}) {
  return (
    <Map
      data={data}
      width={config.width}
      height={config.height}
      plotCfg={config.plotCfg}
      forceFit={config.forceFit}
      animate={config.animate}
    />
  );
}

Map.propTypes={
  data:PropTypes.array,
  width:PropTypes.number,
  height:PropTypes.number,
  plotCfg:PropTypes.object,
  forceFit:PropTypes.bool,
  animate:PropTypes.bool
}
function baseMap() {
  const Frame = G2.Frame;
  const Stat = G2.Stat;
  let map = [];
  //读取本地数据
  const mapData = base_map.data;
  const features = mapData.features;
  for(let i=0; i<features.length; i++) {
    const name = features[i].properties.name;
    map.push({
      "name": name
    });
  }
  const chart = new G2.Chart({
    id: 'chart',
    width: 650,
    height: 400,
    plotCfg: {
      margin: [10, 105]
    }
  });
  chart.legend(false);
  chart.coord('map', {
    projection: 'albers',
    basic: [110, 0, 25, 47], // 指定投影方法的基本参数，[λ0, φ0, φ1, φ2] 分别表示中央经度、坐标起始纬度、第一标准纬度、第二标准纬度
    max: [16.573, -13.613], // 指定投影后最大的坐标点
    min: [-27.187, -49.739] // 指定投影后最小的坐标点
  });
  chart.tooltip({
    title: null
  });
  const bgView = chart.createView();
  bgView.source(map);
  bgView.tooltip(false);
  bgView.axis(false);
  bgView.polygon()
    .position(Stat.map.region('name', mapData))
    .color('name', function(val){
      if(val === 'China') {
        return '#C7C7C7';
      } else {
        return '#F0F0F0';
      }
    })
    .style({
      stroke: '#fff',
      lineWidth: 3
    });

  return chart;
}
export default MyMap;
