import React, { Component, Fragment } from 'react';

import './Tweet.css';

class Tweet extends Component {
  mentionedNames = [];

  // convert a time creation of the tweet into an easy readable format
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

  componentDidMount() {
    // create a new listener for loading of a mentioned user's timeline
    for (let i = 0; i < this.mentionedNames.length; i++) {
      const element = this.mentionedNames[i];
      document.getElementById(element.id).addEventListener('click',
        () => this.props.onGetTweetCollection(element.name, true));
    }
  }

  // do not update the tweet component, it is immutible
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    const createdAt = this.props.data.createdAt;
    const isRetweet = this.props.data.isRetweet;
    let message = this.props.data.text;

    let name = null;
    let screenName = null;
    let profileImageUrlHttps = null;

    // check if it is a tweet or retweet
    if (isRetweet) {
      name = this.props.data.mentionedName;
      screenName = this.props.data.mentionedScreenName;
      profileImageUrlHttps = this.props.data.mentionedProfileImageUrlHttps.replace('normal', 'bigger');
    } else {
      name = this.props.data.name;
      screenName = this.props.data.screenName;
      profileImageUrlHttps = this.props.data.profileImageUrlHttps.replace('normal', 'bigger');
    }

    const idTweetAuthor = Math.random();
    this.mentionedNames.push({
      name: screenName,
      id: idTweetAuthor
    });

    // make from the tweet an array of the words
    message = message.split(' ');

    const handledMessage = [];
    const punctuationMarks = ['.', ',', '!', '?', '\'', '’', '"', ':', ';'];

    for (let i = 0; i < message.length; i++) {

      // check if this word is a mentioned name
      if (message[i][0] === '@') {
        // message[i] = atName + rest
        // atName = @ + name
        let atName = message[i];
        let rest = '';
        let name = atName.replace('@', '');

        for (let j = 0; j < punctuationMarks.length; j++) {
          const index = message[i].indexOf(punctuationMarks[j]);
          if (index > -1) {
            atName = message[i].substring(0, index);
            rest = message[i].substring(index, message[i].length);
            name = atName.replace('@', '');
          }
        }

        const id = Math.random();
        this.mentionedNames.push({
          name: name,
          id: id
        });

        handledMessage.push(
          <Fragment>
            <span id={id} className="Tweet__mentioned-name">{atName}</span>{rest}
          </Fragment>
        );

      } else if (message[i][0] === '#') { // check if this word is a hashtag
        // message[i] = hashTag + rest
        let hashTag = message[i];
        let rest = '';

        for (let j = 0; j < punctuationMarks.length; j++) {
          const index = message[i].indexOf(punctuationMarks[j]);
          if (index > -1) {
            hashTag = message[i].substring(0, index);
            rest = message[i].substring(index, message[i].length);
          }
        }

        handledMessage.push(
          <Fragment>
            <span style={{
              color: 'var(--color-twitter-primary-dark)'
            }}>{hashTag}</span>{rest}
          </Fragment>
        );
      } else if (message[i].includes('https')) { // hightlight all media links
        const index = message[i].indexOf('http');
        const prefix = message[i].substring(0, index);
        const link = message[i].substring(index, message[i].length);

        handledMessage.push(
          <Fragment>
            {prefix}
            <span style={{
              color: 'var(--color-twitter-primary-dark)'
            }}>{link.replace('https://', '')}</span>
          </Fragment>);
      }
      else {
        handledMessage.push(message[i]);
      }
    }

    return (
      <div className="Tweet">
        <div className="Tweet__left-bar">
          <img className="Tweet__avatar" src={profileImageUrlHttps} alt="avatar" />
        </div>
        <div className="Tweet__right-bar">
          <div className={isRetweet ? 'Tweet__retweet' : 'Tweet__retweet Tweet__retweet--hidden'}>
            <span className="Tweet__retweet-mark">Retweet</span>
          </div>
          <div className="Tweet__tweet-info">
            <span className="Tweet__name" id={idTweetAuthor}>{name}</span>
            <span className="Tweet__screen-name">@{screenName}</span>
            <span className="Tweet__date-creation">{this.msToTime(createdAt)}</span>
          </div>
          {handledMessage.map(element => {
            return <Fragment key={Math.random()}>{element} </Fragment>;
          })}
        </div>
      </div>
    );
  }
}

export default Tweet;