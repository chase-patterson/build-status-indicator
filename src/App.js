import React, { Component } from 'react';
import PipelineList from './components/PipelineList/PipelineList'
import IndicatorList from './components/IndicatorList/IndicatorList';
import ControllerList from './components/ControllerList/ControllerList';

import './App.css';
import Pipeline from './components/Pipeline/Pipeline';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        pipelines: [],
        indicators: [],
        controllers: []
    };
  }

  render() {
    return (
      <div className="App">
        <h1>Build Status Indicator</h1>
        <PipelineList
          pipelines={this.state.pipelines}
          addPipeline={this.addPipeline.bind(this)}
          removePipeline={this.removePipeline.bind(this)} />
        <IndicatorList indicators={this.state.indicators} />
        <ControllerList controllers={this.state.controllers} />
      </div>
    );
  }

  addPipeline() {
    this.setState((state) => {
      return { pipelines: state.pipelines.concat(<Pipeline editing={true} indicators={state.indicators} />) };
    });
  }

  removePipeline(deleted) {
    this.setState({
      pipelines: this.state.pipelines.filter((pipeline) => pipeline !== deleted)
    });
  }

  addIndicator() {
    this.setState((state) => {
      return { indicators: state.indicators.concat(<Indicator />) };
    });
  }

  removeIndicator(deleted) {
    this.setState({
      indicators: this.state.indicators.filter((indicator) => indicator !== deleted)
    });
  }

  addController() {
    this.setState((state) => {
      return { controllers: state.controllers.concat(<Controller />) };
    });
  }

  removeController(remove) {
    this.setState({
      controllers: this.state.controllers.filter((controller) => controller !== remove)
    });
  }
}

export default App;
