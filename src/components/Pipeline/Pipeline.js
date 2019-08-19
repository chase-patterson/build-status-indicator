import React, { Component } from 'react';
import {v4 as uuid} from 'uuid';

import './Pipeline.scss'

class Pipeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: props.editing == undefined ? false : props.editing,
      jenkinsProjectUrl: props['jenkins-project-url'] == undefined ? "" : props['jenkins-project-url'],
      indicatorAssociations: props['indicator-associations'] == undefined ? [] : props['indicator-associations']
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
        <ul className="indicator_associations">
          {this.state.indicatorAssociations.length == 0 ? <div className="no_indicators_msg">No indicators are associated to this pipeline.</div> : ""}
          {this.state.indicatorAssociations.map((assoc, i) => <li key={assoc.uuid} className="indicator_row">
            <div className="indicator_association">
              <div className="form_item">
                <label>Indicator</label>
                <select defaultValue={assoc.id ? assoc.id : "desc"} onChange={this.handleAssociationIdChange.bind(this, i)}>
                  <option hidden={true}>Indicator ID</option>
                  <option value="desc" disabled>Indicator ID</option>
                  {this.props['indicator-ids'].map((id) => <option key={id} value={id}>
                    {id}
                  </option>)}
                </select>
              </div>
              <div className="form_item">
                <label>Status Indicated</label>

                <select defaultValue={assoc.status ? assoc.status : "desc"} onChange={this.handleAssociationStatusChange.bind(this, i)}>
                  <option hidden={true}>Status Indicated</option>
                  <option value="desc" disabled>Status Indicated</option>
                  <option>All</option>
                  <option>Success</option>
                  <option>Failure</option>
                </select>
              </div>
            </div>
            <button className="remove" onClick={this.removeAssociatedIndicator.bind(this, assoc)}>&#x2715;</button>
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
        indicator_associations: this.state.indicatorAssociations
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

  handleAssociationIdChange(i, event) {
    let assocs = [...this.state.indicatorAssociations];
    assocs[i] = {
      ...assocs[i],
      id: event.target.value
    };
    this.setState({ indicatorAssociations: assocs });

    return event.target.value;
  }

  handleAssociationStatusChange(i, event) {
    let assocs = [...this.state.indicatorAssociations];
    assocs[i] = {
      ...assocs[i],
      status: event.target.value
    };
    this.setState({ indicatorAssociations: assocs });

    return event.target.value;
  }

  addAssociatedIndicator() {
    this.setState({
      indicatorAssociations: this.state.indicatorAssociations.concat({ uuid: uuid(), id: null, status: null })
    });
  }

  removeAssociatedIndicator(remove) {
    this.setState({
      indicatorAssociations: this.state.indicatorAssociations.filter((assoc) => assoc !== remove)
    });
  }
}

export default Pipeline;
