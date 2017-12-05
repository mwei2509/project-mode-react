import React from 'react';
import Login from './login'
import Signup from './signup'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import { push } from 'react-router-redux'
import { logout } from '../../actions'

class SessionRegistration extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleSession(page){
    this.props.push(page)
  }

  render() {

    return (
      <div className="account">
        <div className="account_input">
          {this.props.location.pathname === "/login" ? <Link to={'/signup'}>Don't have an account?  Register!</Link> : <Link to={'/login'}>Already have an account?  Login!</Link>}

          <div>
            <Switch>
              <Route exact path="/signup" component={Signup}/>
              <Route exact path="/login" component={Login}/>
            </Switch>
          </div>
          <div className="error">
            {this.props.status.error ? "there is an error":null}
          </div>
        </div>
      </div>);
  }
}



const mapStateToProps = (state) => {
  return ({
    token: state.manageLogin.token,
    status: state.manageStatus
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logout: logout,
    push: push
  }, dispatch)
}

const ConnectedSessionRegistration = connect(mapStateToProps, mapDispatchToProps)(SessionRegistration)

export default ConnectedSessionRegistration
