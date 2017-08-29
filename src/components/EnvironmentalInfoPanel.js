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
      .get('http://52.246.186.209/CSE0001/api/rooms/5/environmental_info')
      .set('Authorization', 'bearer 57c102a1b53645f71e4151d41b92d740690aab71250ef8cbf5e6e130b414498a')
      .end(function(err, res){
        if (err || !res.ok) {
          console.log(res);
        } else {
          self.setState(res.body);
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
