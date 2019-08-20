import React, { Component } from 'react';
import PipelineList from './components/PipelineList/PipelineList'
import IndicatorList from './components/IndicatorList/IndicatorList';
import ControllerList from './components/ControllerList/ControllerList';
import {v4 as uuid} from 'uuid';

import './App.css';
import Pipeline from './components/Pipeline/Pipeline';
import Indicator from './components/Indicator/Indicator';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        pipelines: [],
        indicatorIds: [],
        indicators: [],
        controllers: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:9292/api/indicators', { mode: 'cors' }).then(
      result => result.json()
    ).then(
      (result) => {
        this.setState({
          isLoaded: true,
          indicatorIds: result.map((indicator) => {
            return (
              indicator.id
            );
          }),
          indicators: result.map((indicator) => {
            return (
              <Indicator id={indicator.id} state={indicator.state} brightness={indicator.brightness} />
            );
          })
        })
      },
      (error) => {
      }
    )

    fetch('http://localhost:9292/api/pipelines', { mode: 'cors' }).then(
      result => result.json()
    ).then(
      (result) => {
        this.setState({
          isLoaded: true,
          pipelines: result.map((pipeline) => {
            return (
              <Pipeline id={pipeline.id} indicator-ids={this.state.indicatorIds}
                jenkins-project-url={pipeline.jenkins_project_url} indicator-associations={pipeline['indicator_associations'].map(assoc => ({...assoc, uuid: uuid()}))} />
            );
          })
        })
      },
      (error) => {
      }
    )
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
    return fetch('http://localhost:9292/api/pipelines', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        jenkins_project_url: this.state.jenkinsProjectUrl
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(
      result => result.json()
    ).then(
      (result) => {
        this.setState({
          pipelines: this.state.pipelines.concat(<Pipeline id={result.id} indicator-ids={this.state.indicatorIds} editing={true} />)
        });
      },
      (error) => {
      }
    );
  }

  removePipeline(remove) {
    this.setState({
      pipelines: this.state.pipelines.filter((pipeline) => pipeline !== remove)
    });

    return fetch('http://localhost:9292/api/pipelines', {
      method: 'DELETE',
      mode: 'cors',
      body: JSON.stringify({
        id: remove.props.id
      }),
    }).then(
      (result) => {
      },
      (error) => {
      }
    );
  }
}

export default App;
