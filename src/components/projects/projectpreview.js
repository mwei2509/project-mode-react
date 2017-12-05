import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import FontAwesome from 'react-fontawesome'
import javascript_time_ago from 'javascript-time-ago'
javascript_time_ago.locale(require('javascript-time-ago/locales/en'))
require('javascript-time-ago/intl-messageformat-global')
require('intl-messageformat/dist/locale-data/en')



class ProjectPreview extends Component {

  constructor(props){
    super(props)

    this.state = {
      expanded: false
    }
  }

  togglePreview(){
    this.setState({
      expanded: !this.state.expanded
    })
  }

  handleClick(event){
    if (event.target.tagName.toLowerCase() != 'a') {
      this.togglePreview();
    }
  }

  render() {
    let {proj, account} = this.props

    let expanded=(
      <div>
        <p>{proj.description.substring(0,50)}</p>
        <div className="project-preview_meta">
          <strong>tags: </strong>
          <ul>
            {proj.categories ? proj.categories.map((cat)=>{
              return <li><Link to={`/channel/${cat.name}`}>{cat.name}</Link></li>
              }):"n/a"}
          </ul>
        </div>
        <div className="project-preview_meta">
          <strong>skills: </strong><ul>
            {proj.skills ? proj.skills.map((skill)=>{
              return <li><Link to={`/channel/${skill.name}`}>{skill.name}</Link></li>
              }):"n/a"}
          </ul>
        </div>
        <small>{proj.total_comments} comments, {proj.total_likes} likes</small>
      </div>
    )

    let time_ago_english = new javascript_time_ago('en-US')
    let created_at = time_ago_english.format(new Date(proj.created_at))

    return (
      <div onClick={this.handleClick.bind(this)} className={'project-list ' + (proj.creator_id == this.props.account.id ? 'project-list_is-owner' : '')}>
        <Link to={'/projects/' + proj.id}>{proj.title}</Link>  - submitted {created_at} by {proj.creator_name}
          <span onClick={this.togglePreview.bind(this)} style={{float: 'right'}}>
            <FontAwesome name={this.state.expanded ? "chevron-down":"chevron-left"} />
          </span>
          {this.state.expanded ? expanded : null}
      </div>
    );
  }
}

export default ProjectPreview
