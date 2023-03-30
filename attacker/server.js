const path = require('path');
const express = require('express');

const app = express();

app.use('/static', express.static(path.resolve('attacker')));

app.get('/', function (req, res) {
  const indexFile = path.resolve('attacker', 'index.html');
  res.sendFile(indexFile);
});

app.listen(8081, function () {
  console.log('Express server is running on port 8080');
});
