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
      username: ''
    }

    this.getRepos = this.getRepos.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.getRepos()
  }

  search (username) {
    console.log(`${username} was searched`);
    // TODO
    this.setState({ repos: [] });
    axios
      .post('/repos', {
        username: username
      })
      .then(data => {
        console.log('Sucessfully searched');
      })
      .catch(err => console.error('Error posting data'));
  }

  getRepos() {
    axios
      .get('/repos')
      .then(data => {
        return this.updateState(data);
      })
      .then(repos => {
        this.setState({ repos });
      })
      .catch(err => console.error('Error getting Data'))
  }

  updateState({data}) {
    let len = 25;
    if (data.length < 25) {
      len = data.length;
    }

    let repos = []
    for(let i = 0; i < len; i++) {
      repos.push(data[i].reponame)
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