import React, { Component } from 'react';
import Pipeline from '../Pipeline/Pipeline';
import './PipelineList.scss';

class PipelineList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pipelines: []
    };
  }

  render() {
    return (
      <div className="PipelineList">
        <h2>Pipelines</h2>
        <ul>
          {this.state.pipelines.map((pipeline, i) => <li class="pipelineRow" key={i}>
            {pipeline}
            <button class="remove" onClick={this.removePipeline.bind(this, pipeline)}>&#x2715;</button>
          </li>)}
          <li><button class="add" onClick={this.addPipeline.bind(this)}>Add Pipeline</button></li>
        </ul>
      </div>
    );
  }

  addPipeline() {
    this.setState((state, props) => {
      return { pipelines: state.pipelines.concat(<Pipeline />) };
    });
  }

  removePipeline(deleted) {
    this.setState({
      pipelines: this.state.pipelines.filter((pipeline) => pipeline !== deleted)
    });
  }
}

export default PipelineList;