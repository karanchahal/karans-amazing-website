import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import _ from 'lodash'

import Blog from './components/Blog'
import About from './components/About'
import Header from './components/Header'
import Post from './components/Post'
import Projects from './components/Projects'






export default class Root extends Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Header}>
          <Route path="/blog" component={Blog}>

          </Route>
          <Route path="/post/:postname" component={Post}/>
          <Route path="/projects" component={Projects}/>
          <Route path="/about" component={About}/>

        </Route>
      </Router>
    );
  }
}
