import React, { Component } from 'react';

import './Pipeline.scss'

class Pipeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: props.editing == undefined ? false : props.editing,
      jenkinsProjectUrl: props['jenkins-project-url'] == undefined ? "" : props['jenkins-project-url'],
      associatedIndicators: props['associated-indicators'] == undefined ? [] : props['associated-indicators']
    };
  }

  render() {
    let content = "";
    let editBtn = <button className="edit" onClick={this.setEditing.bind(this, true)}>Edit</button>;
    let doneBtn = <button className="done" onClick={this.handleDone.bind(this)}>Done</button>;
    let jenkinsProjectUrlField = <input value={this.state.jenkinsProjectUrl} type="text" size="50" name="jenkins-project-url" onChange={this.handleJenkinsProjectUrlChange.bind(this)} />

    if (this.state.editing) {
      content = (
        <><div className="form_item">
          <label>Jenkins Job URL</label>
          {jenkinsProjectUrlField}
        </div>

        <div className="form_section_title">Associated Indicators</div>
        <ul className="associated_indicators">
          {this.state.associatedIndicators.length == 0 ? <div className="no_indicators_msg">No indicators are associated to this pipeline.</div> : ""}
          {this.state.associatedIndicators.map((id, i) => <li key={i} className="indicator_row">
            <div className="associated_indicator">
              <div className="form_item">
                <label>Indicator</label>
                <select defaultValue={id}>
                  <option hidden={true}>Indicator ID</option>
                  <option value="desc" disabled>Indicator ID</option>
                  {this.props['indicator-ids'].map((id, i) => <option key={i}>
                    {id}
                  </option>)}
                </select>
              </div>
              <div className="form_item">
                <label>Status Indicated</label>
                <select>
                  <option>All</option>
                  <option>Success</option>
                  <option>Failure</option>
                </select>
              </div>
            </div>
            <button className="remove" onClick={this.removeAssociatedIndicator.bind(this, id)}>&#x2715;</button>
          </li>)}
          <li><button className="add" onClick={this.addAssociatedIndicator.bind(this)}>Add Indicator</button></li>
        </ul></>
      );
    }

    return (
      <div className="Pipeline">
        {this.state.editing ? doneBtn : editBtn}
        <div className="name">Pipeline name</div>
        {content}
      </div>
    );
  }

  setEditing(editingState) {
    this.setState({ editing: editingState });
  }

  handleDone() {
    this.setEditing(false);

    fetch('http://localhost:9292/api/pipelines', {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify({
        id: this.props.id,
        jenkins_project_url: this.state.jenkinsProjectUrl,
        associated_indicators: this.state.associatedIndicators
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(
      (result) => {
      },
      (error) => {
      }
    );
  }

  handleJenkinsProjectUrlChange(event) {
    this.setState({ jenkinsProjectUrl: event.target.value });
    return event.target.value;
  }

  addAssociatedIndicator() {
    this.setState((state) => {
      return { associatedIndicators: state.associatedIndicators.concat({ indicator: null, status: null }) };
    });
  }

  removeAssociatedIndicator(remove) {
    this.setState({
      associatedIndicators: this.state.associatedIndicators.filter((indicator) => indicator !== remove)
    });
  }
}

export default Pipeline;
