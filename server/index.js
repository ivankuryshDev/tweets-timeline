const express = require('express');
const path = require('path');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const crypto = require('crypto');
const oauthSignature = require('oauth-signature');

const PORT = process.env.PORT || 5000;
const app = express();

// priority serve any static files
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// answer API requests
app.get('/api', (req, res) => {
  res.set('Content-Type', 'application/json');

  // consumer keys and access tokes
  const consumerKey = 'JPX4ELItftoilsoq4bFquPBDZ';
  const consumerSecret = 'KtoIZ9XsNWY9CoZ52n8Tlh3JkbHqIbVtOoQAj9JvK8UTtFbvuc';
  const accessToken = '1149412668610138112-xxHmn6HPnSF5dQ4bNriuH82sI6l2CT';
  const accessTokenSecret = 'kTlCwfuvPv323SeEKUoQ1B7Lp0EHuww9z1rNUQeYigMQj';

  // request options
  const methodVerb = 'GET';
  const methodUrl = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
  const screenName= 'SpaceX';
  const count = 2;
  const tweetMode = 'extended';

  // parameters for the authorisation header
  const oauthConsumerKey = consumerKey;
  const oauthToken = accessToken;
  const oauthNonce = crypto.randomBytes(64).toString('hex');
  const oauthTimestamp = Math.floor((new Date).getTime()/1000);
  const oauthSignatureMethod = 'HMAC-SHA1';
  const oauthVersion = '1.0'

  const parameters = {
    oauth_consumer_key: oauthConsumerKey,
    oauth_token: oauthToken,
    oauth_nonce: oauthNonce,
    oauth_timestamp: oauthTimestamp,
    oauth_signature_method: oauthSignatureMethod,
    oauth_version: oauthVersion,
    screen_name: screenName,
    count: count,
    tweet_mode: tweetMode
  };

  // generate an OAuth 1.0a HMAC-SHA1 signature for a HTTP request
  const __oauthSignature = oauthSignature.generate(methodVerb, methodUrl, parameters, consumerSecret, accessTokenSecret);

  // authorisation header
  let oauthHeader = 'OAuth ';
  oauthHeader += `oauth_consumer_key="${oauthConsumerKey}", `;
  oauthHeader += `oauth_nonce="${oauthNonce}", `;
  oauthHeader += `oauth_signature="${__oauthSignature}", `;
  oauthHeader += `oauth_signature_method="${oauthSignatureMethod}", `;
  oauthHeader += `oauth_timestamp="${oauthTimestamp}", `;
  oauthHeader += `oauth_token="${oauthToken}", `;
  oauthHeader += `oauth_version="${oauthVersion}"`;

  // make a request to Twitter
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      res.status(this.status).send(parseTweetTimeline(this.responseText));
      // res.status(this.status).send(this.responseText);

      console.log('> Twitter Response: OK');
      console.log('> ', JSON.parse(this.responseText));
      // console.log('>>', parseTweetTimeline(this.responseText));
    } else if (this.readyState === 4) {
      res.status(this.status).send('{"TwitterResponse": "Fail"}');
      
      console.log('> responseText', this.responseText);
      console.log('> Twitter Response: Fail');
    }
  };

  xhttp.open(methodVerb, `${methodUrl}?count=${count}&screen_name=${screenName}&tweet_mode=${tweetMode}`, true);
  xhttp.setRequestHeader('Authorization', oauthHeader); // set the authorisation header
  xhttp.send();

  console.log('> Twitter Request: OK');
});

// all remaining requests return the React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

// listen on port
app.listen(PORT, function () {
  console.log(`Node server is listening on port ${PORT}...`);
});

// parse a tweet timeline collection
const parseTweetTimeline = (tweetTimeline) => {
  const parsedTweets = [];
  tweetTimeline = JSON.parse(tweetTimeline);

  tweetTimeline.forEach((element) => {
    const tweet = {};

    // user data
    tweet.name = element.user.name;
    tweet.screenName = element.user.screen_name;
    tweet.profileImageUrlHttps = element.user.profile_image_url_https;
    tweet.profileBannerUrl = element.user.profile_banner_url;

    if (element.entities.user_mentions[0]) {
      tweet.mentionedName = element.entities.user_mentions[0].name;
      tweet.mentionedScreenName = element.entities.user_mentions[0].screen_name;
    }

    // tweet data
    tweet.text = element.full_text;
    tweet.created_at = element.created_at;

    parsedTweets.push(tweet);
  });

  return parsedTweets;
}