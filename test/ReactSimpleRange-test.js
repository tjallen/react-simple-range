/* eslint-disable no-undef */
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import ReactSimpleRange from '../src/index.js';
// import SliderTrack from '../src/SliderTrack.js';
// import SliderThumb from '../src/SliderThumb.js';

describe('ReactSimpleRange', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<ReactSimpleRange />);
    // console.log(wrapper.debug());
    expect(wrapper.length).toEqual(1);
  });
  it('contains a SliderTrack');
  it('contains a SliderThumb');
  it('has a default value');
  it('can override the default value');
  it('passes down a specified value to SliderTrack');
  it('passes down a specified value to SliderThumb');
});
