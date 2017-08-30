import './Components.css';
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import request from 'superagent';

export default class EnvironmentalInfoPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {temperature: "-", humidity: "-", illuminance: "-"};
    this.renewEnvironmentalInfo()
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.renewEnvironmentalInfo(),
      this.props.updateInterval     
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  renewEnvironmentalInfo() {
    const self = this
    request
      .get('/HPE_IoT/hgw01/environmentalData/latest')
      .set('Accept', 'application/vnd.onem2m-res+json')
      .set('X-M2M-RI', 'RI_xxxxx')
      .set('X-M2M-Origin', 'C55DED47A-524c10a0')
      .set('Authorization', 'QzU1REVENDdBLTUyNGMxMGEwOlFURllVV0hNUU8=')
      .end(function(err, res){
        if (err || !res.ok) {
          console.log(res);
        } else {
          self.setState(JSON.parse(res.body["m2m:cin"].con));
        }
      });
  }

  render() {
    return (
      <div className="panel">
        <div className="panel-header">室内の環境</div>
        <div className="panel-body">
          <Row className="row-center va-middle">
            <Col xs={4} className="text-left">温度 (°C)</Col>
            <Col xs={8}><strong>{this.state.temperature}</strong></Col>
          </Row>
          <Row className="row-center va-middle">
            <Col xs={4} className="text-left">湿度 (%)</Col>
            <Col xs={8}><strong>{this.state.humidity}</strong></Col>
          </Row>
          <Row className="row-center va-middle">
            <Col xs={4} className="text-left">照度 (lx)</Col>
            <Col xs={8}><strong>{this.state.illuminance}</strong></Col>
          </Row>
        </div>
      </div>
    );
  }
}
