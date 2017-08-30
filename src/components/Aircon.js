import './Components.css';
import aircon from './images/aircon-32x32.png';
import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'
import RemoteControl from './RemoteControl'

export default class Aircon extends Component {

  render() {
    const style = {
      position: 'absolute',
      left: this.props.left,
      top: this.props.top
    };

    return (
      <div>
        <img src={aircon} alt="" style={style} data-tip data-for={this.props.id} />
        <ReactTooltip id={this.props.id} effect="solid" type="light" place="right" delayHide={1000} class="extraClass">
          <RemoteControl title={this.props.title} infraredId={{powerOn: 1, powerOff: 2}} />
        </ReactTooltip>
      </div>
    );
  }
}
