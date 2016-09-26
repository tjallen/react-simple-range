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
    expect(wrapper.length).toEqual(1);
  });
  it('contains a SliderTrack', () => {
    const wrapper = shallow(<ReactSimpleRange />);
    expect(wrapper.find('SliderTrack').length).toEqual(1);
  });
  it('contains a SliderThumb', () => {
    const wrapper = shallow(<ReactSimpleRange />);
    expect(wrapper.find('SliderThumb').length).toEqual(1);
  });
  it('has a default value');
  it('can override the default value');
  it('passes a specified value to SliderTrack as props.trackLength', () => {
    const wrapper = shallow(<ReactSimpleRange value={69} />);
    expect(wrapper.find('SliderTrack').prop('trackLength')).toEqual(69);
  });
  it('passes a specified value to SliderThumb as props.position', () => {
    const wrapper = shallow(<ReactSimpleRange value={69} />);
    expect(wrapper.find('SliderThumb').prop('position')).toEqual(69);
  });
});
