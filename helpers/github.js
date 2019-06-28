const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  let data;
  //curl -i https://api.github.com/users/technoweenie/repos
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  username = 'technoweenie';
  let options = {
    url: 'https://api.github.com/users/' + technoweenie + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  axios(options);
    .then(response => {
      data = response.data
    })
    .catch(err => {
      console.log(err);
    })
 //return data from the request
 return data;
}

module.exports.getReposByUsername = getReposByUsername;