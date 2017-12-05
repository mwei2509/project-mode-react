import React from 'react'

class CommentInput extends React.Component {
  constructor(props){
    super(props)

    this.state={
      comment: ''
    }
  }

  render(){
    return(
      <div>
        <textarea value={this.state.comment} onChange={(event)=>{this.setState({comment: event.target.value})}} />
        <button onClick={()=>{ this.props.submitComment(this.state.comment); this.setState({comment:''})}}>Submit</button>
      </div>
    )
  }
}

export default CommentInput
