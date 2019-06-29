const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (err, res, data) => {
    if(err) {
      console.error(err);
    } else {
      formatData(data, callback)
    }
  });
}

let formatData = (data, callback) => {
  data = JSON.parse(data);

  for(let i = 0; i < data.length; i++) {
    let newtemp = {};
    newtemp.repoid = data[i].id;
    newtemp.reponame = data[i].name;
    newtemp.repourl = data[i].clone_url;
    newtemp.username = data[i].owner.login;
    newtemp.ownerid = data[i].owner.id;
    callback(newtemp);
  }
}

module.exports = getReposByUsername;