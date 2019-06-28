const request = require('request');
const config = require('../config.js');
const { save } = require('../database/index.js');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  //curl -i https://api.github.com/users/technoweenie/repos
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/users/jjklee/repos',
    // url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  console.log('username==', username);
  request(options, (err, res, data) => {
    if(err) {
      console.error(err);
    } else {
      // console.log('^^^', res.body);
      // console.log('===', data);
      save(data)
    }
  });
}

module.exports = {getReposByUsername};