import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';

import './App.css';
import './css/button-filled.css';
import Header from './components/Header/Header';
import Body from './components/Body/Body';

const DEFAULT_SCREEN_NAME = 'SpaceX';
const DEFAULT_MESSAGE = 'Loading...';

class App extends Component {
  state = {
    timeline: [],
    user: {
      name: DEFAULT_MESSAGE,
      screenName: DEFAULT_MESSAGE
    },
    modal: false,
    error: ''
  };


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
  getTweetCollection = (screenName) => {
    const App = this;
    const xhttp = new XMLHttpRequest();

    const method = 'GET';
    const url = '/api';

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        App.setState({ timeline: JSON.parse(this.response) });
        App.setState({
          user: {
            name: JSON.parse(this.response)[0].name,
            screenName: JSON.parse(this.response)[0].screenName,
          }
        });

        console.log('> Response: OK');
        console.log('> ', JSON.parse(this.response));
        // document.getElementById('app').innerText = JSON.parse(this.response);

      } else if (this.readyState === 4) {
        console.error('> Response: Fail');
        console.log(JSON.parse(this.responseText).errors[0].message);
        App.setState({ error: (JSON.parse(this.responseText).errors[0].message) });
        App.toggleModal();
      }
    };

    xhttp.open(method, url + `?screenName=${screenName}`, true);
    xhttp.send();

    console.log('> Request: OK');
  }

  componentDidMount() {
    // get a tweet timeline after the app has been started
    this.getTweetCollection(DEFAULT_SCREEN_NAME);
  }

  render() {

    return (
      <div className="App" id="app">
        <Header user={this.state.user} onGetTweetCollection={this.getTweetCollection} />
        <Body timeline={this.state.timeline} />
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
