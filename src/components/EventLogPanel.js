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
      .get('http://52.246.186.209/CSE0001/api/users/self/events/')
      .set('Authorization', 'bearer 57c102a1b53645f71e4151d41b92d740690aab71250ef8cbf5e6e130b414498a')
      .end(function(err, res){
        if (err || !res.ok) {
          console.log(res);
        } else {
          const events = res.body.events.map(function(element, index, array) {
            const date = element.occurred_at;
            let date_formatted = date.substr(0,10) + " " + date.substr(11,8);
            return ({id: element.id, event_type_desc: element.event_type_desc, occurred_at: date_formatted});
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
        <BootstrapTable data={this.state.events} striped hover bordered={ false } pagination options={ options } condensed>
          <TableHeaderColumn isKey dataField='id' width="20%">ID</TableHeaderColumn>
          <TableHeaderColumn dataField='event_type_desc' width="50%">内容</TableHeaderColumn>
          <TableHeaderColumn dataField='occurred_at' width="30%">日時</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
