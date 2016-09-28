/* eslint-disable no-console */
import React, { Component, PropTypes } from 'react';

import SliderThumb from './SliderThumb';
import SliderTrack from './SliderTrack';

function noOp() {}

export default class Slider extends Component {
  static propTypes = {
    children: PropTypes.element,
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
  }
  constructor(props) {
    super(props);
    this.state = {
      drag: false,
    };
    this.onInteractionStart = this.onInteractionStart.bind(this);
    this.onMouseOrTouchMove = this.onMouseOrTouchMove.bind(this);
    this.onInteractionEnd = this.onInteractionEnd.bind(this);
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
  onInteractionStart(e) {
    const eventType = (e.touches !== undefined ? 'touch' : 'mouse');
    const leftMouseButton = 0;
    if ((eventType === 'mouse') && (e.button !== leftMouseButton)) return;
    this.updateSliderValue(e, eventType);
    this.setState({ drag: true });
    this.addEvents(eventType);
    e.preventDefault();
  }
  onInteractionEnd() {
    this.setState({
      drag: false,
    });
    this.removeEvents();
  }
  onMouseOrTouchMove(e) {
    const eventType = (e.touches !== undefined ? 'touch' : 'mouse');
    if (!this.state.drag) return;
    this.updateSliderValue(e, eventType);
    e.stopPropagation();
  }
  addEvents(type) {
    switch (type) {
      case 'mouse': {
        document.addEventListener('mousemove', this.onMouseOrTouchMove);
        document.addEventListener('mouseup', this.onInteractionEnd);
        break;
      }
      case 'touch': {
        document.addEventListener('touchmove', this.onMouseOrTouchMove);
        document.addEventListener('touchend', this.onInteractionEnd);
        break;
      }
      default: // nothing
    }
  }
  removeEvents() {
    document.removeEventListener('mousemove', this.onMouseOrTouchMove);
    document.removeEventListener('mouseup', this.onInteractionEnd);
    document.removeEventListener('touchmove', this.onMouseOrTouchMove);
    document.removeEventListener('touchend', this.onInteractionEnd);
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
  updateSliderValue(e, eventType) {
    const { max, min } = this.state;
    const { vertical } = this.props;
    let { value } = this.state;
    const xCoords = (eventType !== 'touch' ? e.pageX : e.touches[0].pageX) - window.pageXOffset;
    const yCoords = (eventType !== 'touch' ? e.pageY : e.touches[0].pageY) - window.pageYOffset;
    // compare position to slider length to get percentage
    let position;
    let lengthOrHeight;
    if (!vertical) {
      position = xCoords - this.getSliderInfo().bounds.left;
      lengthOrHeight = this.getSliderInfo().length;
    } else {
      lengthOrHeight = this.getSliderInfo().height;
      position = lengthOrHeight - (yCoords - this.getSliderInfo().bounds.top);
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
  updateStateFromProps(props) {
    let { value, thumbSize } = this.props;
    if (value === undefined) {
      value = (props.defaultValue !== undefined ? props.defaultValue : 0);
    }
    if (props.thumbSize === undefined) {
      thumbSize = props.sliderSize * 2;
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
      thumbSize,
    });
  }
  render() {
    const { vertical, sliderSize, disableThumb, disableTrack, children } = this.props;
    const eventWrapperStyle = {
      height: '100%',
      position: 'relative',
      cursor: 'pointer',
      margin: '0 auto',
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
        onMouseDown={this.onInteractionStart}
        onTouchStart={this.onInteractionStart}
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
              customThumb={children}
              thumbSize={this.state.thumbSize}
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

