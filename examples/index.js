import React from 'react';
import ReactDOM from 'react-dom';
import ReactSimpleRange from '../src/';

const rootElement = document.getElementById('app');

const wrapStyle = {
  // margin: '20px',
};
const innerStyle = {
  // width: '20%',
};

function logOnChange(state) {
  console.log(state.value);
}

ReactDOM.render(
  <div style={wrapStyle}>
    <h1>react-simple-range examples</h1>
    <p>No props</p>
    <ReactSimpleRange />
    <p>step: 10, onChange logs to console, className passed down</p>
    <ReactSimpleRange
      step={10}
      onChange={logOnChange}
      className="myClass"
    />
    <p>min: 25, max: 50, step: 5, height: 10, onChange logs to console</p>
    <div style={innerStyle}>
      <ReactSimpleRange
        min={25}
        max={50}
        step={5}
        height={10}
        onChange={logOnChange}
      />
    </div>
  </div>,
  rootElement
);
