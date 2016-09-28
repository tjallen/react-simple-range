import React, { PropTypes } from 'react';

const SliderThumb = ({ customThumb, position, thumbSize, sliderSize, color, vertical }) => {
  let defaultThumb;
  const thumbCentering = (sliderSize - thumbSize) * 0.5;
  const thumbWrapperStyles = {
    position: 'absolute',
    get left() {
      if (vertical) return undefined;
      return `${position}%`;
    },
    get top() {
      if (vertical) return undefined;
      return '0px';
    },
    get bottom() {
      if (vertical) return `${position}%`;
      return undefined;
    },
    get marginLeft() {
      if (vertical) return `${thumbCentering}px`;
      return `-${thumbSize * 0.5}px`;
    },
    get marginTop() {
      if (vertical) return undefined;
      return `${thumbCentering}px`;
    },
    get marginBottom() {
      if (vertical) return `-${thumbSize * 0.5}px`;
      return undefined;
    },
  };
  if (!customThumb) {
    const defaultThumbStyles = {
      backgroundColor: `${color}`,
      // backgroundColor: 'red',
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
  customThumb: PropTypes.node,
};
export default SliderThumb;
