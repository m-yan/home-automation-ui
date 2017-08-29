import React, { Component } from 'react';
import request from 'superagent';
import { Button } from 'react-bootstrap';

export default class RemoteControl extends Component {


  constructor(props) {
    super(props);
    this.powerOn = this.powerOn.bind(this);
    this.powerOff = this.powerOff.bind(this);
  }


  handleClick() {
    this.setState(prevState => ({
      monitoringMode: !prevState.monitoringMode, isDanger: false
    }));
    this.setMonitoringMode(this.state.monitoringMode);
  }

  powerOn() {
    this.remoteControl("power_on");
  }

  powerOff() {
    this.remoteControl("power_off");
  }

  remoteControl(operateType) {
    request
      .put('http://52.246.186.209/CSE0001/api/devices/' + this.props.deviceId)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'bearer 57c102a1b53645f71e4151d41b92d740690aab71250ef8cbf5e6e130b414498a')
      .send({ operation_type: operateType })
      .end(function(err, res){
        console.log(res);
      });
  }  

  render() {
    return (
      <div>
        <p className="text-center">{this.props.title}</p>
        <Button bsStyle="success" onClick={this.powerOn}>ON</Button>
        <Button onClick={this.powerOff}>OFF</Button>
      </div>      
    );
  }
}
