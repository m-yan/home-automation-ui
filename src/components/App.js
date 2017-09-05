import React, { Component } from 'react';
import './App.css';
import { Grid, Row, Col } from 'react-bootstrap';

import Header from './Header';
import FloorLayoutPanel from './FloorLayoutPanel';
import EnvironmentalInfoPanel from './EnvironmentalInfoPanel';
import MonitoringPanel from './MonitoringPanel';
import EventLogPanel from './EventLogPanel';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {autoUpdate: false, updateInterval: 3000};
    this.handleChangeAutoUpdate = this.handleChangeAutoUpdate.bind(this);
  }

  handleChangeAutoUpdate() {
    this.setState(prevState => ({
      autoUpdate: !prevState.autoUpdate
    }));
  }

  render() {
    return (
      <div className="App">
        <Header switchChecked={this.state.autoUpdate} onClick={this.handleChangeAutoUpdate} />
        <Grid>
          <Row>
            <Col sm={8} xs={12}>
              <FloorLayoutPanel />
            </Col>
            <Col sm={4} xs={12}>
              <EnvironmentalInfoPanel autoUpdate={this.state.autoUpdate} updateInterval={this.state.updateInterval} />
              <MonitoringPanel autoUpdate={this.state.autoUpdate} updateInterval={this.state.updateInterval} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <EventLogPanel autoUpdate={this.state.autoUpdate} updateInterval={this.state.updateInterval} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
