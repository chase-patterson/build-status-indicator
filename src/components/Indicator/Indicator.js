import React, { Component } from 'react';

import './Indicator.scss';

class Indicator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      state: props.state,
      brightness: props.brightness
    }
  }

  render() {
    return (
      <div className="Indicator">
        <div className="name">ID: {this.props.id}</div>
        <div className="form_contents">
          <div className="form_item">
            <label>Brightness</label>
            <input type="range" min="1" max="255" value={this.state.brightness} className="brightness" onChange={this.handleBrightnessChange.bind(this)} />
          </div>
          <div className="form_item">
            <label>State</label>
            <input checked={this.state.state == 'on' ? true : false} type="checkbox" className="state" onChange={this.handleStateChange.bind(this)} />
          </div>
        </div>
      </div>
    );
  }

  handleStateChange(event) {
    this.setState({ state: event.target.checked ? 'on' : 'off' });

    fetch('http://localhost:9292/api/indicators', {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify({
        id: this.props.id,
        state: event.target.checked ? 'on' : 'off'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(
      (result) => {
      },
      (error) => {
        console.log(error);
      }
    );

    return event.target.value;
  }

  handleBrightnessChange(event) {
    this.setState({ brightness: event.target.value });

    if (this.stateRangeTimeout) {
      clearTimeout(this.stateRangeTimeout);
      this.stateRangeTimeout = null;
    }
    this.stateRangeTimeout = setTimeout(this.sendBrightness.bind(this, event.target.value), 1000);

    return event.target.value;
  }

  sendBrightness(brightness) {
    fetch('http://localhost:9292/api/indicators', {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify({
        id: this.props.id,
        brightness: brightness
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(
      (result) => {
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

export default Indicator;