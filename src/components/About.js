import React, { Component } from 'react';
import _ from 'lodash'

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'word':'',
      'words' : [
        'hello',
        'my',
        'name',
        'is',
        'my',
        'name',
        'is',
        'my',
        'name',
        'is',
        'chika',
        'chika',
        'slim shady'
      ]
    }

    this.loadWords = this.loadWords.bind(this)
  }

  renderWord() {

    let colorz = [
      '#e8c060',
      '#dc6b6b',
      '#65c3ad',
      '#ea9078',
      '#33afff'
    ]
    let cIndex = 0
    return _.map(this.state.word,(letter,index) => {

      cIndex = (cIndex+1)%colorz.length;
      return <AboutLetter key={index} color={colorz[cIndex]} letter={letter} />
    })


  }

  loadWords() {
    this.index = (this.index+1)%this.state.words.length
    this.setState({word:this.state.words[(this.index)]})
  }

  componentDidMount() {
    this.index = -1;
    this.interval = setInterval(this.loadWords,800);
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

class AboutLetter extends Component {


  render() {
    let barStyle = {
      opacity: 1,
      transform: 'translate3d(0 px, 0px, 0px)',
      color: this.props.color
    }
    console.log(this.props.letter)
    return ( <span style={barStyle}>{this.props.letter}</span>);
  }
}
export default About;
