import React from "react";
import PropTypes from "prop-types";

const SliderLabel = ({
    position,
    color,
    vertical,
    value,
    thumbSize,
    sliderSize,
}) => {
    const labelCentering = -10 + sliderSize * 0.5;
    const labelVerticalOffset = 6 + thumbSize * 0.6;
    const labelWrapperStyles = {
        position: "absolute",
        backgroundColor: color,
        color: "#fff",
        fontSize: "12px",
        textAlign: "center",
        margin: "0",
        zIndex: "5",
        width: "20px",
        height: "20px",
        borderRadius: "2px",
        get bottom() {
            return !vertical ? undefined : `${position}%`;
        },
        get left() {
            return !vertical ? `${position}%` : undefined;
        },
        get top() {
            return !vertical ? "-35px" : undefined;
        },
        get marginLeft() {
            return !vertical ? "-10px" : `${labelCentering}px`;
        },
        get marginBottom() {
            return !vertical ? undefined : `${labelVerticalOffset}px`;
        },
    };
    const pointerStyles = {
        position: "absolute",
        left: "50%",
        marginLeft: "-4px",
        bottom: "-4px",
        borderColor: "transparent",
        borderStyle: "solid",
        width: "0",
        height: "0",
        borderWidth: "4px 4px 0 4px",
        borderTopColor: color,
        zIndex: "4",
    };
    return (
        <div style={labelWrapperStyles}>
            <span>{value}</span>
            <div style={pointerStyles}></div>
        </div>
    );
};
SliderLabel.propTypes = {
    position: PropTypes.number,
    color: PropTypes.string,
    vertical: PropTypes.bool,
    value: PropTypes.number,
    thumbSize: PropTypes.number,
    sliderSize: PropTypes.number,
};
export default SliderLabel;
