/* eslint-disable no-undef */
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import ReactSimpleRange from '../src/index.js';

const wrapper = shallow(<ReactSimpleRange />);
const wrapperWithValue = shallow(<ReactSimpleRange value={69} />);
const wrapperWithDefaultValue = shallow(<ReactSimpleRange defaultValue={11} />);

describe('ReactSimpleRange', () => {
  it('renders without exploding', () => {
    expect(wrapper.length).toEqual(1);
  });
  it('contains a SliderTrack', () => {
    expect(wrapper.find('SliderTrack').length).toEqual(1);
  });
  it('contains a SliderThumb', () => {
    expect(wrapper.find('SliderThumb').length).toEqual(1);
  });
  it('passes a specified value to SliderTrack as props.trackLength', () => {
    expect(wrapperWithValue.find('SliderTrack').prop('trackLength')).toEqual(69);
  });
  it('passes a specified value to SliderThumb as props.position', () => {
    expect(wrapperWithValue.find('SliderThumb').prop('position')).toEqual(69);
  });
});

describe('SliderTrack', () => {
  it('has a default value of 0', () => {
    expect(wrapper.find('SliderTrack').prop('trackLength')).toEqual(0);
  });
  it('overrides the default trackLength prop if passed defaultValue prop', () => {
    expect(wrapperWithDefaultValue.find('SliderTrack').prop('trackLength')).toEqual(11);
  });
  it('overrides the default trackLength prop if passed value prop', () => {
    expect(wrapperWithValue.find('SliderTrack').prop('trackLength')).toEqual(69);
  });
});

describe('SliderThumb', () => {
  it('has a default value of 0', () => {
    expect(wrapper.find('SliderThumb').prop('position')).toEqual(0);
  });
  it('overrides the default position prop if passed defaultValue prop', () => {
    expect(wrapperWithDefaultValue.find('SliderThumb').prop('position')).toEqual(11);
  });
  it('overrides the default position prop if passed value prop', () => {
    expect(wrapperWithValue.find('SliderThumb').prop('position')).toEqual(69);
  });
});

