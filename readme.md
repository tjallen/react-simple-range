# react-simple-range

[![npm version](https://badge.fury.io/js/react-simple-range.svg)](https://badge.fury.io/js/react-simple-range)

A simple React component for inputting a number between a min and a max value using a slider.

_nb: in development and getting regular updates - but early in life / not fully tested - production use not recommended yet_

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
---|---|---|---|---
min | number | `0` | Minimum slider value
max | number | `100` | Maximum slider value
step | number | `1`  | Number inc/decremented when slider value is changed. The range of the slider (max - min) should be evenly divisible by this
onChange | function | [NOOP](https://en.wikipedia.org/wiki/NOP) | Function to be called when the slider value changes
value | number | `props.defaultValue` | Set current value of slider
defaultValue | number | `0` | Set initial value of slider
vertical | boolean | false | Set slider to vertical if true, horizontal if false. NB vertical sliders require a wrapper with a set height to not collapse
sliderSize | number | `6` | Px height of slider if horizontal, width if vertical (the other dimension is always 100%)
thumbSize | number | `8` | Px height+width of thumb (aka slider handle / knob)
sliderColor | string | `'#9E9E9E'` | Color of slider
trackColor | string | `'#03A9F4'` | Color of track (aka progress indicator on slider)
thumbColor | string | `'#fff'` | Color of thumb
disableThumb | | |
customThumb | | |
icon | | |

## Development

Clone the repo then run ```npm start``` in the cloned directory to start webpack-dev-server and serve the examples.

## Commands

Name | Effect
:---|:---
`npm start` | Starts a webpack-dev-server, currently serves the `examples/` directory to `http://localhost:8080/`
`npm run test` | Runs tests with `mocha`
`npm run test:watch` | Runs tests in watch mode with `mocha --watch`

## Future additions

- Touch events
- Better perf
- Other stuff