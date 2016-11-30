import React, { Component } from 'react';
import { Link } from 'react-router';

class Blog extends Component {
  render() {
    return (
      <div>
        <div className="post p2 p-responsive wrap" role="main">
          <div className="measure">
            <div className="home">
              <div className="posts">
                <div className="post py3">
                  <p className="post-meta">Oct 26, 2016</p>
                  <Link to={`/post/testpost`} className="post-link"><h3 className="h1 post-title">Lets Make A Chrome Extension</h3></Link>
                  <p className="post-summary">
                      An introduction to extension programming wherein we make a torrent scrapping chrome extension !
                  </p>
                </div>
              </div>
              <div className="pagination clearfix mb1 mt4">
                <div className="left">
                  <span className="pagination-item disabled">Newer</span>
                </div>
                <div className="right">
                  <a className="pagination-item" href="/page2">Older</a>
                </div>
              </div>
            </div>
          </div>
        </div>


      {this.props.children}
      </div>
    );
  }
}

export default Blog;
