# Tweets Timeline

An app displays a user's tweet timeline using a [Node backend](https://github.com/nodejs/node) (server for API, proxy, & routing) with the [React frontend](https://github.com/facebookincubator/create-react-app).

* :video_game: [How to use the Tweets Timeline app](#how-to-use-the-tweets-timeline-app)
* :microscope: [How does the app work](#how-does-the-app-work)
* :rocket: [How to run it locally](#how-to-run-it-locally)
* :heavy_check_mark: [How to test](#how-to-test)
* :pushpin: [How to deploy the app to Heroku](#how-to-deploy-the-app-to-heroku)

## How to use the Tweets Timeline app

### Use an input field

Input a username of the person into a search field, either click a search button or hit the Enter and get a person's tweets timeline. Letter case does not matter.

### Use links

Click on either a name of a tweet's author or a mentioned name (starts with **@**) and go to their tweets timeline.

## How does the app work

1. The React client creates a GET request and sends it to the Node server.
2. The Node server handles the GET request, creates an [Authorization header](https://developer.twitter.com/en/docs/basics/authentication/guides/authorizing-a-request.html) and sends a new request to Twitter's API using [OAuth 1.0a protocol](https://tools.ietf.org/html/rfc5849).
3. The Node server gets a collection of [tweet objects](https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/tweet-object.html) from Twitter's API, parses them and returns a result to the React client.
4. The React client gets an array of parsed twitter objects and renders components using them.

## How to run it locally
Since the app is a combo of two npm projects, there are two places to run `npm` commands:

1. **Node API server** at the root `./`
1. **React UI** in `react-ui/` directory.

### Run the API server

In a terminal:

```bash
# Initial setup
npm install

# Start the server
npm start
```
### Run the React UI

In a separate terminal from the API server, start the UI:

```bash
# Go to the React part
cd react-ui/

# Initial setup
npm install

# Start the server
npm start
```

## How to test

In a terminal:

```bash
cd tweets-timeline/
npm test
```

## How to deploy the app to Heroku

```bash
cd tweets-timeline/
heroku create
git push heroku master
```

This deployment will automatically:

  * detect [Node buildpack](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-nodejs)
  * build the app with
    * `npm install` for the Node server
    * `npm run build` for create-react-app
  * launch the web process with `npm start`
    * serves `../react-ui/build/` as static files
    * customize by adding API, proxy, or route handlers/redirectors
