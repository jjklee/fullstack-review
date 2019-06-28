import React from 'react';

const Repos = (props) => (
  <div>
  <a href={`${props.url}`}>{props.repo}</a>
  </div>
)

export default Repos;