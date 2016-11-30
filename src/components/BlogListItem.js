import React, { Component } from 'react';
import { Link } from 'react-router';
class Projects extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.date);
    return (

      <div className="post py3">
        <p className="post-meta">{this.props.date}</p>
        <Link to={`/post/testpost`} className="post-link"><h3 className="h1 post-title">Lets Make A Chrome Extension</h3></Link>
        <p className="post-summary">
            {this.props.description}
        </p>
      </div>
    );
  }
}


export default Projects;
