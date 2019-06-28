const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repos: [{
    id: Number,
    name: String
  }],
  ownerlogin: String,
  ownerid: Number,
  repocount: Number,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to the MongoDB
  const newrepo = new Repo ({
    repos: [{
      id: 0,
      name: ''
    }],
    ownerlogin: '',
    ownerid: 0,
    repocount: 0,
  })

  await newrepo.save((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Repo has been saved");
    }
  })
}

module.exports.save = save;