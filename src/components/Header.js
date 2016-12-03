import React, { Component } from 'react';
import { Link } from 'react-router';
import LoadingBar from './LoadingBar'


class Header extends Component {


  render() {


    return (

      <div>

        <LoadingBar />
        <header className="site-header px2 px-responsive">
          <div className="mt2 wrap">
            <div className="measure">
              <Link to={`/blog`} className="site-title">Karans Blog</Link>
              <nav className="site-nav">
                <Link to={`/about`}>About Me</Link>
                <Link to={`/projects`}>Projects</Link>
              </nav>
              <div className="clearfix"></div>
            </div>
          </div>

        </header>

        {this.props.children}

      </div>
    );
  }
}

export default Header;
