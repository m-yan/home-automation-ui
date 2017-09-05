import './Components.css';
import logo from './images/hpe_pri_grn_rev_rgb.svg'
import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Switch from 'rc-switch';

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <img src={logo} className="logo navbar-left" alt="floor layout" />
          <Navbar.Brand>
            HPE Home Automation Demo
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <div className="navbar-item">自動更新:</div>
            <div className="navbar-item"> 
              <Switch
                checked={this.props.switchChecked}
                onClick={this.handleClick}
                checkedChildren={'ON'}
                unCheckedChildren={'OFF'}
              />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
