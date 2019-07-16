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
    const hours = Math.floor(minutes / 60);

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
      profileImageUrlHttps = this.props.data.mentionedProfileImageUrlHttps.replace('normal', 'bigger');
    } else {
      name = this.props.data.name;
      screenName = this.props.data.screenName;
      profileImageUrlHttps = this.props.data.profileImageUrlHttps.replace('normal', 'bigger');
    }

    message = message.split(' ');
    const punctuationMarks = ['', '.', ',', '!', '?', "'", '"'];

    for (let i = 0; i < message.length; i++) {

      // remove all media links
      if (message[i].includes('http', 0)) {
        message[i] = '';
      }

      // hightlight hashtags
      punctuationMarks.forEach(element => {
        if (message[i][0] === '#') {
          message[i] = <Fragment>
            <span style={{ color: 'var(--color-twitter-primary-dark)' }}>{message[i]}</span>{element}
          </Fragment>;
        }
      });

      // hightlight mentioned people
      punctuationMarks.forEach(element => {
        if (message[i][0] === '@') {
          message[i] = (
            <Fragment>
              <span style={{ color: 'var(--color-twitter-primary-dark)' }}>{message[i]}</span>{element}
            </Fragment>);
        }
      });
    }


    // console.log('message', message);

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
            {message.map(element => {
              return <Fragment key={Math.random()}>{element} </Fragment>;
            })}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Tweet;