/* eslint-disable no-console */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactSimpleRange from '../src/';
const rootElement = document.getElementById('app');

const wrapper = {
  margin: '20px',
};

const verticalSliderWrap = {
  width: '120px',
  margin: '20px auto',
  height: '140px',
  display: 'inline-block',
};

const myCustomThumbStyle = {
  backgroundColor: '#fff',
  height: '14px',
  width: '14px',
  border: '1px solid rgba(0, 0, 0, 0.45)',
  marginTop: '-2px',
  marginLeft: '-2px',
  transform: 'rotate(45deg)',
};

function logOnChange(state) {
  console.log(state.value);
}

ReactDOM.render(
  <div style={wrapper}>
    <h1><a href="https://github.com/tjallen/react-simple-range">react-simple-range</a> examples</h1>
    <p>No props (falls back to defaultProps. All other sliders log their value to console)</p>
    <ReactSimpleRange />
    <p>step: 10, defaultValue: 50</p>
    <ReactSimpleRange
      step={10}
      defaultValue={50}
      onChange={logOnChange}
    />
    <p>disableThumb</p>
    <ReactSimpleRange
      disableThumb
      step={1}
      value={50}
      onChange={logOnChange}
    />
    <p>custom slider and thumb size</p>
    <ReactSimpleRange
      step={1}
      value={50}
      onChange={logOnChange}
      sliderSize={12}
      thumbSize={18}
    />
    <p>custom colors</p>
    <ReactSimpleRange
      sliderColor="#FFCDD2"
      trackColor="#E57373"
      thumbColor="#B71C1C"
      defaultValue={50}
      onChange={logOnChange}
    />
    <p>slider size > thumb size, step 25</p>
    <ReactSimpleRange
      step={25}
      value={50}
      onChange={logOnChange}
      sliderSize={24}
      thumbSize={8}
    />
    <p>min: 50, custom thumb</p>
    <ReactSimpleRange
      min={50}
      onChange={logOnChange}
      defaultValue={75}
    >
      <div style={myCustomThumbStyle}></div>
    </ReactSimpleRange>
    <div style={verticalSliderWrap}>
      <p>vertical: true</p>
      <ReactSimpleRange
        onChange={logOnChange}
        defaultValue={25}
        vertical
      />
    </div>
    <div style={verticalSliderWrap}>
      <p>slider > thumb size</p>
      <ReactSimpleRange
        onChange={logOnChange}
        vertical
        sliderSize={34}
        thumbSize={12}
      />
    </div>
  </div>,
  rootElement
);
