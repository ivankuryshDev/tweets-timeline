import React, { Component, Fragment } from 'react';

import './Tweet.css';

class Tweet extends Component {
  mentionedNames = [];

  // convert a time label into a readable format
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
      if (document.getElementById(element.id)) {
        document.getElementById(element.id).addEventListener('click',
          () => this.props.onGetTweetCollection(element.name, true));
      }
    }
  }

  // do not update the tweet component if a time labe is not changed
  shouldComponentUpdate(nextProps, nextState) {
    if (this.msToTime(nextProps.createdAt) === this.msToTime(this.props.data.createdAt)) {
      return false;
    } else { return true }
  }

  render() {
    const createdAt = this.props.data.createdAt;
    const isRetweet = this.props.data.isRetweet;
    let message = this.props.data.text;

    const handledMessage = [];
    const punctuationMarks = ['.', ',', '!', '?', '\'', '’', '"', ':', ';'];

    let name = null;
    let screenName = null;
    let profileImageUrlHttps = null;

    // check if it is either a tweet or a retweet
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

    // make an array of the words from the tweet 
    message = message.split(' ');

    // handle all entities
    for (let i = 0; i < message.length; i++) {
      const idWord = this.props.data.id + i;
      const idMentionedName = idWord + '_link';

      // check if the word is a mentioned name
      if (message[i][0] === '@') {
        let atName = message[i];
        let rest = '';
        let name = atName.replace('@', '');

        // check if a mentioned name has a punctuation mark in the end
        for (let j = 0; j < punctuationMarks.length; j++) {
          const index = message[i].indexOf(punctuationMarks[j]);
          if (index > -1) {
            atName = message[i].substring(0, index);
            rest = message[i].substring(index, message[i].length);
            name = atName.replace('@', '');
          }
        }

        // write a mentioned name and its id to add an event listener 
        this.mentionedNames.push({
          name: name,
          id: idMentionedName
        });

        handledMessage.push(
          <Fragment key={idWord}>
            <span id={idMentionedName} className="Tweet__mentioned-name">{atName}</span>{rest + ' '}
          </Fragment>);
      } else if (message[i][0] === '#') { // check if the word is a hashtag
        let hashTag = message[i];
        let rest = '';

        // check if a hashtag has a punctuation mark in the end
        for (let j = 0; j < punctuationMarks.length; j++) {
          const index = message[i].indexOf(punctuationMarks[j]);
          if (index > -1) {
            hashTag = message[i].substring(0, index);
            rest = message[i].substring(index, message[i].length);
          }
        }

        handledMessage.push(
          <Fragment key={idWord}>
            <span style={{
              color: 'var(--color-twitter-primary-dark)'
            }}>{hashTag}</span>{rest + ' '}
          </Fragment>);
      } else if (message[i].includes('https')) { // hightlight all media links
        const index = message[i].indexOf('http');
        const prefix = message[i].substring(0, index);
        const link = message[i].substring(index, message[i].length);

        handledMessage.push(
          <Fragment key={idWord}>
            {prefix}
            <span style={{
              color: 'var(--color-twitter-primary-dark)'
            }}>{link.replace('https://', '')}</span>{' '}
          </Fragment>);
      } else {
        // message[i] is an ordinary word
        handledMessage.push(
          <Fragment key={idWord}>
            {message[i]}{' '}
          </Fragment>);
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
            return element;
          })}
        </div>
      </div>
    );
  }
}

export default Tweet;