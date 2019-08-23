import React, { Component } from 'react';
import './PipelineList.scss';
import PipelineIcon from '../../assets/images/pipeline.svg';

class PipelineList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };
  }

  render() {
    let pipelineListClasses = `PipelineList ${this.state.editing ? 'editing' : ''}`;
    let noPipelinesMsg = <p>You're not monitoring any pipelines, yet; <button className="init_add" onClick={this.addPipeline.bind(this)}>add one</button>.</p>;
    let editBtn = <button className="edit" onClick={this.setEditing.bind(this, true)}>Add/Remove</button>;
    let doneBtn = <button className="done" onClick={this.setEditing.bind(this, false)}>Done</button>;
    let addPipelineBtn = <button className="add" onClick={this.addPipeline.bind(this)}>Add Pipeline</button>;
    return (
      <div className={pipelineListClasses}>
        <svg height="0" width="0">
          <defs>
            <filter id="dropshadow">
              <feDropShadow dx="1" dy="1" stdDeviation="1"/>
            </filter>
          </defs>
        </svg>
        <PipelineIcon width="0" height="0" />
        <h2>
          <svg className="pipeline_icon"><use xlinkHref="#pipeline" /></svg>
          Pipelines
        </h2>
        {this.props.pipelines.length == 0 ? noPipelinesMsg : (this.state.editing ? doneBtn : editBtn)}
        <ul>
          {this.props.pipelines.map((pipeline, i) => <li className="pipeline_row" key={i}>
            {pipeline}
            {this.state.editing ? <button className="remove" onClick={this.removePipeline.bind(this, pipeline)}>&#x2715;</button> : ""}
          </li>)}
        </ul>
        {(this.state.editing ? addPipelineBtn : "")}
      </div>
    );
  }

  addPipeline() {
    this.props.addPipeline();
  }

  removePipeline(remove) {
    this.props.removePipeline(remove);
    this.setState({
      editing: (this.props.pipelines.length <= 1) ? false : true
    });
  }

  setEditing(editingState) {
    this.setState({ editing: editingState });
  }
}

export default PipelineList;
