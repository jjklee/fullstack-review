const express = require('express');
const parser = require('body-parser');
const getReposByUsername = require('../helpers/github.js')
let app = express();
const { save, Repo } = require('../database/index.js');

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  let username = req.body.username;

  //check to see if user exists in database
  Repo.find({ username }, (err, data) => {
    if(err) {
      res.status(404).send('Error getting all data from database');
    } else if (data.length === 0) {
      getReposByUsername(username, (data) => {
        save(data)
      });
      res.status(201).send('Succesfully posted');
    } else {
      res.status(201).send('User already exists');
    }
  })
});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  let username = req.query.username;
  Repo.find({ username }, (err, data) => {
    if(err) {
      res.status(404).send('Error getting all data from database');
    } else {
      res.status(200).send(data)
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

