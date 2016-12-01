import _ from 'lodash';
import React, { Component } from 'react';

import BlogListItem from './BlogListItem'
const posts = [
  {
    description: "An introduction to extension programming wherein we make a torrent scrapping chrome extension !",
    date: "Oct 26, 2016",
  },
  {
    description: "Something else !",
    date: "Oct 21, 2016",
  }
];

class Blog extends Component {


  constructor(props) {
    super(props);

    this.state= {
      posts
    };
  }

  render() {
    return (
      <div>
        <div className="post p2 p-responsive wrap" role="main">
          <div className="measure">
            <div className="home">
              <div className="posts">
                {this.getPosts()}
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

  getPosts() {
    return _.map(this.state.posts, (post, index) => <BlogListItem key={index} {...post} />);
  }
}



export default Blog;
