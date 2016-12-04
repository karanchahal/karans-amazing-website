import React, { Component } from 'react';
import { Link } from 'react-router';
import LoadingBar from './LoadingBar'
import Blog from './Blog'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts:[]
    }

    this.getPosts = this.getPosts.bind(this)
  }

  getPosts(data) {
    this.state.posts = data
    console.log(this.state.posts)
  }



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
        { React.cloneElement(this.props.children, {getPosts: this.getPosts}) }

      </div>
    );
  }
}

export default Header;
