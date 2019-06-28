const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repoid: { type : Number , unique : true },
  reponame: { type : String , unique : true},
  repourl: { type : String , unique : true},
  username: String,
  ownerid: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // TODO: Your code here
  console.log('====', data);
  // This function should save a repo or repos to the MongoDB
  const newrepo = new Repo ({
    repoid: data.repoid,
    reponame: data.reponame,
    repourl: data.repourl,
    username: data.username,
    ownerid: data.ownerid
  })

  newrepo.save((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Repo has been saved");
    }
  })
}

module.exports = { save, Repo };