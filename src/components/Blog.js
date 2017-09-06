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
    //this.props.loadingBar()
    axios.get('http://ec2-13-58-121-196.us-east-2.compute.amazonaws.com:3030/media/descriptions.json')
    .then(res => {
      this.setState({posts: res.data})
      this.props.sendPosts(res)
    })
  }

  componentDidMount() {
    //this.props.loadBarTrue()
  }

  componentWillUnmount() {
  //  this.interval = setInterval(this.props.loadBarTrue(),800)

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
