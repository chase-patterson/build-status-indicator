import React, { Component } from 'react';
import Indicator from '../Indicator/Indicator';

class IndicatorList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      indicators: []
    };
  }

  render() {
    return (
      <div className="IndicatorList">
        <h2>Indicators</h2>
        <ul>
          {this.state.indicators.map((indicator, i) => <li key={i}>
            {indicator}
          </li>)}
        </ul>
      </div>
    );
  }

  addIndicator() {
    this.setState((state, props) => {
      return { indicators: state.indicators.concat(<Indicator />) };
    });
  }

  removeIndicator(deleted) {
    this.setState({
      indicators: this.state.indicators.filter((indicator) => indicator !== deleted)
    });
  }
}

export default IndicatorList;