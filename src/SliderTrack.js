import React, { PropTypes } from 'react';

const SliderTrack = ({ trackLength, trackHeight, color }) => {
  let trackStyles = {
    width: `${trackLength}%`,
    height: `${trackHeight}%`,
    backgroundColor: color,
  };
  return (
    <div style={trackStyles}></div>
  );
};
SliderTrack.propTypes = {
  trackLength: PropTypes.number,
  trackHeight: PropTypes.number,
  color: PropTypes.string,
};
export default SliderTrack;
