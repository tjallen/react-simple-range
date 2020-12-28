export const EVENT_TYPES = {
    TOUCH: "TOUCH_EVENT",
    MOUSE: "MOUSE_EVENT",
    KEYBOARD: "KEYBOARD_EVENT",
};

export const checkValidity = ({ min, max, step, defaultValue }) => {
    if (max < min) console.error("max must be > min");
    if (min > max) console.error("min must be < max");
    if (max % step !== 0) console.error("max must be evenly divisible by step");
    // todo check defaultValue within range?
};

export const clampValue = (val, min, max) => {
    return Math.max(min, Math.min(val, max));
};

export const getRatio = (value, min, max) => {
    return (Math.max(value - min, 0) * 100) / (max - min);
};

export const isArrowKey = (keyCode) => {
    return keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40;
};

export const getEventType = (event) => {
    if (event.touches) return EVENT_TYPES.TOUCH;
    if (event.keyCode) return EVENT_TYPES.KEYBOARD;
    return EVENT_TYPES.MOUSE;
};
