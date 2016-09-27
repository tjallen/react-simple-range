/* eslint-disable no-console */

import React, { Component, PropTypes } from 'react';

import SliderIcon from './SliderIcon';
import SliderThumb from './SliderThumb';
import SliderTrack from './SliderTrack';

import styles from './index.css';

function noOp() {
}

export default class Slider extends Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    value: PropTypes.number,
    defaultValue: PropTypes.number,
    onChange: PropTypes.func,
    vertical: PropTypes.bool,
    icon: PropTypes.node,
    sliderSize: PropTypes.number,
    sliderColor: PropTypes.string,
    trackColor: PropTypes.string,
    thumbColor: PropTypes.string,
    thumbSize: PropTypes.number,
    thumbOffsetTop: PropTypes.number,
    thumbOffsetLeft: PropTypes.number,
  }
  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    onChange: noOp,
    vertical: false,
    icon: false,
    // styles
    sliderSize: 6,
    sliderColor: '#B9B9B9',
    trackColor: '#009688',
    thumbColor: '#009688',
    thumbSize: 8,
    thumbOffsetTop: -2,
    thumbOffsetLeft: -5,
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
        `ReactSimpleRange component was not provided an onChange prop.
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
    const { vertical, sliderSize, icon } = this.props;
    const sliderStyle = {
      height: `${sliderSize}px`,
      width: '100%',
      backgroundColor: this.props.sliderColor,
      position: 'relative',
    };
    if (vertical) {
      sliderStyle.height = '100%';
      sliderStyle.width = `${sliderSize}px`;
    }
    return (
      <div
        className={styles.eventwrapper}
        onMouseDown={this.onMouseDown}
      >
      {icon ? <SliderIcon /> : null}
        <div
          ref="slider"
          className={styles.slider}
          style={sliderStyle}
        >
          <SliderTrack
            className={styles.track}
            trackLength={this.state.ratio}
            color={this.props.trackColor}
            vertical={vertical}
          />
          <SliderThumb
            customThumb={this.props.children}
            position={this.state.ratio}
            offsetTop={this.props.thumbOffsetTop}
            offsetLeft={this.props.thumbOffsetLeft}
            size={this.props.thumbSize}
            color={this.props.thumbColor}
            vertical={vertical}
          />
        </div>
      </div>
    );
  }
}

