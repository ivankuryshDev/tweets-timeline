import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Tweet from './Tweet';

configure({ adapter: new Adapter() });

describe('<Tweet />', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Tweet data={
      {
        createdAt: 'to',
        id: 'foo',
        isRetweet: 'false',
        name: 'foo',
        profileBannerUrl: 'foo',
        profileImageUrlHttps: 'normal',
        mentionedProfileImageUrlHttps: 'normal',
        screenName: "foo",
        text: 'foo'
      }} onGetTweetCollection={() => {}} />);
  });

  it('should to be rendered', () => {
    expect(wrapper.exists()).toEqual(true);
  });
});