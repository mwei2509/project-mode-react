import React from 'react';
import './style.css';
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addElement } from './actions'
import { Link, Route, Switch } from 'react-router-dom'

import ShowFlexHelper from './showflexhelper'

class FlexHelper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Switch>
        <Route exact path='/flexhelper/:id' component={ShowFlexHelper}/>
        <Route>
          <div>
            About Flexhelpers!
          </div>
        </Route>
      </Switch>);
  }
}

const mapStateToProps = (state) => {
  return ({
    elements: state.manageFlexHelper.all
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addElement: addElement
  }, dispatch)
}

const ConnectedFlexHelper = connect(mapStateToProps, mapDispatchToProps)(FlexHelper)

export default ConnectedFlexHelper
