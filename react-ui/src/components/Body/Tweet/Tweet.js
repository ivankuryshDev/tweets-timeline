import React, { Component, Fragment } from 'react';

import './Tweet.css';

class Tweet extends Component {

  // convert ms to secs, mins or hours
  msToTime = (createdAt) => {
    const months = ["Jan", "Feby", "Mar", "Apr",
      "May", "Jun", "Jul", "Aug",
      "Sept", "Oct", "Nov", "Dec"];

    const now = new Date();
    const then = new Date(createdAt);
    const duration = now.getTime() - then.getTime();

    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(duration / 60);

    let result = null;
    if (seconds < 60) {result = seconds + 's' }
    else if (minutes < 60) { result = minutes + 'm' }
    else if (hours < 24) { result = hours + 'h' }
    else { result = `${months[then.getMonth()]} ${then.getDate()}` };

    console.log('result', result);

    return result;
  }


  render() {
    const name = this.props.data.name;
    const screenName = this.props.data.screenName;
    const createdAt = this.props.data.createdAt;
    const profileImageUrlHttps = this.props.data.profileImageUrlHttps;
    const message = this.props.data.text;



    return (
      <Fragment>
        <div className="Tweet">
          <div className="Tweet__left-bar">
            <img className="Tweet__avatar" src={profileImageUrlHttps} alt="avatar" />
          </div>
          <div className="Tweet__right-bar">
            <div className="Tweet__heading">
              <span className="Tweet__name">{name}</span>
              <span className="Tweet__screen-name">@{screenName}</span>
              <span className="Tweet__date-creation">{this.msToTime(createdAt)}</span>
            </div>
            {message}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Tweet;