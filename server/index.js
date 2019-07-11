const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000;
const app = express();

// priority serve any static files
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// answer API requests
app.get('/api', (req, res) => {
  res.set('Content-Type', 'application/json');
  const random = Math.random();
  res.status(200).send(`{"randomNumber": ${random}}`);

  console.log('> Respons has been sent');
});

// all remaining requests return the React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function() {
  console.log(`Node server is listening on port ${PORT}...`);
});