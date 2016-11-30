import React, { Component } from 'react';
import marked from 'marked'


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


let data = '# Hello'

class Post extends Component {
  render() {
    return (
        <div>
          <h1>You are at a post</h1>
            <div dangerouslySetInnerHTML={{__html: marked(data)}} />
        </div>
    );
  }
}

export default Post;
