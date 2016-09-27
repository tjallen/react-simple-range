import React, { PropTypes } from 'react';
import styles from './index.css'; // pass as prop instead

const SliderThumb = ({ customThumb, position, offsetTop, offsetLeft, size, color, vertical }) => {
  let defaultThumb;
  let thumbWrapperStyles = {
    position: 'absolute',
    left: `${position}%`,
    top: '0px',
    // marginTop: `${offsetTop}px`,
    // marginLeft: `${offsetLeft}px`,
    // pointerEvents: 'none',
  };
  if (vertical) {
    thumbWrapperStyles.top = '';
    thumbWrapperStyles.left = '3px'; // calc this when props redone
    thumbWrapperStyles.bottom = `${position}%`;
  }
  if (!customThumb) {
    const defaultThumbStyles = {
      // backgroundColor: `${color}`,
      backgroundColor: 'red',
      borderRadius: '100%',
      height: `${size * 1.5}px`,
      width: `${size * 1.5}px`,
    };
    defaultThumb = <div style={defaultThumbStyles}></div>;
  }
  return (
    <div className={styles.thumb} style={thumbWrapperStyles}>
      {customThumb ? customThumb : defaultThumb}
    </div>
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
