import React, { Component } from 'react';
import { Link } from 'react-router';



class Header extends Component {

  renderLengthBar() {
    let barStyles = {
      display: 'block',
      height: 4,
      backgroundColor: '#88de88',
      boxShadow: '2px 0px 2px lightgreen',
      width: 100,
      position:'fixed'
    }
    console.log('yas')
    console.log(this.props.location.pathname)

    if(this.props.location.pathname.indexOf('/post/') !== -1) {

      return <div style={ barStyles }></div>
    }
  }

  render() {


    console.log(this.props);

    return (
      <div>

        {this.renderLengthBar()}
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
