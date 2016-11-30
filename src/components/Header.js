import React, { Component } from 'react';
import { Link } from 'react-router';



class Header extends Component {
  render() {
    return (
      <div>
        <div className="ui three item menu">
          <Link to={`/blog`} className="active item">
            Blog
          </Link>
          <Link to={`/projects`} className="item">
            Projects
          </Link>
          <Link to={`/about`} className="item">
            About
          </Link>

        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Header;
