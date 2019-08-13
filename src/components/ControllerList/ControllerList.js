import React, { Component } from 'react';
import Controller from '../Controller/Controller';

class ControllerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      controllers: []
    };
  }

  render() {
    return (
      <div className="ControllerList">
        <h2>Controllers</h2>
        <ul>
          {this.state.controllers.map((controller, i) => <li key={i}>
            {controller}
          </li>)}
        </ul>
      </div>
    );
  }

  addController() {
    this.setState({
      controllers: this.state.controllers.concat(<Controller />)
    });
  }

  removeController(deleted) {
    this.setState({
      controllers: this.state.controllers.filter((controller) => controller !== deleted)
    });
  }
}

export default ControllerList;