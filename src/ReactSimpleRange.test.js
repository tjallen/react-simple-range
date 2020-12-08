import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { ReactSimpleRange } from "./components/ReactSimpleRange";

afterEach(cleanup);

// test("testerino", () => {
//     render(<ReactSimpleRange label />);
//     screen.debug();
// });

test("render is gucci", () => {
    render(<ReactSimpleRange />);
    expect(screen.getByTestId("wrapper-events")).toBeTruthy();
});
// could test onChange as below, but currently useEffect tests checks if value has changed for basic throttling so we need to wait for keyboard event implementation
test("fires passed onChangeComplete fn when mouse clicked", () => {
    const onChange = jest.fn();
    render(<ReactSimpleRange onChangeComplete={onChange} />);
    userEvent.dblClick(screen.getByTestId("slider-track"));
    expect(onChange).toHaveBeenCalled();
});
test.todo("can be focused on click");
test.todo("reacts to keyboard events when focused");
test("behaves itself when given evenly divisible step value", () => {
    render(<ReactSimpleRange max={30} step={3} />);
    expect(screen.getByTestId("slider-track")).toBeTruthy();
});
test("renders custom thumb if provided", () => {
    render(<ReactSimpleRange customThumb={<div>test</div>} />);
    expect(screen.getByText("test")).toBeTruthy();
});
test.todo("includes a label if prop provided");
test("does not include thumb if disableThumb prop is true", () => {
    render(<ReactSimpleRange disableThumb />);
    expect(screen.queryByTestId("slider-thumb")).toBeFalsy();
});
test("does not include track if disableTrack prop is true", () => {
    render(<ReactSimpleRange disableTrack />);
    expect(screen.queryByTestId("slider-track")).toBeFalsy();
});
