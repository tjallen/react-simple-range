import React, { PropTypes } from 'react';

const SliderThumb = ({ customThumb, disableThumb, position, thumbSize, sliderSize, color, vertical, value }) => {
  let defaultThumb;
  const thumbCentering = (sliderSize - thumbSize) * 0.5;
  const thumbWrapperStyles = {
    position: 'absolute',
    get left() {
      return vertical ? undefined : `${position}%`;
    },
    get top() {
      return vertical ? undefined : '0px';
    },
    get bottom() {
      return vertical ? `${position}%` : undefined;
    },
    get marginLeft() {
      return vertical ? `${thumbCentering}px` : `-${thumbSize * 0.5}px`;
    },
    get marginTop() {
      return vertical ? undefined : `${thumbCentering}px`;
    },
    get marginBottom() {
      return vertical ? `-${thumbSize * 0.5}px` : undefined;
    },
  };
  if (!customThumb) {
    const defaultThumbStyles = {
      backgroundColor: `${color}`,
      opacity: (disableThumb ? '0' : '1'),
      // opacity: '0.5',
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
