import React from 'react';

import './App.css';

function App() {
  
  // use AJAX to get a data from the server
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      console.log('> Response: OK');
      console.log('> ', JSON.parse(this.response).randomNumber);

      document.getElementById('app').innerText = JSON.parse(this.response).randomNumber;
    } else if (this.readyState === 4) {
      console.log('> Response: Fail');
    }
  };

  xhttp.open("GET", "/api", true);
  xhttp.send();
  console.log('> Request: OK');

  return (
    <div className="App" id="app">
      Hello World!
    </div>
  );
}

export default App;
