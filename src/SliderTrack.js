import React from 'react';
import styles from './index.css'; // pass as prop instead

const SliderTrack = ({ trackLength, trackHeight }) => {
  let trackStyles = {
    width: `${trackLength}%`,
    height: `${trackHeight}px`,
  };
  return (
    <div className={styles.track} style={trackStyles}></div>
  );
};
SliderTrack.propTypes = {
};
export default SliderTrack;
