import React, { Component } from 'react'
import './style.css';
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Route, Redirect, Switch} from 'react-router-dom'
import { push } from 'react-router-redux'
import { setProjects } from '../../actions'
import ProjectPreview from '../projects/projectpreview'
import GlobalDash from './globaldash'
import queryString from 'query-string'
import { utils } from '../../utils'

class Dashboard extends Component {

  constructor(props){
    super(props)
  }

  displayProjects(source){
    var projects = utils.sortByTime(source, 'created_at', 'desc');
    return projects.map((proj, index)=>{
      return(
        <ProjectPreview
          key={index}
          proj={proj}
          account={this.props.account}
          />
      )
    })
  }

  render() {
    return (
        <div className="dashboard_row">
          <div className="dashboard_item dashboard_main">
            <GlobalDash
              displayProjects={this.displayProjects.bind(this)}
              search={this.props.search}/>
          </div>
          <div className="dashboard_item">
            <h1>Recommended for you:</h1>
            <div>
              {this.displayProjects(this.props.account.newsfeed_projects.filter((proj)=>{
                return proj.creator_id !== this.props.account.id
              }).filter((proj)=>{
                return this.props.account.qualified_projects.map((proj)=>{ return proj.id}).includes(proj.id)
              }))}
            </div>
            <h1>You may be interested in:</h1>
            <div>
              {this.displayProjects(this.props.account.newsfeed_projects.filter((proj, index)=>{
                return proj.creator_id !== this.props.account.id
              }))}
            </div>
            <h1>Projects you're qualified for:</h1>
              <div>
                {this.displayProjects(this.props.account.qualified_projects.filter((proj, index)=>{
                  return proj.creator_id !== this.props.account.id
                }))}
              </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    account: state.manageAccount,
    projects: state.manageProjects,
    token: state.manageLogin.token
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    push, setProjects
  }, dispatch)
}

const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard)

export default ConnectedDashboard
