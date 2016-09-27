/* eslint-disable no-console */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactSimpleRange from '../src/';
import myIcon from './icons/ic_volume_up_24px.svg';
const rootElement = document.getElementById('app');

const margin = {
  margin: '20px',
};

const widthAndAutoMargins = {
  width: '10px',
  margin: '20px auto',
  height: '140px',
};

function logOnChange(state) {
  console.log(state.value);
}

const hereIsMyIcon = <img src={myIcon} alt="myIcon" />;
const anotherIcon = <div>Icon</div>

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
    <p>step: 25, value: 25, edited slider/thumb size</p>
    <ReactSimpleRange
      step={25}
      value={25}
      min={2}
      max={99}
      onChange={logOnChange}
      sliderSize={10}
      thumbOffsetTop={-1}
      thumbSize={10}
    />
    <p>min: 4, max: 50, step: 1, icon (WIP), custom thumb</p>
    <ReactSimpleRange
      min={4}
      max={50}
      step={1}
      onChange={logOnChange}
      icon={myIcon}
    >
      <div><b>@</b></div>
    </ReactSimpleRange>
    <p>vertical: true, container div, icon (WIP)</p>
    <div style={widthAndAutoMargins}>
      <ReactSimpleRange
        onChange={logOnChange}
        step={5}
        vertical
        icon={hereIsMyIcon}
      />
    </div>
    <p>more horrible custom styles</p>
    <ReactSimpleRange
      sliderColor="black"
      trackColor="brown"
      thumbColor="red"
      sliderSize={26}
      thumbSize={28}
      thumbOffsetTop={-2}
      thumbOffsetLeft={-15}
      onChange={logOnChange}
    />
  </div>,
  rootElement
);
