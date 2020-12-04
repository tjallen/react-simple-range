/* eslint-disable no-undef */
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import ReactSimpleRange from '../src/components/ReactSimpleRange';

let lastOnChangeCall = null;

function onChange(state) {
  lastOnChangeCall = state;
}

const wrapper = shallow(<ReactSimpleRange />);
const wrapperWithValue = shallow(<ReactSimpleRange value={69} />);
const wrapperWithDefaultValue = shallow(<ReactSimpleRange defaultValue={11} />);
const wrapperWithOnChange = shallow(<ReactSimpleRange id="id" onChange={onChange} />);

describe('ReactSimpleRange', () => {
  it('renders without exploding', () => {
    expect(wrapper.length).toEqual(1);
  });
  it('has the correct default props');
  it('can be clicked to change the value');
  it('can be passed a function as onChange to fire onClick');
  it('contains a SliderTrack', () => {
    expect(wrapper.find('SliderTrack').length).toEqual(1);
  });
  it('contains a SliderThumb', () => {
    expect(wrapper.find('SliderThumb').length).toEqual(1);
  });
  it('passes a specified value prop to SliderTrack as props.trackLength', () => {
    expect(wrapperWithValue.find('SliderTrack').prop('trackLength')).toEqual(69);
  });
  it('passes a specified value prop to SliderThumb as props.position', () => {
    expect(wrapperWithValue.find('SliderThumb').prop('position')).toEqual(69);
  });
  it('passes id to the onChange handler', () => {
    lastOnChangeCall = null;
    wrapperWithOnChange.instance().handleChange();
    expect(lastOnChangeCall)
      .toNotEqual(null)
      .toInclude({ id: 'id' });
  });
});

describe('SliderTrack', () => {
  it('has a default value of 0', () => {
    expect(wrapper.find('SliderTrack').prop('trackLength')).toEqual(0);
  });
  it('has the correct default props');
  it('overrides default trackLength prop if passed defaultValue prop', () => {
    expect(wrapperWithDefaultValue.find('SliderTrack').prop('trackLength')).toEqual(11);
  });
  it('overrides default trackLength prop if passed value prop', () => {
    expect(wrapperWithValue.find('SliderTrack').prop('trackLength')).toEqual(69);
  });
});

describe('SliderThumb', () => {
  it('has a default value of 0', () => {
    expect(wrapper.find('SliderThumb').prop('position')).toEqual(0);
  });
  it('has the correct default props');
  it('overrides default position prop if passed defaultValue prop', () => {
    expect(wrapperWithDefaultValue.find('SliderThumb').prop('position')).toEqual(11);
  });
  it('overrides default position prop if passed value prop', () => {
    expect(wrapperWithValue.find('SliderThumb').prop('position')).toEqual(69);
  });
});
