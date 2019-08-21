import React, { Component } from 'react';

import './IndicatorList.scss';
import LightbulbIcon from '../../../assets/images/lightbulb_symbol.svg';

class IndicatorList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="IndicatorList">
        <LightbulbIcon width="0" height="0" />
        <h2>
          <svg className="lightbulb_icon"><use xlinkHref="#lightbulb" /></svg>
          Indicators
        </h2>
        <ul>
          {this.props.indicators.map((indicator, i) => <li className="indicator_row" key={i}>
            {indicator}
          </li>)}
        </ul>
      </div>
    );
  }
}

export default IndicatorList;
