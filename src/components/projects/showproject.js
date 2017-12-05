import React from 'react';
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'

import { push } from 'react-router-redux'
import { setCurrentProject, likeProject } from './actions'
import FontAwesome from 'react-fontawesome'
import Comments from './comments'
import ProjectAdmin from './projectadmin'

class ShowProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      heart: 0
    }
  }

  handleCurrentProject(prop){
    if (prop.match.params.id == prop.currentProject.id) {
      return;
    }
    prop.setCurrentProject(prop.match.params.id)
  }

  componentWillMount(){
    this.handleCurrentProject(this.props)
  }

  componentWillReceiveProps(nextProps){
    this.handleCurrentProject(this.props)
  }

  like(heart){
    var payload = {
      project: {
        like: heart
      }
    }
    this.props.likeProject(this.props.token, this.props.currentProject.id, payload)
  }

  likedProject(){
    return this.props.currentProject.likes.filter((likes, index)=>{ return likes.heart == 1 && likes.liked_by.id == this.props.account.id }).length > 0;
  }

  dislikedProject(){
    return this.props.currentProject.likes.filter((likes, index)=>{ return likes.heart == -1 && likes.liked_by.id == this.props.account.id }).length > 0;
  }

  renderLikeBox(){
    return (<div>
      <span onClick={this.likedProject() ? null : this.like.bind(this, 1)}>
        <FontAwesome name={this.likedProject() ? "arrow-circle-up" : "arrow-circle-o-up"} />
      </span>
      <span onClick={this.dislikedProject() ? null : this.like.bind(this, -1)}>
        <FontAwesome name={this.dislikedProject() ? "arrow-circle-down" : "arrow-circle-o-down"} />
      </span>
    </div>)
  }

  isOwner(){
    return this.props.currentProject.creator_id === this.props.account.id
  }

  render() {
    let {currentProject} = this.props

    return (
      <div>
        <h1>{currentProject.title}</h1>
        <p>{currentProject.description}</p>
        {this.isOwner() ? <ProjectAdmin /> : this.renderLikeBox()}
        <div>
          <p>{currentProject.total_likes} likes</p>
          <p>liked by:
          {currentProject.likes.filter((likes, index)=>{ return likes.heart > 0;}).map((likes, index)=>{ return likes.liked_by.username }).join(', ')}</p>
        </div>
        <div>
          <h4>tags</h4>
          {currentProject.categories.map((cat, index)=>{
            return (
              <span className="tag-label">
                <Link to={'/channel/' + cat.name}>{cat.name}</Link>
              </span>
            )
          })}
        </div>
        <div>
          <h4>required skills</h4>
          {currentProject.skills.map((skill, index)=>{
            return (
              <span className="tag-label">
                {skill.name}
              </span>
            )
          })}
        </div>
        <div>
          <Comments />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    token: state.manageLogin.token,
    account: state.manageAccount,
    status: state.manageStatus,
    currentProject: state.manageProjects.current
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setCurrentProject, likeProject, push
  }, dispatch)
}

const ConnectedShowProject = connect(mapStateToProps, mapDispatchToProps)(ShowProject)

export default ConnectedShowProject
