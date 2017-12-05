import React from 'react';
import NewProject from './newproject'
import ShowProject from './showproject'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import { push } from 'react-router-redux'
import { logout } from '../../actions'
import EditProject from './editproject'
import './style.css'

class Projects extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <Switch>
          <Route exact path='/projects/new' component={NewProject}/>
          <Route exact path='/projects/:id' component={ShowProject}/>
          <Route exact path='/projects/:id/edit' component={EditProject}/>
          <Route>
            <div>
              <Link to={'/projects/new'}>New Project</Link>
            </div>
          </Route>
        </Switch>
      </div>);
  }
}



const mapStateToProps = (state) => {
  return ({
    token: state.manageLogin.token
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logout: logout,
    push: push
  }, dispatch)
}

const ConnectedProjects = connect(mapStateToProps, mapDispatchToProps)(Projects)

export default ConnectedProjects
