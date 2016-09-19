import React, { PropTypes } from 'react';
import styles from './index.css'; // pass as prop instead

const SliderThumb = ({ position, offsetTop, offsetLeft, height, color }) => {
  let thumbStyles = {
    // pointerEvents: 'none',
    left: `${position}%`,
    top: `${offsetTop}`,
    height: `${height}`,
    width: `${height}`,
    backgroundColor: color,
    marginLeft: `${offsetLeft}`,
  };
  return (
    <div className={styles.thumb} style={thumbStyles}></div>
  );
};
SliderThumb.propTypes = {
  position: PropTypes.number,
  offsetTop: PropTypes.string,
  offsetLeft: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
};
export default SliderThumb;
