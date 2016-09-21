import React, { PropTypes } from 'react';
import styles from './index.css'; // pass as prop instead

const SliderThumb = ({ position, offsetTop, offsetLeft, size, color, vertical }) => {
  let thumbStyles = {
    // pointerEvents: 'none',
    left: `${position}%`,
    top: '0px',
    marginTop: `${offsetTop}px`,
    height: `${size}px`,
    width: `${size}px`,
    marginLeft: `${offsetLeft}px`,
    backgroundColor: color,
  };
  if (vertical) {
    thumbStyles.top = '';
    thumbStyles.left = '3px'; // calc this when props redone
    thumbStyles.bottom = `${position}%`;
  }
  return (
    <div className={styles.thumb} style={thumbStyles}></div>
  );
};
SliderThumb.propTypes = {
  position: PropTypes.number,
  offsetTop: PropTypes.number,
  offsetLeft: PropTypes.number,
  size: PropTypes.number,
  color: PropTypes.string,
  vertical: PropTypes.bool,
};
export default SliderThumb;
