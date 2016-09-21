/* eslint-disable no-console */

import React, { Component, PropTypes } from 'react';

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
    className: PropTypes.string,
    sliderSize: PropTypes.string,
    sliderColor: PropTypes.string,
    trackColor: PropTypes.string,
    thumbHeight: PropTypes.string,
    thumbColor: PropTypes.string,
    thumbOffsetTop: PropTypes.string,
    thumbOffsetLeft: PropTypes.string,
    eventWrapperPadding: PropTypes.string,
  }
  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    onChange: noOp,
    vertical: false,
    // styles
    sliderSize: '6px',
    sliderColor: '#9E9E9E',
    trackColor: '#03A9F4',
    thumbHeight: '8px',
    thumbColor: '#fff',
    thumbOffsetTop: '-2px',
    thumbOffsetLeft: '-5px',
    eventWrapperPadding: '5px 0',
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
    };
    return sliderInfo;
  }
  updateSliderValue(evt) {
    const { max, min } = this.state;
    let { value } = this.state;
    // compare position to slider length to get percentage
    const x = evt.pageX - this.getSliderInfo().bounds.left;
    const totalLength = this.getSliderInfo().length;
    const percent = this.clampValue(+(x / totalLength).toFixed(2), 0, 1);
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
    const eventWrapperStyle = {
      padding: this.props.eventWrapperPadding,
    };
    const sliderStyle = {
      height: `${this.props.sliderSize}`,
      width: '100%',
      backgroundColor: this.props.sliderColor,
    };
    return (
      <div className={this.props.className}>
        <div
          className={styles.eventwrapper}
          style={eventWrapperStyle}
          onMouseDown={this.onMouseDown}
        >
          <div
            ref="slider"
            className={styles.slider}
            style={sliderStyle}
          >
            <SliderTrack
              className={styles.track}
              trackLength={this.state.ratio}
              trackHeight={100}
              color={this.props.trackColor}
            />
            <SliderThumb
              positionLeft={this.state.ratio}
              positionTop={0}
              offsetTop={this.props.thumbOffsetTop}
              offsetLeft={this.props.thumbOffsetLeft}
              height={this.props.thumbHeight}
              color={this.props.thumbColor}
            />
          </div>
        </div>
      </div>
    );
  }
}

