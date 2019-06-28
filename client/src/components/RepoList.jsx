import React from 'react';
import Repos from './Repos.jsx';

const RepoList = (props) => (
  <div>
    <h4>There are {props.repos.length} repos.</h4>
    {props.repos.map((repo, key) => (
      <Repos repo={repo} key={key} />
    ))}
  </div>
)

export default RepoList;