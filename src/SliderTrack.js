import React from 'react';
import styles from './index.css'; // pass as prop instead

const SliderTrack = ({ trackLength, trackHeight, color, }) => {
  let trackStyles = {
    width: `${trackLength}%`,
    height: `100%`,
    backgroundColor: color,
  };
  return (
    <div className={styles.track} style={trackStyles}></div>
  );
};
SliderTrack.propTypes = {
};
export default SliderTrack;
