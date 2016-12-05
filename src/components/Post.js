import _ from 'lodash'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked'
import axios from 'axios'

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



class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      'postz':[],
      'posts':[],
      'description':{
        'title':'',
        'date': ''
      }
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  handleScroll(e) {
    let length = ( window.scrollY/ (document.documentElement.scrollHeight - window.innerHeight)) * window.innerWidth;
    if(window.scrollY/ (document.documentElement.scrollHeight - window.innerHeight) > 0.9) {
        let postTemp = this.state.postz;
        postTemp.push({
          description:{
            date: '1970',
            title: 'I am cool'
          },
          data: '#Hello /n I am awesome'
        })
        this.setState({postz: postTemp});
    }
    this.setState({ barLength: length})

  }

  getPostList() {

    axios.get('http://localhost:3030/media/descriptions.json')
    .then(res => {
        this.setState({posts: res.data})
        this.props.sendPosts(res)
        this.setState({description : this.props.posts[this.props.params.postname]})
    })
  }

  componentWillMount() {

    axios.get('http://localhost:3030/posts/' + this.props.params.postname)
    .then(res => {
        let postTemp = this.state.postz
        postTemp.push({
          description: this.props.posts[this.props.params.postname],
          data: res.data.data
        })
        this.setState({postz: postTemp})
    })
    .catch(err => console.log(err));
        if(this.props.posts[this.props.params.postname] == undefined) {
          this.getPostList();
        } else {
          this.setState({description : this.props.posts[this.props.params.postname]});
        }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    this.props.loadingBar();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  renderPost() {
    return _.map(this.state.postz, (post, index) => <PostMain key={index} {...post} />);
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

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="post p2 p-responsive wrap" role="main">
        <div className="measure">
            <div className="post-header mb2">
              <h1>Hey</h1>
              <span className="post-meta">Babay</span><br></br>

              <span className="post-meta small">
                5 minute read
              </span>
            </div>
            <article className="post-content">
                <div dangerouslySetInnerHTML={{__html: marked(this.props.data)}} />
            </article>
        </div>
      </div>
    );
  }
}

export default Post;
