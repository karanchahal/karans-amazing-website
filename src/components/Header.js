import React, { Component } from 'react';
import { Link } from 'react-router';



class Header extends Component {
  render() {
    return (
      <div>
        <h1>Main App</h1>
        <div>
          <Link to={`/blog`}>Blog</Link>
        </div>
        <div>
          <Link to={`/projects`}>Projects</Link>
        </div>
        <div>
          <Link to={`/about`}>About</Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Header;
