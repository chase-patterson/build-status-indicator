import React, { Component } from 'react';

import './Pipeline.scss'

class Pipeline extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Pipeline">
        <label>
          Jenkins Job URL:&nbsp;
          <input type="text" size="50" name="jenkins-job-url" />
        </label>
      </div>
    );
  }
}

export default Pipeline;