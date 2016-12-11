import React, { Component } from 'react';
import { Link } from 'react-router';
import LoadingBar from './LoadingBar'


class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts:{},
      postOrdering:[],
      barLength:0
    }
    this.sendPosts = this.sendPosts.bind(this)

  }

  sendPosts(res) {
    let postsTemp = {}
    let postOrderingTemp= []
    res.data.forEach((d,k) => {
      postsTemp[d.filename] = d
      postOrderingTemp.push(d.filename)
    })
    this.setState({posts:postsTemp,postOrdering:postOrderingTemp})

  }



  render() {

    return (
      <div>
      
        <LoadingBar />
        <header className="site-header px2 px-responsive">
          <div className="mt2 wrap">
            <div className="measure">

              <Link to={`/`} className="site-title">Karans Website</Link>
              <nav className="site-nav">
                <Link to={`/blog`}>Blog</Link>
                <Link to={`/projects`}>Projects</Link>
              </nav>
              <div className="clearfix"></div>
            </div>
          </div>

        </header>
        { React.cloneElement(this.props.children, {sendPosts: this.sendPosts,posts:this.state.posts,postOrdering:this.state.postOrdering}) }
      </div>
    );
  }
}

export default Header;
