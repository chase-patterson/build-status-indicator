import React from 'react';
import { shallow, mount } from 'enzyme'
import App from './App';

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
    .mockResponseOnce(JSON.stringify(['foo']))
    .mockResponseOnce(JSON.stringify([{ id: 1, jenkins_project_url: 1, indicator_associations: [1, 2, 3] }]));
  const app = mount(<App />);

  fetch.mockResponseOnce(JSON.stringify({ id: '12345' }));
  await app.instance().addPipeline();

  await app.instance().removePipeline(app.state().pipelines[0]).then(() => {
    expect(app.state().pipelines.length).toEqual(1);
  });
});