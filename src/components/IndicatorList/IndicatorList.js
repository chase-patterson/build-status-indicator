import React, { Component } from 'react';

import './IndicatorList.scss';

class IndicatorList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="IndicatorList">
        <h2>Indicators</h2>
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
