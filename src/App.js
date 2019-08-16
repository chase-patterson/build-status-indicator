import React, { Component } from 'react';
import PipelineList from './components/PipelineList/PipelineList'
import IndicatorList from './components/IndicatorList/IndicatorList';
import ControllerList from './components/ControllerList/ControllerList';

import './App.css';
import Pipeline from './components/Pipeline/Pipeline';
import Indicator from './components/Indicator/Indicator';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        pipelines: [],
        indicators: [],
        controllers: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:9292/api/pipelines', { mode: 'cors' }).then(
      result => result.json()
    ).then(
      (result) => {
        this.setState({
          isLoaded: true,
          pipelines: result.map((pipeline) => {
            return (
              <Pipeline id={pipeline.id} indicators={this.state.indicators}
                jenkins-project-url={pipeline.jenkins_project_url} />
            );
          })
        })
      },
      (error) => {
      }
    )

    fetch('http://localhost:9292/api/indicators', { mode: 'cors' }).then(
      result => result.json()
    ).then(
      (result) => {
        this.setState({
          isLoaded: true,
          indicators: result.map((indicator) => {
            return (
              <Indicator id={indicator.id} />
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
    fetch('http://localhost:9292/api/pipelines', {
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
        this.setState((state) => {
          return { pipelines: state.pipelines.concat(<Pipeline id={result.id} editing={true} indicators={state.indicators} />) };
        });
      },
      (error) => {
      }
    )
  }

  removePipeline(remove) {
    this.setState({
      pipelines: this.state.pipelines.filter((pipeline) => pipeline !== remove)
    });

    fetch('http://localhost:9292/api/pipelines', {
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
    )
  }

  addIndicator() {
    this.setState((state) => {
      return { indicators: state.indicators.concat(<Indicator />) };
    });
  }

  removeIndicator(remove) {
    this.setState({
      indicators: this.state.indicators.filter((indicator) => indicator !== remove)
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
