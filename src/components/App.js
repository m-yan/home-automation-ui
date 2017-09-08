import React, { Component } from 'react';
import './App.css';
import { Grid, Row, Col } from 'react-bootstrap';

import Header from './Header';
import FloorLayoutPanel from './FloorLayoutPanel';
import EnvironmentalInfoPanel from './EnvironmentalInfoPanel';
import MonitoringPanel from './MonitoringPanel';
import EventLogPanel from './EventLogPanel';


class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Grid>
          <Row>
            <Col sm={8} xs={12}>
              <FloorLayoutPanel />
            </Col>
            <Col sm={4} xs={12}>
              <EnvironmentalInfoPanel />
              <MonitoringPanel />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <EventLogPanel />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
