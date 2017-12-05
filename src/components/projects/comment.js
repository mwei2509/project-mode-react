import React from 'react';
import CommentInput from './commentinput'

class Comment extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      reply: false
    }
  }

  submitComment(comment){
    let payload = {
      comment: {
        parent_id: this.props.comment.id,
        content: comment
      }
    }
    this.props.submitComment(this.props.token, this.props.currentProject.id, payload)
    this.setState({ reply: false })
  }

  render() {

    let replies = [];

    if(this.props.replies) {
      replies = this.props.replies.map((comment, index) => {
       return (
         <Comment key={index}
           comment={comment}
           replies={comment.replies}
           token={this.props.token}
           currentProject={this.props.currentProject}
           submitComment={this.props.submitComment.bind(this)} />
       );
     });
    }

    let {id, content, username, created_at} = this.props.comment

    return (
      <div className="comment" id={id} style={{paddingLeft: "15px", borderLeft: "1px solid #eee"}}>
        <div className="comment_meta">{username} says ({created_at})</div>
        <div className="comment_content">{content}</div>
        <div className="comment_reply">
          <span className="is-link" onClick={()=>{this.setState({reply: !this.state.reply})}}>reply</span>
            {this.state.reply ? <div className="comment_reply-input"><CommentInput
              submitComment={this.submitComment.bind(this)}/></div>: null}
        </div>

        { replies.length > 0 ? replies : null}
      </div>
    );
  }
}

export default Comment
