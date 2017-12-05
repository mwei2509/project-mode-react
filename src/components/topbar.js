import React from 'react'
import {  bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Topbar extends React.Component {

  render(){
    let loggedIn = <ul className="top-bar_menu-items">
      <li><Link to={'/'}>Dashboard</Link></li>
      <li><Link to={'/profile'}>Profile</Link></li>
      <li><Link to={'/account/projects'}>Your Projects</Link></li>
      <li><Link to={'/projects'}>Projects</Link></li>
      <li><Link to={'/logout'}>Logout</Link></li>
    </ul>

    let notLoggedIn = <ul className="top-bar_menu-items">
      <li><Link to={'/login'}>Login</Link></li>
      <li><Link to={'/signup'}>Sign Up</Link></li>
    </ul>

    return (
      <div className="top-bar">
        {this.props.token ? loggedIn : notLoggedIn}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    account: state.manageAccount,
    token: state.manageLogin.token
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch)
}

const ConnectedTopbar = connect(mapStateToProps, mapDispatchToProps)(Topbar)

export default ConnectedTopbar
