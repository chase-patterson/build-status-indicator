import React, { Component } from 'react';

import './IndicatorList.scss';
import IndicatorIcon from '../../../assets/images/indicator.svg';

class IndicatorList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="IndicatorList">
        <IndicatorIcon width="0" height="0" />
        <h2>
          <svg className="indicator_icon"><use xlinkHref="#indicator" /></svg>
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
