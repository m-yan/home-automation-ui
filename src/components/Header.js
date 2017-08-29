import './Components.css';
import logo from './images/hpe_pri_grn_rev_rgb.svg'
import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

export default class Header extends Component {
  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <img src={logo} className="logo navbar-left" alt="floor layout" />
          <Navbar.Brand>
            HPE Home Automation Demo
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}
