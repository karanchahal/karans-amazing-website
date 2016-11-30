import React, { Component } from 'react';
import { Link } from 'react-router';

class Blog extends Component {
  render() {
    return (
      <div>
      <h1>You are at a blog</h1>
      <h2>Blog Posts</h2>
      <ul>
        <li> <Link to={`/post/testpost`}>This is a test </Link> </li>
      </ul>
      {this.props.children}
      </div>
    );
  }
}

export default Blog;
