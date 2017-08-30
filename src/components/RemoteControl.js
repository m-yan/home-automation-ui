import React, { Component } from 'react';
import request from 'superagent';
import { Button } from 'react-bootstrap';

export default class RemoteControl extends Component {


  constructor(props) {
    super(props);
    this.powerOn = this.powerOn.bind(this);
    this.powerOff = this.powerOff.bind(this);
  }

  powerOn() {
    this.remoteControl(this.props.infraredId.powerOn);
  }

  powerOff() {
    this.remoteControl(this.props.infraredId.powerOff);
  }

  remoteControl(infraredId) {
    const requestBody = { 'm2m:cin': { ty: 4, cnf: "text/plain:0", con: infraredId }};
    
    request
      .post('/HPE_IoT/hgw01/iRemoconCommands')
      .set('Content-Type', 'application/vnd.onem2m-res+json; ty=4')
      .set('Accept', 'application/vnd.onem2m-res+json')
      .set('X-M2M-RI', 'RI_xxxxx')
      .set('X-M2M-Origin', 'C55DED47A-524c10a0')
      .set('Authorization', 'QzU1REVENDdBLTUyNGMxMGEwOlFURllVV0hNUU8=')
      .send(requestBody)
      .end(function(err, res){
        console.log(res.status);
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
