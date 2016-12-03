import React, { Component } from 'react';
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


let data = {
  text: 'Greetings fellow human,We are going to make a simple chrome extension today.It is a very powerful concept that if used correctly can add a lot of improvements to web interaction on your browser. \n# The Idea\n We are going to make an extension that makes it easier to download torrent files. This extension aims to alleviate problems that a user encounters while downloading torrent files from various torrent hosting websites on the internet .These websites generally have a lot of spam and advertisements across them, which makes it difficult to find the link to the file you actually want to download.To solve this, we are going to make an extension that parses all magnet links on the page and open them on clicking the extension icon, as shown above. The extension should also go through a color change on detecting torrent magnet links on the current tab.',
  heading: 'Lets Make A Chrome Extension',
  date: 'Oct 26, 2016'
}

class Post extends Component {

  constructor(props)
  {
    super(props);
    this.state = {'post':''}
  }

  componentWillMount() {

    axios.get('http://localhost:3030/posts/' + this.props.params.postname)
    .then(res => {
      this.setState({post: res.data.data})
    })
    .catch(err => console.log(err));
  }

  renderNewPost() {
    if(window.scrollY/ (document.documentElement.scrollHeight - window.innerHeight)> 0.8) {
      console.log('Load New Post')
    }
  }

  render() {

    return (
      <div>

        <div className="post p2 p-responsive wrap" role="main">
            <div className="measure">
                <div className="post-header mb2">
                  <h1>{data.heading}</h1>
                  <span className="post-meta">{data.date}</span><br></br>

                  <span className="post-meta small">
                    5 minute read
                  </span>
                </div>
                <article className="post-content">
                    <div dangerouslySetInnerHTML={{__html: marked(this.state.post)}} />
                </article>
          </div>
        </div>

        {this.renderNewPost()}
      </div>
    );
  }
}

export default Post;
