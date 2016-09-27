import React, { PropTypes } from 'react';

const SliderThumb = ({ customThumb, position, thumbSize, sliderSize, color, vertical }) => {
  let defaultThumb;
  let thumbWrapperStyles;
  if (!vertical) {
    thumbWrapperStyles = {
      position: 'absolute',
      left: `${position}%`,
      top: '0px',
      marginLeft: `-${thumbSize * 0.5}px`,
      marginTop: `-${(thumbSize - sliderSize) * 0.5}px`,
      // opacity: '0.6',
    };
  } else {
    thumbWrapperStyles = {
      position: 'absolute',
      bottom: `${position}%`,
      marginBottom: `-${thumbSize * 0.5}px`,
      marginLeft: `-${(thumbSize - sliderSize) * 0.5}px`,
      // opacity: '0.6',
    };
  }
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
  size: PropTypes.number,
  color: PropTypes.string,
  vertical: PropTypes.bool,
};
export default SliderThumb;
