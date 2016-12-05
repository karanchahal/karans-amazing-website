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
    this.loadBar = this.loadBar.bind(this)
  }

  loadBar() {
    let b = this.state.barLength
    this.setState({barLength: b + 80});
    if(this.state.barLength > window.innerWidth+100)
      {
        clearInterval(this.interval);
        this.setState({barLength:0})
      }
  }

  sendPosts(res) {
    let postsTemp = {}
    let postOrderingTemp= []
    res.data.forEach((d,k) => {
      postsTemp[d.filename] = d
      postOrderingTemp.push(d.filename)
    })
    this.setState({posts:postsTemp,postOrdering:postOrderingTemp})
    console.log(postsTemp)
    console.log(postOrderingTemp)
  }
  loadingBar() {

    this.interval = setInterval(this.loadBar,20);
  }

  componentDidMount() {
    this.loadingBar()
  }

  loadBarOrNot() {

    let barStylesLoading = {
      display: 'block',
      height: 4,
      backgroundColor: '#88de88',
      boxShadow: '2px 0px 2px lightgreen',
      width: this.state.barLength,
      position:'fixed'
    }

    return <div style={ barStylesLoading }></div>

  }

  render() {

    return (
      <div>
        {this.loadBarOrNot()}
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
