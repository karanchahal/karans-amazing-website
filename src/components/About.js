import React, { Component } from 'react';


class About extends Component {
  render() {
    let barStyle = {
      opacity: 1,
      transform: 'translate3d(0 px, 0px, 0px)',
      color: '#ea9078'

    };
    return (
        <div className="post p2 p-responsive wrap" role="main">
          <div className="measure">

            <div className="hello">
                <span id="intro">
                  <span style={barStyle}>H</span>
                  <span style={barStyle}>e</span>
                  <span style={barStyle}>l</span>
                  <span style={barStyle}>l</span>
                  <span style={barStyle}>o</span>
                </span>
              </div>

          </div>
        </div>
    );
  }
}

export default About;
