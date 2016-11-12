import React, { PropTypes } from 'react';

const SliderThumb = ({
  customThumb,
  disableThumb,
  position,
  thumbSize,
  sliderSize,
  color,
  vertical,
 }) => {
  let defaultThumb;
  const thumbCentering = (sliderSize - thumbSize) * 0.5;
  const thumbWrapperStyles = {
    position: 'absolute',
    get left() { return !vertical ? `${position}%` : undefined; },
    get top() { return !vertical ? '0px' : undefined; },
    get bottom() { return !vertical ? undefined : `${position}%`; },
    get marginTop() { return !vertical ? `${thumbCentering}px` : undefined; },
    get marginLeft() {
      return !vertical
      ? `-${thumbSize * 0.5}px`
      : `${thumbCentering}px`;
    },
    get marginBottom() {
      return !vertical
      ? undefined
      : `-${thumbSize * 0.5}px`;
    },
  };
  if (!customThumb) {
    const defaultThumbStyles = {
      backgroundColor: `${color}`,
      opacity: (disableThumb ? '0' : '1'),
      borderRadius: '100%',
      height: `${thumbSize}px`,
      width: `${thumbSize}px`,
    };
    defaultThumb = <div style={defaultThumbStyles}></div>;
  }
  return (
    <div style={thumbWrapperStyles}>
      {customThumb}
      {defaultThumb && defaultThumb}
    </div>
  );
};
SliderThumb.propTypes = {
  position: PropTypes.number,
  offsetTop: PropTypes.number,
  offsetLeft: PropTypes.number,
  sliderSize: PropTypes.number,
  thumbSize: PropTypes.number,
  color: PropTypes.string,
  vertical: PropTypes.bool,
  disableThumb: PropTypes.bool,
  customThumb: PropTypes.node,
};
export default SliderThumb;
