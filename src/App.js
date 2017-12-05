import React, { Component } from 'react'
import AddSubscriptions from './components/addsubscriptions'
import FlexHelper from './components/flex-helper'
import Projects from './components/projects'
import Profile from './components/profile'
import Channel from './components/channel'
import Topbar from './components/topbar'
import Dashboard from './components/dashboard'
import ProjectPreview from './components/projects/projectpreview'
import './App.css';
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout, setUser, clearUser, setProjects } from './actions'
import { Link, Route, Redirect, Switch} from 'react-router-dom'
import { push } from 'react-router-redux'
import queryString from 'query-string'



class App extends Component {

  constructor(){
    super()

    this.displayProjects = this.displayProjects.bind(this)
  }

  handleUser(prop){
    if (prop.token) {
      if (prop.location.pathname == '/logout') {
        prop.clearUser()
        prop.logout(prop.token)
        prop.push('/login')
      } else if (prop.location.pathname == '/login') {
        prop.push('/')
      } else {
        if (!prop.account || !prop.account.id) {
          prop.setUser(prop.token)
        }
      }
    } else {
      var loginOnly = ['/account/projects', '/newsfeed', '/projects/new', '/flexhelper']
      if (loginOnly.includes(prop.location.pathname)){
        prop.push('/login')
      }
    }
  }

  componentWillMount(){
    this.handleUser(this.props)
  }

  componentWillReceiveProps(nextProps){
    this.handleUser(nextProps)
  }

  displayProjects(source){
    return source.map((proj, index)=>{
      return(
        <ProjectPreview
          key={index}
          proj={proj}
          account={this.props.account}
          />
      )
    })
  }
  // next(){
  //   let limit = queryString.parse(this.props.location.search).limit
  //   let offset = queryString.parse(this.props.location.search).offset
  //   debugger
  //   return {
  //     limit: limit ? limit:10,
  //     offset: offset ? offset+10:0
  //   }
  // }

  render() {

    return (
        <div className="app">
          <Topbar />
          <Switch>
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/channel/:channel" component={Channel}/>
            <Route exact path="/account/projects">
              <div>
                <h1>Your Projects</h1>
                <div>
                  {this.displayProjects(this.props.account.projects)}
                </div>
              </div>
            </Route>
            <Route path="/flexhelper" component={FlexHelper}/>
            <Route path="/projects" component={Projects} />
            <Route>
              <Dashboard search={this.props.location.search}/>
            </Route>
          </Switch>
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
    logout, setUser, clearUser, push, setProjects
  }, dispatch)
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
