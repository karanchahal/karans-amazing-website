import React, { Component } from 'react';
import _ from 'lodash'

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'word':'',
      'words' : [
        '',
        'hi',
        '',
        'my',
        'name',
        'is',
        '.',
        '',
        'my',
        'name',
        'is',
        '.',
        '',
        'my',
        'name',
        'is',
        '.',
        '',
        'chika',
        '',
        'chika',
        '',
        'slim',
        'shady',
        'shady',
        'shady',
        '',
        '',
      ],
      'color':[]
    }

    this.loadWords = this.loadWords.bind(this)
    this.setOfflineUI = this.setOfflineUI.bind(this)
    this.setOnlineUI = this.setOnlineUI.bind(this)
  }

  setOfflineUI() {
    console.log('Offline!')
    this.setState({
      color: [
        '#9E9E9E',
        '#757575',
        '#616161',
        '#424242',
        '#212121'
      ]
    })
  }

  setOnlineUI() {
    console.log('Online!')
    this.setState({
      color: [
        '#e8c060',
        '#dc6b6b',
        '#65c3ad',
        '#ea9078',
        '#33afff'
      ]
    })
  }

  componentWillMount() {

    if(!navigator.onLine) {
      this.setOfflineUI();
    } else {
      this.setOnlineUI();
    }

    window.addEventListener('offline',this.setOfflineUI);
    window.addEventListener('online',this.setOnlineUI);
  }

  componentWillUnmount() {
    window.removeEventListener('online');
    window.removeEventListener('offline');
  }

  renderWord() {


    let cIndex = 0
    return _.map(this.state.word,(letter,index) => {

      cIndex = (cIndex+1)%this.state.color.length;
      return <AboutLetter key={index} color={this.state.color[cIndex]} letter={letter} size='20vw' />
    })


  }

  loadWords() {
    this.index = (this.index+1)%this.state.words.length
    this.setState({word:this.state.words[(this.index)]})
  }

  componentDidMount() {
    this.index = -1;
    this.interval = setInterval(this.loadWords,250);
  }

  componentWillUnmount() {

    clearInterval(this.interval);
  }

  render() {


    return (

        <div className="post p2 p-responsive wrap" role="main">
          <div className="measure">
            <div className="centeredContainer">

              <div className="hello">
                <center>

                  <span id="intro">
                  {this.renderWord()}
                  </span>
                  </center>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export class AboutLetter extends Component {

  render() {
    let barStyle = {
      opacity: 1,
      transform: 'translate3d(0 px, 0px, 0px)',
      color: this.props.color,
      fontSize:this.props.size
    }

    return ( <span style={barStyle}>{this.props.letter}</span>);
  }

}

export default About;
