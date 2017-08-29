import './Components.css';
import house from './images/house.jpg';
import React, { Component } from 'react';
import Light from './Light'
import Aircon from './Aircon'

export default class FloorLayoutPanel extends Component {

  render() {
    return (
      <div className="panel floor-layout-panel">
        <div className="panel-header">1101号室</div>
        <div className="relative">
          <img src={house} alt="floor layout" className="floor-layout-img" />
          <Light id="light1" title="リビングの照明" top="30%" left="70%" />
          <Light id="light2" title="寝室の照明" top="30%" left="28%" />
          <Aircon id="aircon" title="エアコン" top="13%" left="90%" />
        </div>
      </div>
    );
  }
}
