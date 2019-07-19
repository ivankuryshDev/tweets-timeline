import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Body from './Body';

configure({ adapter: new Adapter() });

describe('<Body />', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Body timeline={
      [{
        createdAt: 'to',
        id: 'foo',
        isRetweet: 'false',
        name: 'foo',
        profileBannerUrl: 'foo',
        profileImageUrlHttps: 'foo',
        screenName: "foo",
        text: 'foo'
      }]
    } />);
  });

  it('should to be rendered', () => {
    expect(wrapper.exists()).toEqual(true);
  });
});