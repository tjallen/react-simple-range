import React, { PropTypes } from 'react';

const SliderTrack = ({ trackLength, color, vertical }) => {
  let trackStyles = {
    backgroundColor: color,
    get width() { return !vertical ? `${trackLength}%` : '100%'; },
    get height() { return !vertical ? '100%' : `${trackLength}%`; },
    get position() { return !vertical ? undefined : 'absolute'; },
    get bottom() { return !vertical ? undefined : '0'; },
  };
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
