import React, { Component } from 'react'

import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Route, Redirect, Switch} from 'react-router-dom'
import { push } from 'react-router-redux'
import { setProjects } from '../../actions'
import queryString from 'query-string'

class GlobalDash extends Component {

  constructor(props){
    super(props)
  }

  componentWillMount(){
    let search = queryString.parse(this.props.search)
    this.props.setProjects(search.limit ? search.limit : 10, search.offset ? search.offset : 0)
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props.search != nextProps.search) {
      let search = queryString.parse(nextProps.search)
      this.props.setProjects(search.limit ? search.limit : 10, search.offset ? search.offset : 0)
    }

    if (this.props.projects.all == nextProps.projects.all){
      return false
    }
    return true
  }

  render() {
    let offset = queryString.parse(this.props.search).offset
    let nextQuery = queryString.stringify({
      offset: Number((offset ? offset:0)) + 10
    })

    return (
        <div>
          <h1>All Recent Projects</h1>
          {this.props.displayProjects(this.props.projects.all)}
          <Link to={{ pathname: '/', search: nextQuery }}>next</Link>
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

const ConnectedGlobalDash = connect(mapStateToProps, mapDispatchToProps)(GlobalDash)

export default ConnectedGlobalDash
