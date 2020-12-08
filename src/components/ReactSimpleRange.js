/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { checkValidity, clampValue } from "../utils";
import SliderThumb from "./SliderThumb";
import SliderLabel from "./SliderLabel";
import SliderTrack from "./SliderTrack";

function noOp() {}

export const ReactSimpleRange = (props) => {
    const sliderRef = useRef(null);
    const defaultSliderValue = props.defaultValue || props.value || 0;
    const defaultSliderState = {
        value: defaultSliderValue,
        min: props.min,
        max: props.max,
        range: props.max - props.min,
        step: props.step,
        thumbSize:
            props.thumbSize || props.disableThumb ? 0 : props.sliderSize * 2,
        ratio:
            (Math.max(defaultSliderValue - props.min, 0) * 100) /
            (props.max - props.min),
    };
    const [sliderState, setSliderState] = useState(defaultSliderState);
    const [drag, setDrag] = useState(false);
    const [displayLabel, setDisplayLabel] = useState(false);

    checkValidity(props);

    const mergeSliderState = (updatedProperties) => {
        setSliderState({
            ...sliderState,
            ...updatedProperties,
        });
    };

    const didInitialMount = useRef(false);
    const previousRatio = useRef(0);
    const previousDrag = useRef(false);

    useEffect(() => {
        if (didInitialMount.current === false) {
            didInitialMount.current = true;
            return;
        }
        const ratioHasChanged = sliderState.ratio !== previousRatio.current;
        if (ratioHasChanged) {
            props.onChange && props.onChange(sliderState, props.id);
            previousRatio.current = sliderState.ratio;
        }
        if (drag !== previousDrag.current) {
            if (previousDrag.current === true && drag === false) {
                props.onChangeComplete(sliderState, props.id);
            }
            previousDrag.current = drag;
        }
    });

    const handleInteractionStart = (event) => {
        const eventType = event.touches !== undefined ? "touch" : "mouse";
        const leftMouseButton = 0;
        if (eventType === "mouse" && event.button !== leftMouseButton) return;
        updateSliderValue(event, eventType);
        addEvents(eventType);
        setDrag(true);
        setDisplayLabel(true);
    };

    const handleInteractionEnd = () => {
        setDrag(false);
        setDisplayLabel(false);
        removeEvents();
    };

    const onMouseOrTouchMove = (event) => {
        const eventType = event.touches !== undefined ? "touch" : "mouse";
        updateSliderValue(event, eventType);
        event.stopPropagation();
    };

    const getSliderInfo = () => {
        const sl = sliderRef.current;
        return {
            bounds: sl.getBoundingClientRect(),
            length: sl.clientWidth,
            height: sl.clientHeight,
        };
    };

    const addEvents = (type) => {
        switch (type) {
            case "mouse": {
                document.addEventListener("mousemove", onMouseOrTouchMove);
                document.addEventListener("mouseup", handleInteractionEnd);
                break;
            }
            case "touch": {
                document.addEventListener("touchmove", onMouseOrTouchMove);
                document.addEventListener("touchend", handleInteractionEnd);
                break;
            }
            default: // nothing
        }
    };

    const removeEvents = () => {
        document.removeEventListener("mousemove", onMouseOrTouchMove);
        document.removeEventListener("mouseup", handleInteractionEnd);
        document.removeEventListener("touchmove", onMouseOrTouchMove);
        document.removeEventListener("touchend", handleInteractionEnd);
    };

    const updateSliderValue = (event, eventType) => {
        const { max, min } = sliderState;
        const { vertical } = props;
        const xCoords =
            (eventType !== "touch" ? event.pageX : event.touches[0].pageX) -
            window.pageXOffset;
        const yCoords =
            (eventType !== "touch" ? event.pageY : event.touches[0].pageY) -
            window.pageYOffset;
        // compare position to slider length to get percentage
        let position;
        let lengthOrHeight;
        if (!vertical) {
            position = xCoords - getSliderInfo().bounds.left;
            lengthOrHeight = getSliderInfo().length;
        } else {
            lengthOrHeight = getSliderInfo().height;
            position = lengthOrHeight - (yCoords - getSliderInfo().bounds.top);
        }
        const percent = clampValue(
            +(position / lengthOrHeight).toFixed(2),
            0,
            1
        );

        // convert percentage -> value then match value to notch as per props/state.step
        const rawValue = valueFromPercent(percent);
        const value = calculateMatchingNotch(rawValue);
        // percentage of the range to render the track/thumb to
        const ratio = ((value - min) * 100) / (max - min);
        mergeSliderState({ value, ratio });
    };

    const valueFromPercent = (percentage) => {
        const { range, min } = sliderState;
        return range * percentage + min;
    };

    const calculateMatchingNotch = (value) => {
        const { step, max, min } = sliderState;
        const values = [];
        for (let i = min; i <= max; i++) {
            values.push(i);
        }
        const notches = [];
        // find how many entries in values are divisible by step (+min,+max)
        for (const s of values) {
            if (s === min || s === max || s % step === 0) {
                notches.push(s);
            }
        }
        // reduce over the potential notches and find which is the closest
        return notches.reduce((prev, curr) => {
            if (Math.abs(curr - value) < Math.abs(prev - value)) {
                return curr;
            }
            return prev;
        });
    };

    const {
        vertical,
        sliderSize,
        disableThumb,
        disableTrack,
        customThumb,
        label,
        trackColor,
        thumbColor,
        verticalSliderHeight,
        eventWrapperPadding,
    } = props;
    const eventWrapperStyle = {
        height: "100%",
        position: "relative",
        cursor: "pointer",
        margin: "0 auto",
        get padding() {
            return !vertical
                ? `${eventWrapperPadding}px 0`
                : `0 ${eventWrapperPadding}px`;
        },
        get width() {
            return !vertical ? "auto" : `${sliderSize}px`;
        },
    };

    const sliderStyle = {
        backgroundColor: props.sliderColor,
        position: "relative",
        overflow: "visible",
        get height() {
            return !vertical ? `${sliderSize}px` : verticalSliderHeight;
        },
        get width() {
            return !vertical ? "100%" : `${sliderSize}px`;
        },
    };

    return (
        <div
            style={eventWrapperStyle}
            onMouseDown={handleInteractionStart}
            onTouchStart={handleInteractionStart}
            data-testid="wrapper-events"
        >
            <div
                data-testid="wrapper-slider"
                ref={sliderRef}
                style={sliderStyle}
            >
                {disableTrack === false ? (
                    <SliderTrack
                        trackLength={sliderState.ratio}
                        color={trackColor}
                        vertical={vertical}
                    />
                ) : null}
                {label && displayLabel ? (
                    <SliderLabel
                        position={sliderState.ratio}
                        vertical={vertical}
                        color={trackColor}
                        value={sliderState.value}
                        sliderSize={sliderSize}
                        thumbSize={sliderState.thumbSize}
                    />
                ) : null}
                {disableThumb === false && (
                    <SliderThumb
                        position={sliderState.ratio}
                        vertical={vertical}
                        customThumb={customThumb}
                        thumbSize={sliderState.thumbSize}
                        sliderSize={sliderSize}
                        color={thumbColor}
                        disableThumb={disableThumb}
                        value={sliderState.value}
                    />
                )}
            </div>
        </div>
    );
};

ReactSimpleRange.propTypes = {
    children: PropTypes.element,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    value: PropTypes.number,
    defaultValue: PropTypes.number,
    onChange: PropTypes.func,
    onChangeComplete: PropTypes.func,
    vertical: PropTypes.bool,
    verticalSliderHeight: PropTypes.string,
    eventWrapperPadding: PropTypes.number,
    label: PropTypes.bool,
    disableTrack: PropTypes.bool,
    disableThumb: PropTypes.bool,
    sliderColor: PropTypes.string,
    trackColor: PropTypes.string,
    thumbColor: PropTypes.string,
    sliderSize: PropTypes.number,
    thumbSize: PropTypes.number,
    id: PropTypes.string,
};
ReactSimpleRange.defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    onChange: noOp,
    onChangeComplete: noOp,
    vertical: false,
    verticalSliderHeight: "100px",
    eventWrapperPadding: 8,
    label: false,
    disableTrack: false,
    disableThumb: false,
    sliderColor: "#B9B9B9",
    trackColor: "#009688",
    thumbColor: "#009688",
    sliderSize: 4,
    id: "",
};
