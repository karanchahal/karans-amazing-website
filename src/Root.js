import React, { Component } from 'react';
import { Router, Route, browserHistory,IndexRoute } from 'react-router';
import _ from 'lodash'
import BlogWrapper from './components/Blog'
import About from './components/About'
import Header from './components/Header'
import Post from './components/Post'
import Projects from './components/Projects'






export default class Root extends Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Header}>
          <IndexRoute component={About}/>
          <Route path="/blog" component={BlogWrapper} />
          <Route path="/post/:postname" component={Post} />
          <Route path="/projects"  component={Projects}/>


        </Route>
      </Router>
    );
  }
}
