// example tests from https://blog.algolia.com/how-we-unit-test-react-components-using-expect-jsx/

import React from 'react';
import expect from 'expect';
import { createRenderer } from 'react-addons-test-utils';

import Foo from './Foo';

describe('Foo', () => {
  it('works', () => {
    const renderer = createRenderer();
    renderer.render(<Foo />);
    const actualElement = renderer.getRenderOutput();
    const expectedElement = <div>Foo</div>;
    expect(actualElement).toEqual(expectedElement);
  });
});
