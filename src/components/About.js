import React, { Component } from 'react';


class About extends Component {
  render() {
    return (
      <div className="ui link cards">
        <div className="card">
          <div className="image">
            <img src="https://scontent.fdel1-2.fna.fbcdn.net/v/t1.0-9/13690753_1381840728497458_1424489462641445727_n.jpg?oh=666515f9f42904cc15f4a43ab37d56e8&oe=58BDD77F"></img>
          </div>
          <div className="content">
            <div className="header">Matt Giampietro</div>
            <div className="meta">
              <a>Friends</a>
            </div>
            <div className="description">
              Matthew is an interior designer living in New York.
            </div>
          </div>
          <div className="extra content">
            <span className="right floated">
              Joined in 2013
            </span>
            <span>
              <i className="user icon"></i>
              75 Friends
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
