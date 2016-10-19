/* eslint-disable no-console */
import 'babel-polyfill';

import React from 'react';
import ExampleRSR from './ExampleRSR';

const ExampleApp = () => {
  const wrapper = {
    margin: '0 auto',
    padding: '20px',
    maxWidth: '480px',
  };

  const myCustomThumbStyle = {
    backgroundColor: '#fff',
    height: '14px',
    width: '14px',
    border: '1px solid rgba(0, 0, 0, 0.45)',
    marginTop: '-3px',
    marginLeft: '-2px',
    transform: 'rotate(45deg)',
  };

  function logOnChange(state) {
    console.log(state.value);
  }
  return (
    <div style={wrapper}>
      <h1><a href="https://github.com/tjallen/react-simple-range">react-simple-range</a> examples</h1>
      <p>Note: All component instances barring the first are provided with the "label" prop to display their value for the purpose of these examples.</p>
      <ExampleRSR title="No props" />
      <ExampleRSR
        title="Set defaultValue, step in 10s, onChange callback provided (logs to console)"
        label
        step={10}
        defaultValue={50}
        onChange={logOnChange}
      />
      <ExampleRSR
        title="1 - 10 slider"
        label
        min={1}
        max={10}
      />
      <ExampleRSR
        title="Disabled thumb"
        label
        disableThumb
        value={50}
      />
      <ExampleRSR
        title="Disabled track"
        label
        disableTrack
        value={50}
      />
      <ExampleRSR
        title="Custom slider and thumb size"
        label
        step={1}
        value={50}
        sliderSize={12}
        thumbSize={18}
      />
      <ExampleRSR
        title="Custom colors"
        label
        sliderColor="#FFCDD2"
        trackColor="#E57373"
        thumbColor="#B71C1C"
        defaultValue={50}
      />
      <ExampleRSR
        title="Custom min, max, sliderSize, disabled thumb"
        label
        disableThumb
        min={15}
        max={75}
        step={5}
        value={50}
        sliderSize={24}
      />
      <ExampleRSR
        title="Custom thumb element passed down as props.children"
        label
        defaultValue={50}
      >
        <div style={myCustomThumbStyle}></div>
      </ExampleRSR>
      <ExampleRSR
        title="Vertical slider"
        label
        vertical
      />
      <ExampleRSR
        title="Vertical slider with custom sizes, step"
        label
        vertical
        sliderSize={14}
        thumbSize={24}
        step={25}
      />
      <ExampleRSR
        title="Taller vertical slider with custom min, max, size, disabled thumb"
        label
        vertical
        verticalSliderHeight="150px"
        min={1}
        max={99}
        sliderSize={14}
        disableThumb
        defaultValue={66}
      />
    </div>
  );
};

export default ExampleApp;
