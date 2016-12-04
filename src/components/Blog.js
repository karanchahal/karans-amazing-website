import _ from 'lodash';
import React, { Component } from 'react';
import BlogListItem from './BlogListItem'
import axios from 'axios'

class Blog extends Component {


  constructor(props) {
    super(props);

    this.state= {
      posts : []
    };
  }

  componentWillMount() {
    axios.get('http://localhost:3030/media/descriptions.json')
    .then(res => {
      this.props.getPosts(res.data)

      this.setState({posts: res.data})
    })
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
