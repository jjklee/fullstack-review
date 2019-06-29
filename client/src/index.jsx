import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
    }

    this.getRepos = this.getRepos.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.getRepos()
  }

  search (username) {
    console.log(`${username} was searched`);
    axios
      .post('/repos', {
        username
      })
      .then(() => {
        this.getRepos(username);
        // console.log('Sucessfully searched');
      })
      .catch(err => console.error('Error posting data'));
  }

  getRepos(username) {
    axios
      .get('/repos', { params: {username}})
      .then(data => {
        console.log('===', data)
        return this.updateState(data);
      })
      .then(repos => {
        this.setState({ repos });
      })
      .catch(err => console.error('Error getting data'))
  }

  updateState({data}) {
    let len = 25;
    if (data.length < 25) {
      len = data.length;
    }
    let repos = []
    for(let i = 0; i < len; i++) {
      let singleRepo = {};
      singleRepo.reponame = data[i].reponame;
      singleRepo.repourl = data[i].repourl;
      repos.push(singleRepo)
    }
    return repos;
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));