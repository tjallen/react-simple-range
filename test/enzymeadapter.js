// This file is required in mocha.opts
// The only purpose of this file is to setup
// enzyme for React 16.

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
