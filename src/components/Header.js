import React, { Component } from 'react';
import { Link } from 'react-router';
import LoadingBar from './LoadingBar'
import Blog from './Blog'
import axios from 'axios'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts:{}
    }
    this.sendPosts = this.sendPosts.bind(this)
  }

  sendPosts(res) {
    res.data.forEach((d,k) => {
      this.state.posts[d.filename] = d
    })
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
        { React.cloneElement(this.props.children, {sendPosts: this.sendPosts,posts:this.state.posts}) }
      </div>
    );
  }
}

export default Header;
