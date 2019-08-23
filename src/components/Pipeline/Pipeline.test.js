import React from 'react';
import { shallow, mount } from 'enzyme'
import Pipeline from './Pipeline';

it('An indicator is associated to the pipeline', () => {
  const pipeline = shallow(<Pipeline />);

  expect(pipeline.state().indicatorAssociations.length).toEqual(0);
});