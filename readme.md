# react-simple-range

[![npm version](https://badge.fury.io/js/react-simple-range.svg)](https://badge.fury.io/js/react-simple-range)

A simple React component for inputting a number between a min and a max value using a slider.

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

Or the pre-minified version:
```
import ReactSimpleRange from 'react-simple-range/lib/index-min';
```

## Props

Name | Type | Description | Default
---|---|---|---|---
min | number | Minimum slider value | 0
max | number | Maximum slider value | 100
step | number | Number inc/decremented when slider value is changed. The range of the slider (max - min) should be evenly divisible by this | 1
onChange | function | Function to be called when the slider value changes | [NOOP](https://en.wikipedia.org/wiki/NOP)
value | number | Set current value of slider | defaultValue
defaultValue | number | Set initial value of slider | 0
height | number | Height of the slider. This is converted to px and currently also effects the size of the thumb | 5
className | string | Additional CSS class to be applied to root div | undefined

## Development

Clone the repo

```npm start``` in the repo directory to start webpack-dev-server and serve the examples directory.

## Dev commands

Name | Effect
:---|:---
`npm run test` | Does nothing, tests coming soon
`npm start` | Starts a webpack-dev-server, currently serves the `examples/` directory to `http://localhost:8080/`
`npm run prepare` | Prepare the npm module. Runs `npm run test`, `npm run lib` and `npm run libmin`
`npm lib` or `npm libmin` | Bundles a build or minified build, respectively, to `lib/`

## Future additions

- Slider orientation
- Better perf
- Other stuff