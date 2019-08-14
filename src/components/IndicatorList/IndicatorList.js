import React, { Component } from 'react';
import Indicator from '../Indicator/Indicator';

class IndicatorList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="IndicatorList">
        <h2>Indicators</h2>
        <ul>
          {this.props.indicators.map((indicator, i) => <li key={i}>
            {indicator}
          </li>)}
        </ul>
      </div>
    );
  }
}

export default IndicatorList;
