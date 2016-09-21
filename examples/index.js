/* eslint-disable no-console */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactSimpleRange from '../src/';

const rootElement = document.getElementById('app');

const margin = {
  margin: '20px',
};

const widthAndAutoMargins = {
  width: '60%',
  margin: '20px auto',
};

function logOnChange(state) {
  console.log(state.value);
}

ReactDOM.render(
  <div style={margin}>
    <h1>react-simple-range examples</h1>
    <p>No props (all other sliders log their value to console)</p>
    <ReactSimpleRange />
    <p>step: 10, defaultValue: 50</p>
    <ReactSimpleRange
      step={10}
      defaultValue={50}
      onChange={logOnChange}
    />
    <p>step: 25, value: 25, edited slider/thumb height</p>
    <ReactSimpleRange
      step={25}
      value={25}
      min={2}
      max={99}
      onChange={logOnChange}
      sliderSize="10px"
      thumbOffsetTop="-1px"
      thumbHeight="10px"
    />
    <p>min: 4, max: 50, step: 1</p>
    <ReactSimpleRange
      min={4}
      max={50}
      step={1}
      onChange={logOnChange}
    />
    <p>vertical: true, container div</p>
    <div style={widthAndAutoMargins}>
      <ReactSimpleRange
        onChange={logOnChange}
        vertical
      />
    </div>
    <p>more horrible custom styles</p>
    <ReactSimpleRange
      sliderColor="black"
      sliderSize="26px"
      trackColor="brown"
      thumbHeight="28px"
      thumbColor="red"
      thumbOffsetTop="-2px"
      thumbOffsetLeft="-15px"
      onChange={logOnChange}
    />
  </div>,
  rootElement
);
