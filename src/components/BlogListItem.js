import React, { Component } from 'react';
import { Link } from 'react-router';

class BlogListItem extends Component {

  render() {
    //console.log(this.props.date);
    return (

      <div className="post py3">
        <p className="post-meta">{this.props.date}</p>
        <Link to={`/post/` + this.props.filename} className="post-link"><h3 className="h1 post-title">{this.props.title}</h3></Link>
        <p className="post-summary">
            {this.props.description}
        </p>
      </div>
    );
  }
}


export default BlogListItem;
