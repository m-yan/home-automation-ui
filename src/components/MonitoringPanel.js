import React, { Component } from 'react';
import Switch from 'rc-switch';
import './index.css';
import { Row, Col } from 'react-bootstrap';
import request from 'superagent';

export default class MonitoringPanel extends Component {


  constructor(props) {
    super(props);
    this.state = {monitoringMode: false, isDetected: false, isDanger: false};
    this.getMonitoringMode()
    this.getSensedState()
    this.handleClick = this.handleClick.bind(this);
  }


  componentDidMount() {
    this.timerID = setInterval(
      () => this.renewSensedState(),
      this.props.updateInterval
    );
  }


  componentWillUnmount() {
    clearInterval(this.timerID);
  }


  handleClick() {
    this.setState(prevState => ({
      monitoringMode: !prevState.monitoringMode, isDanger: false
    }));
    this.setMonitoringMode(! this.state.monitoringMode);
  }


  getMonitoringMode() {
    const self = this
    request
      .get('/api/home_status')
      .end(function(err, res){
        if (err || !res.ok) {
          console.log(res);
        } else {
          self.setState(res.body);
        }
      });
  }


  getSensedState() {
    const self = this
    request
      .get('/HPE_IoT/hgw01/motionSensorData/latest')
      .set('Accept', 'application/vnd.onem2m-res+json')
      .set('X-M2M-RI', 'RI_xxxxx')
      .set('X-M2M-Origin', 'C55DED47A-524c10a0')
      .set('Authorization', 'QzU1REVENDdBLTUyNGMxMGEwOlFURllVV0hNUU8=')
      .end(function(err, res){
        if (err || !res.ok) {
          console.log(res);
        } else {
          const isDetected = res.body["m2m:cin"].con === "0"? false : true
          if (self.state.monitoringMode && ! self.state.isDanger && isDetected) {
            self.setState({isDetected: isDetected, isDanger: true});
          } else {
            self.setState({isDetected: isDetected});
          }
        }
      });
  }


  renewSensedState() {
    if (this.props.autoUpdate) {
      this.getSensedState();
    }
  }


  setMonitoringMode(monitoringMode) {
    request
      .put('/api/home_status')
      .set('Content-Type', 'application/json')
      .send({monitoringMode: monitoringMode})
      .end(function(err, res){
        console.log(res.status);
      });
  }  


  render() {
    let message = null;
    if (this.state.monitoringMode) {
      if (this.state.isDanger) {
        message = <div className="bg-danger text-danger">不審な動きを検知</div> 
      } else {
        message = <div className="bg-success">安全</div>
      }
    } else {
      message = "監視OFF"
    }

    return (
      <div className="panel">
        <div className="panel-header">防犯</div>
        <div className="panel-body">
          <Row className="row-center va-middle">
            <Col xs={4} className="text-left">自宅監視</Col>
            <Col xs={8}>
              <Switch 
                checked={this.state.monitoringMode}
                onClick={this.handleClick}
                checkedChildren={'ON'} 
                unCheckedChildren={'OFF'} 
              />
            </Col>
          </Row>
          <Row className="row-center va-middle">
            <Col xs={4} className="text-left">監視状況</Col>
            <Col xs={8}>
              <strong>{message}</strong>
            </Col>
          </Row>
          <Row className="row-center va-middle">
            <Col xs={4} className="text-left">在室/不在</Col>
            <Col xs={8}>
              <strong>
                {this.state.isDetected? <div className="text-danger">在室</div> : '不在'}
              </strong>
            </Col>
          </Row>
          <Row className="row-center va-middle">
            <Col xs={4} className="text-left">戸締まり</Col>
            <Col xs={8}><strong>閉</strong></Col>
          </Row>
        </div>
      </div>
    );
  }
}
