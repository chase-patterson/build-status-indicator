import React, { Component } from 'react';

import './Pipeline.scss'

class Pipeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: props.editing,
      linkedIndicators: []
    };
  }

  render() {
    let content = "";
    let editBtn = <button className="edit" onClick={this.setEditing.bind(this, true)}>Edit</button>;
    let doneBtn = <button className="done" onClick={this.setEditing.bind(this, false)}>Done</button>;
    if (this.state.editing) {
      content = (
        <><div className="form_item">
          <label>Jenkins Job URL</label>
          <input type="text" size="50" name="jenkins-job-url" />
        </div>

        <div className="form_section_title">Linked Indicators</div>
        <ul className="linked_indicators">
          {this.state.linkedIndicators.length == 0 ? <div className="no_indicators_msg">No indicators are linked to this pipeline.</div> : ""}
          {this.state.linkedIndicators.map((indicator, i) => <li key={i} className="indicator_row">
            <div className="linked_indicator">
              <div className="form_item">
                <label>Indicator</label>
                <select>
                  {this.props.indicators.map((indicator, i) => <option key={i}>
                    {indicator.name}
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
            <button className="remove" onClick={this.removeLinkedIndicator.bind(this, indicator)}>&#x2715;</button>
          </li>)}
          <li><button className="add" onClick={this.addLinkedIndicator.bind(this)}>Add Indicator</button></li>
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

  addLinkedIndicator() {
    this.setState((state) => {
      return { linkedIndicators: state.linkedIndicators.concat({ indicator: null, status: null }) };
    });
  }

  removeLinkedIndicator(remove) {
    this.setState({
      linkedIndicators: this.state.linkedIndicators.filter((indicator) => indicator !== remove)
    });
  }
}

export default Pipeline;
