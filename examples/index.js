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
    <p>Generic example 1</p>
    <ReactSimpleRange
      min={0}
      max={100}
      step={1}
      onChange={logOnChange}
    />
    <p>Generic example 2</p>
    <div style={innerStyle}>
      <ReactSimpleRange
        min={0}
        max={100}
        step={10}
        height={10}
        onChange={logOnChange}
      />
    </div>
  </div>,
  rootElement
);
