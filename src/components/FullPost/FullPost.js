import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

//the condition sets a post if a post id exists
class FullPost extends Component {

  state = {
    loadedPost: null
  }

/*
Fetch new data when we receive new props(post id).
Make the request if we have no loaded posts,
or if we do have a loaded post but the ids are different-
this way we dont have infinite request loop inside componentdidupdate method
*/
  componentDidUpdate() {
    if (this.props.id) {
      if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
        axios.get('/posts/' + this.props.id)
        .then(response => {
          console.log(response);
          this.setState({loadedPost: response.data});
        });
      }
    }
  }

  deletePostHandler = () => {
    axios.delete('/posts/' + this.props.id)
      .then(response => {
        console.log(response);
      });
  }

    render () {
        let post = <p style={{textAlign:'center'}}>Please select a Post!</p>;

        if(this.props.id) {
          post = <p style={{textAlign:'center'}}>Loading...</p>;
        }

        if(this.state.loadedPost) {
          post = (
              <div className="FullPost">
                  <h1>{this.state.loadedPost.title}</h1>
                  <p>{this.state.loadedPost.body}</p>
                  <div className="Edit">
                      <button
                        onClick={this.deletePostHandler}
                        className="Delete">Delete</button>
                  </div>
              </div>
        );
      }
        return post;
    }
}

export default FullPost;
