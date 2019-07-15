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
    if (seconds < 60) { result = seconds + 's' }
    else if (minutes < 60) { result = minutes + 'm' }
    else if (hours < 24) { result = hours + 'h' }
    else { result = `${months[then.getMonth()]} ${then.getDate()}` };

    return result;
  }


  render() {
    const createdAt = this.props.data.createdAt;
    let message = this.props.data.text;
    const isRetweet = this.props.data.isRetweet;

    let name = null;
    let screenName = null;
    let profileImageUrlHttps = null;

    if (isRetweet) {
      name = this.props.data.mentionedName;
      screenName = this.props.data.mentionedScreenName;
      profileImageUrlHttps = this.props.data.mentionedProfileImageUrlHttps;
      message = message.replace(`RT @${screenName}:`, '');
    } else {
      name = this.props.data.name;
      screenName = this.props.data.screenName;
      profileImageUrlHttps = this.props.data.profileImageUrlHttps;
    }

    return (
      <Fragment>
        <div className="Tweet">
          <div className="Tweet__left-bar">
            <img className="Tweet__avatar" src={profileImageUrlHttps} alt="avatar" />
          </div>
          <div className="Tweet__right-bar">
            <div className={isRetweet ? 'Tweet__retweet' : 'Tweet__retweet Tweet__retweet--hidden'}>
              <span className="Tweet__retweet-mark">Retweet</span>
            </div>
            <div className="Tweet__tweet-info">
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