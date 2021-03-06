import _ from 'lodash'
import React, { Component } from 'react';
import marked from 'marked'
import axios from 'axios'
import {AboutLetter} from './About'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})

let index = 0

class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      'postsCurrentlyLoaded':[]
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  handleScroll(e) {

    if(window.scrollY/ (document.documentElement.scrollHeight - window.innerHeight) > 0.9 && Math.floor(index) < this.props.postOrdering.length) {

        let newPostfilename = this.props.postOrdering[index]
        this.getPost(newPostfilename,false)
        index++;

    }

  }



  getPostList() {

    axios.get('http://ec2-13-58-121-196.us-east-2.compute.amazonaws.com:3030/media/descriptions.json')
    .then(res => {
        this.props.sendPosts(res)
    })
    .catch(err => console.log(err));
  }

  getPost(filename,first) {
    axios.get('http://ec2-13-58-121-196.us-east-2.compute.amazonaws.com:3030/posts/' + filename)
    .then(res => {
        let postTemp = this.state.postsCurrentlyLoaded
        postTemp.push({
          description: this.props.posts[filename],
          data: res.data.data
        })

        this.setState({postsCurrentlyLoaded: postTemp})
        if(first === true){
          index = Math.floor(this.props.posts[filename].index) + 1;
        }

    })
    .catch(err => console.log(err));
  }



  componentWillMount() {

    if(this.props.posts[this.props.params.postname] === undefined) {
      this.getPostList();
    }

    this.getPost(this.props.params.postname,true);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)

  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  renderPost() {
    return _.map(this.state.postsCurrentlyLoaded, (post, index) => <PostMain key={index} {...post} />);
  }

  render() {

    return (
      <div>
        {this.renderPost()}
      </div>
    );
  }
}

class PostMain extends Component {



  render() {
    return(
      <div className="post p2 p-responsive wrap" role="main">
        <div className="measure">
            <div className="post-header mb2">
              <h1>{this.props.description.title}</h1>
              <span className="post-meta">{this.props.description.date}</span><br></br>

              <span className="post-meta small">
                5 minute read
              </span>
            </div>
            <article className="post-content">
                <div dangerouslySetInnerHTML={{__html: marked(this.props.data)}} />
            </article>
        </div>
        <EndOfPost />
      </div>
    );
  }
}


class EndOfPost extends Component {
  constructor(props) {
    super(props)

    this.state = {
      color: [
        '#e8c060',
        '#dc6b6b',
        '#65c3ad',
        '#ea9078',
        '#33afff'
      ]
    }
  }
  renderWord() {
    let cIndex = 0
    return _.map('End Of Post',(letter,index) => {

      cIndex = (cIndex+1)%this.state.color.length;
      return <AboutLetter key={index} color={this.state.color[cIndex]} letter={letter} size='4vw' />
    })
  }
  render() {
    return(
      <div className="hello" >
        <center>
          <span id="intro">
          {this.renderWord()}
          </span>
          </center>
      </div>
    );
  }
}

export default Post;
