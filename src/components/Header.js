import React, { Component } from 'react';
import { Link } from 'react-router';



class Header extends Component {

  constructor(props) {
     super(props)

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

        {this.props.children}

      </div>
    );
  }
}

class LoadingBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      barLength: 0
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

   handleScroll(e) {
     let length = ( window.scrollY/ (document.documentElement.scrollHeight - window.innerHeight)) * window.innerWidth;
     this.setState({ barLength: length})
   }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

   render() {

     let barStyles = {
       display: 'block',
       height: 4,
       backgroundColor: '#88de88',
       boxShadow: '2px 0px 2px lightgreen',
       width: this.state.barLength,
       position:'fixed'
     }

     return <div style={ barStyles }></div>
   }

}

export default Header;
