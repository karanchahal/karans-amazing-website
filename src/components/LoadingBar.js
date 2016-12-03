import React, { Component } from 'react';

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

export default LoadingBar;
