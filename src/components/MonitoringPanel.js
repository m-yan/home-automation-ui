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
    this.handleClick = this.handleClick.bind(this);
  }


  componentDidMount() {
    this.timerID = setInterval(
      () => this.getSensedState(),
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
    this.setMonitoringMode(this.state.monitoringMode);
  }


  getMonitoringMode() {
    const self = this
    request
      .get('http://52.246.186.209/CSE0001/api/houses/self/monitoring_states')
      .set('Authorization', 'bearer 57c102a1b53645f71e4151d41b92d740690aab71250ef8cbf5e6e130b414498a')
      .end(function(err, res){
        if (err || !res.ok) {
          console.log(res);
        } else {
          let mode = null;
          if (res.body.monitoring_mode === 1) {
            mode = false;
          } else {
            mode = true;
          }
          self.setState({monitoringMode: mode});
        }
      });
  }


  getSensedState() {
    const self = this
    request
      .get('http://52.246.186.209/CSE0001/api/houses/self/monitoring_states')
      .set('Authorization', 'bearer 57c102a1b53645f71e4151d41b92d740690aab71250ef8cbf5e6e130b414498a')
      .end(function(err, res){
        if (err || !res.ok) {
          console.log(res);
        } else {
          const isDetected = res.body.monitoring_sensors[0].sensed_state;
          if (self.state.monitoringMode && ! self.state.isDanger && isDetected) {
            self.setState({isDetected: isDetected, isDanger: true});
          } else {
            self.setState({isDetected: isDetected});
          }
        }
      });
  }


  setMonitoringMode(monitoringMode) {
    const mode = monitoringMode? 1 : 3;

    request
      .put('http://52.246.186.209/CSE0001/api/houses/self/monitoring_mode')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'bearer 57c102a1b53645f71e4151d41b92d740690aab71250ef8cbf5e6e130b414498a')
      .send({mode: mode})
      .end(function(err, res){
        //console.log(res.status);
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
