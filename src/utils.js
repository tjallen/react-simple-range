export const checkValidity = ({ min, max, step, defaultValue }) => {
    if (max < min) console.error("max must be > min");
    if (min > max) console.error("min must be < max");
    if (max % step !== 0) console.error("max must be evenly divisible by step");
    // todo check defaultValue within range?
};
