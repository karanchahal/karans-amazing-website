import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';


class App extends Component {
  render() {
    return (
      <div>
        <h1>Main App</h1>
        <div>
          <Link to={`/blog`}>Blog</Link>
        </div>
        <div>
          <Link to={`/projects`}>Projects</Link>
        </div>
        <div>
          <Link to={`/about`}>About</Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}


class Blog extends Component {
  render() {
    return (
      <h1>You are at a blog</h1>
    );
  }
}


class Projects extends Component {
  render() {
    return (
      <h1>You are at projects</h1>
    );
  }
}

class About extends Component {
  render() {
    return (
      <h1>About Me</h1>
    );
  }
}

export default class Root extends Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <Route path="/blog" component={Blog}/>
          <Route path="/projects" component={Projects}/>
          <Route path="/about" component={About}/>

        </Route>
      </Router>
    );
  }
}
