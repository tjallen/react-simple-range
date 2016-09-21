import React, { PropTypes } from 'react';

const SliderTrack = ({ trackLength, color, vertical }) => {
  let trackStyles = {
    width: `${trackLength}%`,
    height: '100%',
    backgroundColor: color,
  };
  if (vertical) {
    trackStyles.height = `${trackLength}%`;
    trackStyles.width = '100%';
    trackStyles.position = 'absolute';
    trackStyles.bottom = '0';
  }
  return (
    <div style={trackStyles}></div>
  );
};
SliderTrack.propTypes = {
  trackLength: PropTypes.number,
  color: PropTypes.string,
  vertical: PropTypes.bool,
};
export default SliderTrack;
