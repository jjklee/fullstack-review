const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
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

  request(options, (err, res, data) => {
    if(err) {
      console.error(err);
    } else {
      getData(data, callback)
      // callback(data);
    }
  });
}

let getData = (data, callback) => {
  data = JSON.parse(data);
  let template = {
    repoid: 0,
    reponame: '',
    repourl: '',
    username: '',
    ownerid: 0,
  }

  for(let i = 0; i < data.length; i++) {
    let newtemp = Object.assign({}, template);
    newtemp.repoid = data[i].id;
    newtemp.reponame = data[i].name;
    newtemp.repourl = data[i].clone_url;
    newtemp.username = data[i].owner.login;
    newtemp.ownerid = data[i].owner.id;
    callback(newtemp);
  }

}
module.exports = getReposByUsername;