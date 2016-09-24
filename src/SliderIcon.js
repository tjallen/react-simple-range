import React, { PropTypes } from 'react';

const SliderIcon = ({ icon }) => {
  let iconStyles = {
    position: 'absolute',
    left: '-30px',
    top: '-6px',
  };
  return (
    <div style={iconStyles}>[SI]</div>
  );
};
SliderIcon.propTypes = {
};
export default SliderIcon;
