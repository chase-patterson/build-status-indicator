import React from 'react';
import { shallow, mount } from 'enzyme'
import App from './App';
import { JestEnvironment } from '@jest/environment';
import { doesNotReject } from 'assert';

it('A Pipeline is added to the list in state', async () => {
  fetch
    .mockResponseOnce([])
    .mockResponseOnce([]);
  const app = shallow(<App />);

  expect(app.state().pipelines.length).toEqual(0);


  fetch.mockResponseOnce(JSON.stringify({ id: '12345' }));

  await app.instance().addPipeline().then(() => {
    expect(app.state().pipelines.length).toEqual(1);
  });
});

it('A Pipeline is removed from the list in state', async () => {
  fetch
    .mockResponseOnce([])
    .mockResponseOnce([]);
  const app = mount(<App />);

  fetch.mockResponseOnce(JSON.stringify({ id: '12345' }));
  await app.instance().addPipeline();


  await app.instance().removePipeline(app.state().pipelines[0]).then(() => {
    expect(app.state().pipelines.length).toEqual(0);
  });
});