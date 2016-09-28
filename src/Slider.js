/* eslint-disable no-console */
import React, { Component, PropTypes } from 'react';

import SliderThumb from './SliderThumb';
import SliderTrack from './SliderTrack';

function noOp() {}

export default class Slider extends Component {
  static propTypes = {
    children: PropTypes.node,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    value: PropTypes.number,
    defaultValue: PropTypes.number,
    onChange: PropTypes.func,
    vertical: PropTypes.bool,
    disableTrack: PropTypes.bool,
    disableThumb: PropTypes.bool,
    sliderColor: PropTypes.string,
    trackColor: PropTypes.string,
    thumbColor: PropTypes.string,
    sliderSize: PropTypes.number,
    thumbSize: PropTypes.number,
  }
  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    onChange: noOp,
    vertical: false,
    disableTrack: false,
    disableThumb: false,
    sliderColor: '#B9B9B9',
    trackColor: '#009688',
    thumbColor: '#009688',
    sliderSize: 6,
    thumbSize: 12,
  }
  constructor(props) {
    super(props);
    this.state = {
      drag: false,
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
  }
  componentWillMount() {
    this.updateStateFromProps(this.props);
  }
  componentDidMount() {
    if (this.props.onChange.name === 'noOp') {
      console.warn(
        `A react-simple-range component was not provided an onChange prop.
        \nRecommend passing down a function as onChange else this component is purely cosmetic`);
    }
  }
  componentWillReceiveProps(nextProps) {
    this.updateStateFromProps(nextProps);
  }
  onMouseDown(evt) {
    const leftMouseButton = 0;
    if (evt.button !== leftMouseButton) return;
    this.updateSliderValue(evt);
    this.setState({ drag: true });
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
    evt.preventDefault();
  }
  getSliderInfo() {
    const sl = this.refs.slider;
    const sliderInfo = {
      bounds: sl.getBoundingClientRect(),
      length: sl.clientWidth,
      height: sl.clientHeight,
    };
    return sliderInfo;
  }
  updateSliderValue(evt) {
    const { max, min } = this.state;
    let { value } = this.state;
    const { vertical } = this.props;
    // compare position to slider length to get percentage
    let position;
    let lengthOrHeight;
    if (!vertical) {
      position = evt.pageX - this.getSliderInfo().bounds.left;
      lengthOrHeight = this.getSliderInfo().length;
    } else {
      lengthOrHeight = this.getSliderInfo().height;
      position = lengthOrHeight - (evt.pageY - this.getSliderInfo().bounds.top);
    }
    const percent = this.clampValue(+(position / lengthOrHeight).toFixed(2), 0, 1);
    // convert perc -> value then match value to notch as per props/state.step
    const rawValue = this.valueFromPercent(percent);
    value = this.calculateMatchingNotch(rawValue);
    // avoid repeated updates of the same value
    if (value === this.state.value) return;
    // percentage of the range to render the track/thumb to
    const ratio = (value - min) * 100 / (max - min);
    this.setState({
      percent,
      value,
      ratio,
    }, this.handleChange);
  }
  handleChange() {
    this.props.onChange(this.state);
  }
  valueFromPercent(perc) {
    const { range, min } = this.state;
    const val = (range * perc) + min;
    return val;
  }
  calculateMatchingNotch(value) {
    const { step, max, min } = this.state;
    const values = [];
    for (let i = min; i <= max; i++) {
      values.push(i);
    }
    const notches = [];
    // find how many entries in values are divisible by step (+min,+max)
    for (const s of values) {
      if (s === min || s === max || s % step === 0) {
        notches.push(s);
      }
    }
    // reduce over the potential notches and find which is the closest
    const match = notches.reduce((prev, curr) => {
      if (Math.abs(curr - value) < Math.abs(prev - value)) {
        return curr;
      }
      return prev;
    });
    return match;
  }
  clampValue(val, min, max) {
    return Math.max(min, Math.min(val, max));
  }
  mouseUp() {
    this.setState({
      drag: false,
    });
    document.removeEventListener('mouseup', this.mouseUp);
    document.removeEventListener('mousemove', this.mouseMove);
  }
  mouseMove(evt) {
    if (!this.state.drag) return;
    this.updateSliderValue(evt);
    evt.stopPropagation();
  }
  updateStateFromProps(props) {
    let value = props.value;
    if (value === undefined) {
      value = (props.defaultValue !== undefined ? props.defaultValue : 0);
    }
    const { min, max, step } = props;
    const range = max - min;
    const ratio = Math.max((value - min), 0) * 100 / (max - min);
    this.setState({
      value,
      min,
      max,
      range,
      step,
      ratio,
    });
  }
  render() {
    const { vertical, sliderSize, disableThumb, disableTrack } = this.props;
    const eventWrapperStyle = {
      height: '100%',
      position: 'relative',
      cursor: 'pointer',
      get width() {
        return vertical ? `${sliderSize}px` : 'auto';
      },
    };
    const sliderStyle = {
      backgroundColor: this.props.sliderColor,
      position: 'relative',
      overflow: 'visible',
      get height() {
        return vertical ? '100%' : `${sliderSize}px`;
      },
      get width() {
        return vertical ? `${sliderSize}px` : '100%';
      },
    };
    return (
      <div
        style={eventWrapperStyle}
        onMouseDown={this.onMouseDown}
      >
        <div
          ref="slider"
          style={sliderStyle}
        >
          {!disableTrack
            ? <SliderTrack
              trackLength={this.state.ratio}
              color={this.props.trackColor}
              vertical={vertical}
            />
            : null
          }
          {!disableThumb
            ? <SliderThumb
              position={this.state.ratio}
              vertical={vertical}
              customThumb={this.props.children}
              thumbSize={this.props.thumbSize}
              sliderSize={this.props.sliderSize}
              color={this.props.thumbColor}
            />
            : null
          }

        </div>
      </div>
    );
  }
}

