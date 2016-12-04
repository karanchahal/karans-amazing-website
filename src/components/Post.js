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
      'post':'',
      'posts':[],
      'description':{
        'title':'',
        'date': ''
      }
    }
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
      this.setState({post: res.data.data})
    })
    .catch(err => console.log(err));

    if(this.props.posts[this.props.params.postname] == undefined) {
      this.getPostList();
    } else {
      this.setState({description : this.props.posts[this.props.params.postname]});
    }

  }


  render() {
    console.log(this.props.posts)
    return (
      <div>

        <div className="post p2 p-responsive wrap" role="main">
            <div className="measure">
                <div className="post-header mb2">
                  <h1>{this.state.description.title}</h1>
                  <span className="post-meta">{this.state.description.date}</span><br></br>

                  <span className="post-meta small">
                    5 minute read
                  </span>
                </div>
                <article className="post-content">
                    <div dangerouslySetInnerHTML={{__html: marked(this.state.post)}} />
                </article>
          </div>
        </div>

      </div>
    );
  }
}


export default Post;
