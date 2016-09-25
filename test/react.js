// example tests from https://blog.algolia.com/how-we-unit-test-react-components-using-expect-jsx/

import React from 'react';
import expect from 'expect';
import { createRenderer } from 'react-addons-test-utils';

import ReactSimpleRange from '../src/Slider.js';

describe('Slider', () => {
  it('works', () => {
    const renderer = createRenderer();
    renderer.render(<ReactSimpleRange />);
    const actualElement = renderer.getRenderOutput();
    const expectedElement = <div>Foo</div>;
    expect(actualElement).toEqual(expectedElement);
  });
});
