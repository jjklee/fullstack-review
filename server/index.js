const express = require('express');
const parser = require('body-parser');
const {getReposByUsername} = require('../helpers/github.js')
let app = express();
// const save = require('../database/index.js');

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let username = req.body.username;
  let data = getReposByUsername(username);

  res.status(201).send('Succesfully posted repo');
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

