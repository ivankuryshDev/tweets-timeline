import React, { Component } from 'react';

import './Body.css';
import Tweet from './Tweet/Tweet';

class Body extends Component {

  render() {
    const timeline = this.props.timeline;

    return (
      <div className="Body">
        {timeline.map(tweet =>
          <Tweet key={tweet.id} data={tweet} />
        )}
      </div>
    );
  }
}

export default Body;