import React, { PropTypes } from 'react';
import styles from './index.css'; // pass as prop instead

const SliderThumb = ({ positionLeft, positionTop, offsetTop, offsetLeft, height, color }) => {
  let thumbStyles = {
    // pointerEvents: 'none',
    left: `${positionLeft}%`,
    top: `${positionTop}%`,
    marginTop: `${offsetTop}`,
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
  positionTop: PropTypes.number,
  positionLeft: PropTypes.number,
  offsetTop: PropTypes.string,
  offsetLeft: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
};
export default SliderThumb;
