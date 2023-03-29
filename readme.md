# react-simple-range

[![npm version](https://img.shields.io/npm/v/react-simple-range.svg?style=flat)](https://www.npmjs.com/package/react-simple-range)
[![travis build](https://img.shields.io/travis/tjallen/react-simple-range.svg?style=flat)](https://travis-ci.org/tjallen/react-simple-range)

A simple React slider component for inputting a number value within a range.

## ⚠️ Note: not currently being maintained ⚠️
**Recommend using HTML input type="range" if possible. Otherwise there are a number of similar packages: react-range or react-slider should suit many purposes**

## Install

```npm install react-simple-range --save```

## Usage

Import React and this component using your chosen module bundler:

```
import React from 'react';
import ReactDOM from 'react-dom';
import ReactSimpleRange from 'react-simple-range';
const rootElement = document.getElementById('app');

ReactDOM.render(<ReactSimpleRange />, rootElement);
```

## Props

Name | Type | Default | Description
---|---|---|---
min | number | 0 | Minimum slider value
max | number | 100 | Maximum slider value
step | number | 1  | Number inc/decremented when slider value is changed. The range of the slider (max - min) should be evenly divisible by this
id | string | `null` | Identifier that is passed to the onChange handler (see below)
onChange | function | [NOOP](https://en.wikipedia.org/wiki/NOP) | Function to be called when the slider value changes - your slider will have no effect without this! See below for more information
onChangeComplete | function | [NOOP](https://en.wikipedia.org/wiki/NOP) | Function to be called when user interaction finishes, sends the same values as the onChange handler, the only difference is they get sent when the interaction has ended
defaultValue | number | 0 | Set initial value of slider
vertical | boolean | `false` | Set slider to vertical when true
verticalSliderHeight | string | `100px` | Default slider height if vertical. If your slider already has a fixed height wrapper, just set this to `100%` and the slider will fill the space
eventWrapperPadding | number | 8 | Px value to add padding to the wrapper to make small sliders easier to interact with
label | boolean | `false` | If true, adds a label displaying the slider's value when interacted with
disableThumb | boolean | `false` | Disables the thumb when true
disableTrack | boolean | `false` | Disables the track when true
sliderSize | number | 4 | Px height of slider if horizontal, width if vertical
thumbSize | number | `sliderSize * 2` | Height and width of thumb in px
sliderColor | string | `#9E9E9E` | Color of slider
trackColor | string | `#03A9F4` | Color of track and label
thumbColor | string | `#fff` | Color of thumb
customThumb | element | `undefined` | Pass in a single React element to use as your thumb, replacing the default

## Change handlers

### onChange

The onChange handler receives the following arguments:
- an object containing the current slider `value` and `ratio` (percentage of bar filled)
- the `id` prop of the slider

### onChangeComplete

An alternative change handler which only sends the argument at the end of the mouse drag

### Contributing

PRs are welcome. Submit issues for any bugs or feature requests.

## Commands for local dev

Name | Effect
:---|:---
`npm start` | Runs react-styleguidist, serving examples at  `http://localhost:6060/`
`npm run test` | Runs tests with `jest`
`npm run test:watch` | Runs tests in watch mode 

