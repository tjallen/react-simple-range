import React, { PropTypes } from 'react';
import styles from './index.css'; // pass as prop instead

const SliderTrack = ({ trackLength, color }) => {
  let trackStyles = {
    width: `${trackLength}%`,
    height: '100%',
    backgroundColor: color,
  };
  return (
    <div style={trackStyles}></div>
  );
};
SliderTrack.propTypes = {
  trackLength: PropTypes.number,
  color: PropTypes.string,
};
export default SliderTrack;
