import React from 'react';
import styles from './index.css'; // pass as prop instead

const SliderThumb = ({ thumbPosition, height }) => {
  let thumbStyles = {
    pointerEvents: 'none',
    left: `${thumbPosition}%`,
    marginLeft: `-${height * 0.7}px`,
    top: `-${height * 0.3}px`,
    height: `${height * 1.3}px`,
    width: `${height * 1.3}px`,
  };
  return (
    <div className={styles.thumb} style={thumbStyles}></div>
  );
};
SliderThumb.propTypes = {
};
export default SliderThumb;
