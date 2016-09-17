# react-simple-range

A simple React component for inputting a number between a min and a max value using a slider.

## Install

```npm install react-simple-range --save```

## Usage

```
import React from 'react';
import ReactDOM from 'react-dom';
import ReactSimpleRange from 'react-simple-range';
const rootElement = document.getElementById('app');

ReactDOM.render(<ReactSimpleRange />, rootElement);
```

## Props

Name | Type | Description | Default
---|---|---|---|---
min | number | Minimum number value of slider | 0
max | number | Maximum slider value | 100
step | number | Number inc/decremented when slider value is changed. The range of the slider (max minus min) should be evenly divisible by this value | 1
height | number | Height of the slider. This is converted to px and currently also effects the size of the thumb | 5
onChange | function | Function to fire when the slider value changes. Technically not required but the slider won't do much without it! | [NOOP](https://en.wikipedia.org/wiki/NOP)
className | string | Optional extra CSS class to be applied to root div | undefined

## Development

Clone the repo

```npm start``` in the repo directory to start webpack-dev-server and serve the examples directory.

## Dev commands

Name | Effect
:---|:---
`npm run test` | Does nothing, tests to be added
`npm start` | Starts a webpack-dev-server, serving the example in `examples/` to `http://localhost:8080/`
`npm run prepare` | Prepare the npm module. Runs `npm run test`, `npm run lib` and `npm run libmin`
`npm lib` or `npm libmin` | Sends a build and minified build of this module to `lib/`

## Future additions

- Slider orientation
- Better perf
- Other stuff