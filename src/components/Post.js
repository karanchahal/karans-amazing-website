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


let data = 'Greetings fellow human,We are going to make a simple chrome extension today.It is a very powerful concept that if used correctly can add a lot of improvements to web interaction on your browser. \n# The Idea\n We are going to make an extension that makes it easier to download torrent files. This extension aims to alleviate problems that a user encounters while downloading torrent files from various torrent hosting websites on the internet .These websites generally have a lot of spam and advertisements across them, which makes it difficult to find the link to the file you actually want to download.To solve this, we are going to make an extension that parses all magnet links on the page and open them on clicking the extension icon, as shown above. The extension should also go through a color change on detecting torrent magnet links on the current tab.'



class Post extends Component {
  render() {
    return (

      <div className="post p2 p-responsive wrap" role="main">
          <div className="measure">
              <div className="post-header mb2">
                <h1>Lets Make A Chrome Extension</h1>
                <span className="post-meta">Oct 26, 2016</span><br></br>

                <span className="post-meta small">

                  5 minute read

                </span>
              </div>

              <article className="post-content">

                  <div dangerouslySetInnerHTML={{__html: marked(data)}} />
              </article>
        </div>
      </div>
    );
  }
}

export default Post;
