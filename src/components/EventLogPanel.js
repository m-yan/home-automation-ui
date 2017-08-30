import React, { Component } from 'react';
import request from 'superagent';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export default class EventLogPanel extends Component {


  constructor(props) {
    super(props);
    this.state = {events: null};
    this.getEventLogs();
  }


  componentDidMount() {
    this.timerID = setInterval(
      () => this.getEventLogs(),
      this.props.updateInterval
    );
  }


  componentWillUnmount() {
    clearInterval(this.timerID);
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
            const event = element["m2m:cin"].con
            const date = element["m2m:cin"].ct
            const jst_time = ("0" + (Number(date.substr(9,2)) + 9)).substr(-2)
            let date_formatted = date.substr(0,4) + "/" + date.substr(4,2) + "/" + date.substr(6,2) + " " + jst_time + ":" + date.substr(11,2) + ":" + date.substr(13,2);
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
