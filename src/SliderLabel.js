import React, { PropTypes } from 'react';

const SliderLabel = ({ position, color, vertical, value, thumbSize, sliderSize }) => {
  const thumbCentering = (sliderSize - thumbSize) * 0.5;
  const labelCentering = -10 + (sliderSize * 0.5);
  const labelTopOffset = 25 + (sliderSize * 0.5);
  const labelWrapperStyles = {
    position: 'absolute',
    backgroundColor: color,
    color: '#fff',
    fontSize: '12px',
    textAlign: 'center',
    margin: '0',
    zIndex: '5',
    width: '20px',
    height: '20px',
    borderRadius: '2px',
    get left() {
      return vertical ? undefined : `${position}%`;
    },
    get top() {
      return vertical ? undefined : '-35px';
    },
    get marginLeft() {
      return vertical ? `${labelCentering}px` : '-10px';
    },
    get bottom() {
      return vertical ? `${position}%` : undefined;
    },
    get marginBottom() {
      return vertical ? `${thumbSize * 1.5}px` : undefined;
    },
  };
  const pointerStyles = {
    position: 'absolute',
    left: '50%',
    marginLeft: '-4px',
    bottom: '-4px',
    borderColor: 'transparent',
    borderStyle: 'solid',
    width: '0',
    height: '0',
    borderWidth: '4px 4px 0 4px',
    borderTopColor: color,
    zIndex: '4',
  };
  return (
    <div style={labelWrapperStyles}>
      <span>{value}</span>
      <div style={pointerStyles}></div>
    </div>
  );
};
SliderLabel.propTypes = {
  position: PropTypes.number,
  color: PropTypes.string,
  vertical: PropTypes.bool,
  value: PropTypes.number,
};
export default SliderLabel;
