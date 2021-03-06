import React, { Component } from 'react';
import request from 'superagent';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export default class EventLogPanel extends Component {


  constructor(props) {
    super(props);
    this.state = {events: null, ws: null};
    this.getEventLogs();
  }

  componentDidMount() {
    let ws = new WebSocket("ws://sp-uiot.japaneast.cloudapp.azure.com:10080/ws/events");
    ws.onmessage = this.handleMessage.bind(this);
    this.setState({ws: ws});
  }

  componentWillUnmount() {
    this.state.ws.close();
  }

  handleMessage(event) {
    const notification = JSON.parse(event.data);
    const log = notification["m2m:cin"].con;
    const date = notification["m2m:cin"].ct;
    const jst_date = ("0" + (Number(date.substr(6,2)) + Math.floor((Number(date.substr(9,2)) + 9) / 24 ))).substr(-2);
    const jst_time = ("0" + (Number(date.substr(9,2)) + 9) % 24 ).substr(-2);
    let date_formatted = date.substr(0,4) + "/" + date.substr(4,2) + "/" + jst_date + " " + jst_time + ":" + date.substr(11,2) + ":" + date.substr(13,2);
    this.state.events.unshift({event_type_desc: log, occurred_at: date_formatted});
    this.setState({events: this.state.events});
  }

  getEventLogs() {
    const self = this;
    request
      .get('/HPE_IoT/hgw01/default/?ty=4&lim=20')
      .set('Accept', 'application/vnd.onem2m-res+json')
      .set('X-M2M-RI', 'RI_xxxxx')
      .set('X-M2M-Origin', 'C55DED47A-524c10a0')
      .set('Authorization', 'QzU1REVENDdBLTUyNGMxMGEwOlFURllVV0hNUU8=')
      .end(function(err, res){
        if (err || !res.ok) {
          console.log(res);
        } else if (res.body) {
          const events = res.body.map(function(element, index, array) {
            const event = element["m2m:cin"].con;
            const date = element["m2m:cin"].ct;
            const jst_date = ("0" + (Number(date.substr(6,2)) + Math.floor((Number(date.substr(9,2)) + 9) / 24 ))).substr(-2);
            const jst_time = ("0" + (Number(date.substr(9,2)) + 9) % 24 ).substr(-2);
            let date_formatted = date.substr(0,4) + "/" + date.substr(4,2) + "/" + jst_date + " " + jst_time + ":" + date.substr(11,2) + ":" + date.substr(13,2);
            return ({event_type_desc: event, occurred_at: date_formatted});
          });
          self.setState({events: events});
        }
      });
  }


  render() {
    const options = {
      sizePerPage: 4,
      hideSizePerPage: true
    };

    return (
      <div className="panel">
        <div className="panel-header">イベント</div>
        <div className="panel-body">
          <BootstrapTable data={this.state.events} striped hover bordered={ false } pagination options={ options } condensed>
            <TableHeaderColumn dataField='event_type_desc' isKey width="60%">内容</TableHeaderColumn>
            <TableHeaderColumn dataField='occurred_at' width="40%">日時</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}
