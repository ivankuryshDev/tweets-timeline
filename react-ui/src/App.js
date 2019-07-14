import React, { Component } from 'react';

import './App.css';
import Header from './components/Header/Header';

class App extends Component {
  state = {
    user: {
      name: '',
      screenName: ''
    }
  };

  componentDidMount() {
    // use AJAX to get a data from the server

    const App = this;
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log('> Response: OK');
        console.log('> ', JSON.parse(this.response));

        App.setState({ timeline: JSON.parse(this.response) });
        App.setState({ user: {
          name: JSON.parse(this.response)[0].name,
          screenName: JSON.parse(this.response)[0].screenName,
        } });
        // document.getElementById('app').innerText = JSON.parse(this.response);
      } else if (this.readyState === 4) {
        console.error('> Response: Fail');
      }
    };

    xhttp.open("GET", "/api", true);
    xhttp.send();

    console.log('> Request: OK');
  }

  render() {

    return (
      <div className="App" id="app">
        <Header user={this.state.user} />
        Hello World!
      </div>
    );
  }
}

export default App;
