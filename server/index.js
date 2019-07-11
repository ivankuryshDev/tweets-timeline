const express = require('express');

const PORT = process.env.PORT || 5000;

const app = express();

app.get('/api', (req, res) => {
  res.set('Content-Type', 'application/json');
  const random = Math.random();
  res.status(200).send(`{"randomNumber": ${random}}`);
  // res.status(200).send(`{"randomNumber": "Hello there!"}`);
  console.log('> Respons has been sent');
});

app.listen(PORT, function() {
  console.log(`Node server is listening on port ${PORT}...`);
});