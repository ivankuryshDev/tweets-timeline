import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Header from './Header';

configure({ adapter: new Adapter() });

describe('<Header />', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header user={{
      name: 'foo',
      screenName: 'foo'
    }} onGetTweetCollection={() => { }} />);
  });

  it('should to be rendered', () => {
    expect(wrapper.exists()).toEqual(true);
  });

});