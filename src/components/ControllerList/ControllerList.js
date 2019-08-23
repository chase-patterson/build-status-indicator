import React, { Component } from 'react';
import Controller from '../Controller/Controller';
import './ControllerList.scss';
import ControllerIcon from '../../assets/images/controller.svg';

class ControllerList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ControllerList">
        <ControllerIcon width="0" height="0" />
        <h2>
          <svg className="controller_icon"><use xlinkHref="#controller" /></svg>
          Controllers
        </h2>
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
