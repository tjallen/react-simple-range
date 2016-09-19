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
    <p>step: 10, defaultValue: 50, passing down a class</p>
    <ReactSimpleRange
      step={10}
      defaultValue={50}
      onChange={logOnChange}
    />
    <p>step: 25, value: 25, passing down a class</p>
    <ReactSimpleRange
      step={25}
      value={25}
      onChange={logOnChange}
    />
    <p>min: 25, max: 50, step: 5, height: 10</p>
    <ReactSimpleRange
      min={25}
      max={50}
      step={5}
      height={10}
      onChange={logOnChange}
    />
    <p>step: 1, container div testing</p>
    <div style={widthAndAutoMargins}>
      <ReactSimpleRange
        step={1}
        onChange={logOnChange}
      />
    </div>
  </div>,
  rootElement
);
