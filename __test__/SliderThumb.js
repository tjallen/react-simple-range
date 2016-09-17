import { createRenderer } from 'react-addons-test-utils';
import tape from 'tape';
import 'ignore-styles';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
import React from 'react';
import SliderThumb from '../src/SliderThumb.js';

const test = addAssertions(tape, { jsxEquals });

test('Slider component', (t) => {
  const renderer = createRenderer();
  // initial render
  renderer.render(<SliderThumb />);
  const actualElement = renderer.getRenderOutput();
  const expectedElement = `<div\n  className={undefined}\n  style={{height: \'NaNpx\', left: \'undefined%\', marginLeft: \'-NaNpx\', pointerEvents: \'none\', top: \'-NaNpx\', width: \'NaNpx\'}}\n/>`;
  t.jsxEquals(actualElement, expectedElement, 'should work');
  t.end();
});
