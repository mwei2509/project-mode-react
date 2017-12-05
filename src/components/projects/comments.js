import React from 'react'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CommentInput from './commentinput'
import Comment from './comment'
import { submitComment } from './actions'

class Comments extends React.Component {
  constructor(props){
    super(props)
  }

  submitComment(comment){
    let payload = {
      comment: {
        content: comment
      }
    }
    this.props.submitComment(this.props.token, this.props.currentProject.id, payload)
  }

  render(){
    return(
      <div>
        <h2>Comments</h2>
        <CommentInput
          submitComment={this.submitComment.bind(this)} />
        {this.props.currentProject.comments.filter((comment, index)=> {return comment.parent_id == null}).map((comment, index)=>{
          return (
            <Comment
              comment={comment}
              replies={comment.replies}
              token={this.props.token}
              currentProject={this.props.currentProject}
              submitComment={this.props.submitComment.bind(this)}/>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    token: state.manageLogin.token,
    account: state.manageAccount,
    currentProject: state.manageProjects.current
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    submitComment
  }, dispatch)
}

const ConnectedComments = connect(mapStateToProps, mapDispatchToProps)(Comments)


export default ConnectedComments
