import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';

import './App.css';
import './css/button-filled.css';
import './css/loader.css';
import Header from './components/Header/Header';
import Body from './components/Body/Body';

const DEFAULT_SCREEN_NAME = 'barackobama';
const COUNT_NEW_TWEETS = 10;

class App extends Component {
  state = {
    timeline: [],
    user: {
      name: 'Loading...',
      screenName: 'Loading...'
    },
    modal: false,
    error: ''
  };

  countTweets = COUNT_NEW_TWEETS;

  // toggle a modal
  toggleModal = () => {
    if (this.state.modal) {
      this.setState({ error: '' });
    }

    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  // get a collection of tweets
  getTweetCollection = (screenName, load) => {

    // hide the twitter icon and show the loader
    document.getElementsByClassName('twitter-icon')[0].classList.add('twitter-icon--hidden');
    document.getElementsByClassName('loader')[0].classList.remove('loader--hidden');

    const App = this;
    const xhttp = new XMLHttpRequest();

    const method = 'GET';
    const url = '/api';

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {

        if (load) {
          window.scrollTo(0, 0); // scroll to top of the page if a new timeline has been loaded
        }

        App.setState({
          user: {
            screenName: JSON.parse(this.response)[0].screenName,
            name: JSON.parse(this.response)[0].name
          },
          timeline: JSON.parse(this.response)
        });

        console.log('> Response: OK');
        console.log('> ', JSON.parse(this.response));
        // document.getElementById('app').innerText = JSON.parse(this.response);

        // hide the loader and show the twitter icon
        document.getElementsByClassName('loader')[0].classList.add('loader--hidden');
        document.getElementsByClassName('twitter-icon')[0].classList.remove('twitter-icon--hidden');

      } else if (this.readyState === 4) {
        console.error('> Response: Fail');
        console.log(JSON.parse(this.responseText));
        if (JSON.parse(this.responseText).errors) {
          App.setState({ error: JSON.parse(this.responseText).errors[0].message });
        } else {
          App.setState({ error: JSON.parse(this.responseText).error });
        }
        App.toggleModal();

        // hide the loader and show the twitter icon
        document.getElementsByClassName('loader')[0].add('loader--hidden');
        document.getElementsByClassName('twitter-icon')[0].remove('twitter-icon--hidden');
      }
    };

    if (load) {
      App.countTweets = COUNT_NEW_TWEETS; // scroll to top of the page if a new timeline has been loaded
    }

    xhttp.open(method, url + `?screenName=${screenName}&countTweets=${this.countTweets}`, true);
    xhttp.send();

    console.log('> Request: OK');
  }

  componentDidMount() {
    const App = this;

    // get a tweet timeline after the app has been started
    this.getTweetCollection(DEFAULT_SCREEN_NAME);

    // load new weets if the end of the page has been reached
    window.addEventListener('scroll', event => {
      const bodyElement = document.getElementsByTagName('html')[0];

      if (Math.floor(bodyElement.scrollHeight - bodyElement.scrollTop) === bodyElement.clientHeight) {
        console.log('> Reached the end of the page');
        App.countTweets += COUNT_NEW_TWEETS;
        App.getTweetCollection(this.state.user.screenName, false);
      }
    });
  }

  render() {

    return (
      <div className="App" id="app">
        <Header user={this.state.user} onGetTweetCollection={this.getTweetCollection} />
        <Body timeline={this.state.timeline} onGetTweetCollection={this.getTweetCollection} />
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="modal" centered>
          <ModalHeader className="modal__header d-flex justify-content-center" toggle={this.toggle}>{this.state.error}</ModalHeader>
          <ModalFooter className="modal__footer d-flex justify-content-center">
            <Button className="button--filled" onClick={this.toggleModal}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default App;
