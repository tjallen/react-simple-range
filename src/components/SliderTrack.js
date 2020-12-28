import React from "react";
import PropTypes from "prop-types";

const SliderTrack = ({ trackLength, color, vertical }) => {
    let trackStyles = {
        backgroundColor: color,
        get width() {
            return !vertical ? `${trackLength}%` : "100%";
        },
        get height() {
            return !vertical ? "100%" : `${trackLength}%`;
        },
        get position() {
            return !vertical ? undefined : "absolute";
        },
        get bottom() {
            return !vertical ? undefined : "0";
        },
    };
    return <div data-testid="slider-track" style={trackStyles} />;
};
SliderTrack.propTypes = {
    trackLength: PropTypes.number,
    color: PropTypes.string,
    vertical: PropTypes.bool,
};
export default SliderTrack;
