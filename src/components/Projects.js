import React, { Component } from 'react';

class Projects extends Component {


  componentDidMount() {
    this.props.loadingBar();
  }

  render() {
    return (
      <h1>You are at projects</h1>
    );
  }
}


export default Projects;
