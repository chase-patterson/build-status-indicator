import React, { Component } from 'react';
import Controller from '../Controller/Controller';

class ControllerList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ControllerList">
        <h2>Controllers</h2>
        <ul>
          {this.props.controllers.map((controller, i) => <li key={i}>
            {controller}
          </li>)}
        </ul>
      </div>
    );
  }
}

export default ControllerList;
