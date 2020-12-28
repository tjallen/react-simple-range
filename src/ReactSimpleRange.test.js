import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/dom";
import React from "react";
import { ReactSimpleRange } from "./components/ReactSimpleRange";

afterEach(cleanup);

test("render is gucci", () => {
    render(<ReactSimpleRange />);
    expect(screen.getByTestId("wrapper-events")).toBeTruthy();
});
test("fires passed onChangeComplete fn when mouse clicked", () => {
    const onChange = jest.fn();
    render(<ReactSimpleRange onChangeComplete={onChange} />);
    userEvent.dblClick(screen.getByTestId("slider-track"));
    expect(onChange).toHaveBeenCalled();
});

test("behaves itself when given evenly divisible step value", () => {
    render(<ReactSimpleRange max={30} step={3} />);
    expect(screen.getByTestId("slider-track")).toBeTruthy();
});
test("renders custom thumb if provided", () => {
    render(<ReactSimpleRange customThumb={<div>test</div>} />);
    expect(screen.getByText("test")).toBeTruthy();
});
test("(onChange) increments slider value from arrow key events w/ default step", () => {
    let value = 0;
    const onChange = (s) => (value = s.value);
    render(<ReactSimpleRange onChange={onChange} />);
    const slider = screen.getByTestId("slider-track");
    fireEvent.keyDown(slider, {
        keyCode: 39,
    });
    expect(value).toBe(1);
});
test.todo(
    "(onChangeComplete) increments slider value from arrow key events w/ default step"
);
test("(onChange) decrements slider value from arrow key events w/ provided step", () => {
    let value = 50;
    const onChange = (s) => (value = s.value);
    render(
        <ReactSimpleRange onChange={onChange} defaultValue={50} step={10} />
    );
    const slider = screen.getByTestId("slider-track");
    fireEvent.keyDown(slider, {
        keyCode: 37,
    });
    expect(value).toBe(40);
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
