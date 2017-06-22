import React, {PropTypes} from 'react';
import styles from './map.less';
import createG2 from 'g2-react';
import G2 from 'g2';
import axios from 'axios';
import {apiURL} from '../../../utils/config'
import world from '../../../../assets/world.geo.json'

const MyMap = React.createClass({
  componentDidMount: function () {
    const Frame = G2.Frame;
    const Stat = G2.Stat;
    let map = [];
    const mapData = world;
    const features = mapData.features;
    for (let i = 0; i < features.length; i++) {
      const name = features[i].properties.name;
      map.push({
        "name": name
      });
    }
    const chart = new G2.Chart({
      id: 'chart',
      width: 800,
      height: 600,
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
      .color('name', function (val) {
        if (val === 'China') {
          return '#C7C7C7';
        } else {
          return '#F0F0F0';
        }
      })
      .style({
        stroke: '#fff',
        lineWidth: 3
      });
    axios.get(apiURL + '/api/map').then(function (response) {
      const pointView = chart.createView();
      pointView.source(response.data);
      pointView.point().position(Stat.map.location('lon*lat'))
        .size('count', 12, 1) //size(dim, max, min) 将数据值映射到图形的大小上的方法。size(dim, callback) size('', function(value){if... return .... })
        .color('#ff5001')
        .tooltip('city*count')
        .shape('circle')
        .style({
          shadowBlur: 10,
          shadowColor: '#ff5002'
        });
      chart.render();
    });
  },
  render() {
    return (
      <div>
        <div id="chart"></div>
      </div>
    );
  },
});
export default MyMap;
