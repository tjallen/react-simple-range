/* eslint-disable no-console */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactSimpleRange from '../src/';
import myIcon from './icons/ic_volume_up_24px.svg';
const rootElement = document.getElementById('app');

const wrapper = {
  margin: '20px',
};

const widthAndAutoMargins = {
  width: '10px',
  margin: '20px auto',
  height: '140px',
};

const myCustomThumbStyle = {
  backgroundColor: 'yellow',
  height: '14px',
  width: '14px',
  border: '2px solid black',
  marginTop: '-5px',
  marginLeft: '-4px',
};

function logOnChange(state) {
  console.log(state.value);
}

const hereIsMyIcon = <img src={myIcon} alt="myIcon" />;
const anotherIcon = <div>Icon</div>

ReactDOM.render(
  <div style={wrapper}>
    <h1>react-simple-range examples</h1>
    <p>No props (all other sliders log their value to console)</p>
    <ReactSimpleRange />
    <p>step: 10, defaultValue: 50</p>
    <ReactSimpleRange
      step={10}
      defaultValue={50}
      onChange={logOnChange}
    />
    <p>step: 25, value: 25, icon (WIP)</p>
    <ReactSimpleRange
      step={25}
      value={25}
      min={2}
      max={99}
      onChange={logOnChange}
      sliderSize={12}
      thumbSize={18}
      icon={myIcon}
    />
    <p>min: 4, max: 50, step: 1, custom thumb</p>
    <ReactSimpleRange
      min={4}
      max={50}
      step={1}
      onChange={logOnChange}
    >
      <div style={myCustomThumbStyle}></div>
    </ReactSimpleRange>
    <p>vertical: true, container div, icon (WIP)</p>
    <div style={widthAndAutoMargins}>
      <ReactSimpleRange
        onChange={logOnChange}
        step={5}
        vertical
        icon={hereIsMyIcon}
        sliderSize={6}
        thumbSize={22}
      />
    </div>
    <p>slider size larger than thumb size for debugging</p>
    <ReactSimpleRange
      step={25}
      value={25}
      min={2}
      max={99}
      onChange={logOnChange}
      sliderSize={24}
      thumbSize={8}
    />
    <p>vertical + slider size larger than thumb size for debugging</p>
    <div style={widthAndAutoMargins}>
      <ReactSimpleRange
        onChange={logOnChange}
        step={5}
        vertical
        sliderSize={34}
        thumbSize={12}
      />
    </div>
    <p>some horrible custom colors</p>
    <ReactSimpleRange
      sliderColor="black"
      trackColor="brown"
      thumbColor="red"
      onChange={logOnChange}
    />
  </div>,
  rootElement
);
