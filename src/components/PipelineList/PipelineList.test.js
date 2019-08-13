import React from 'react';
import { shallow } from 'enzyme'
import PipelineList from './PipelineList';

it('A Pipeline is added to the list', () => {
  const pipelineList = shallow(<PipelineList />)
  expect(pipelineList.state().pipelines.length).toBe(0);
  pipelineList.instance().addPipeline();
  expect(pipelineList.state().pipelines.length).toBe(1);
});