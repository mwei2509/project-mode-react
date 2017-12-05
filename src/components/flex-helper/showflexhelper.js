import React from 'react';
import './style.css';
import {  bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addElement, getFlexHelper, saveFlexHelper, buildStyles, setCurrentFlex, clearCurrentFlex, clearElement, clearAll, editFlex, copyStyle, clearFlexHelper } from './actions'
import FlexElement from './flexelement.js'
import EditStyle from './editstyle.js'
import ClassStyleViewer from './classstyleviewer.js'
import {defaultStyle} from '../../variables/defaults'

class ShowFlexHelper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultStyle: defaultStyle,
      position: {
        x: 0,
        y: 0
      }
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    if (this.props.token){
      this.props.getFlexHelper(this.props.token, this.props.match.params.id)
    }
    window.addEventListener('click', this.handleClick)
  }

  componentWillUnmount() {
    this.props.clearFlexHelper()
    window.removeEventListener('click', this.handleClick)
  }

  setDefaultStyle(style) {
    this.setState({
      defaultStyle: style
    })
  }

  handleClick(event){
    if (event.target.classList.value.includes('flex-helper')) {
      console.log(event.target.id)
      this.setState({
        position: {
          x: event.clientX,
          y: event.clientY
        }
      })
      this.props.setCurrentFlex(event.target.id)
    } else {
      var element = document.getElementById('flex-editor');
      if (element && (event.target == element || element.contains(event.target))){
        return
      }

      if (event.target.classList.value.includes('flex-operations')){
        return
      }
      console.log('current flex cleared')
      this.props.clearCurrentFlex()
    }
  }

  addFlexElement(){
    var parentId = (this.props.flexHelper.current.id) ? this.props.flexHelper.current.id : '0'

    var payload = {
      parent: parentId,
      children: [],
      type: 'div',
      className: (parentId=='0') ? 'flex-helper flex-wrapper' : 'flex-helper flex-row',
      style: this.state.defaultStyle,
      content: ''
    }
    this.props.addElement(parentId, payload)
  }

  // updateFlex(update){
  //   this.props.editFlex(update)
  // }

  pasteStyle(){
    this.props.flexHelper.current.style = this.props.flexHelper.style
    this.props.editFlex(this.props.flexHelper.current)
  }

  saveFlexHelper(){
    //iterate through - remove anything with is-hidden, rename the id's

    let payload={
      flexhelper_json: JSON.stringify(this.props.flexHelper.all)
    }
    this.props.saveFlexHelper(this.props.token, this.props.flexHelper.flex.id, payload)
  }

  render() {
    let flexelements = this.props.flexHelper.all.map((element, index)=>{
      return (
        <FlexElement key={index} flexelement={element} children={element.children} selectedElement={this.props.flexHelper.current.id} />
      );
    })
    return (
      <div id="flexhelper-element">
        <Link to={'/projects/' + this.props.flexHelper.flex.project_id}>To Project</Link>
        <div className="flex-operations">
          <button className="flex-operations" onClick={this.addFlexElement.bind(this)}>add element</button>
          <button onClick={this.props.clearAll.bind(this)}>clear all</button>
          {(this.props.flexHelper.current.id) ?
            <span>
              <button className="flex-operations" onClick={this.setDefaultStyle.bind(this, this.props.flexHelper.current.style)}>set default style</button>
              <button className="flex-operations" onClick={this.props.clearElement.bind(this, this.props.flexHelper.current.id)}>delete selected</button>
            </span>
            : null
          }
          <button className="flex-operations" onClick={this.props.copyStyle.bind(this, this.props.flexHelper.current.style)}>copy style</button>
          {(Object.keys(this.props.flexHelper.style).length !== 0) ? <button className="flex-operations" onClick={this.pasteStyle.bind(this)}>paste style</button> : null}
          <button onClick={this.props.clearCurrentFlex.bind(this)}>deselect</button>
          <button onClick={this.saveFlexHelper.bind(this)}>save</button>
          <button onClick={this.props.buildStyles.bind(this, this.props.flexHelper.all)}>build classes</button>
        </div>
        {Object.keys(this.props.flexHelper.classStyles).length > 0 ? <ClassStyleViewer classStyles={this.props.flexHelper.classStyles} />:null}
        <EditStyle
          position={this.state.position}
          addFlexElement={this.addFlexElement.bind(this)}
          deleteElement={this.props.clearElement.bind(this, this.props.flexHelper.current.id)} />
        <div className="flex-helper-body">
          {flexelements}
        </div>
      </div>);
  }
}

const mapStateToProps = (state) => {
  return ({
    token: state.manageLogin.token,
    currentFlex: state.manageFlexHelper.flex,
    flexHelper: state.manageFlexHelper
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getFlexHelper, saveFlexHelper, addElement, clearElement, clearAll, setCurrentFlex, clearCurrentFlex, editFlex,
    copyStyle, clearFlexHelper, buildStyles
  }, dispatch)
}

const ConnectedShowFlexHelper = connect(mapStateToProps, mapDispatchToProps)(ShowFlexHelper)

export default ConnectedShowFlexHelper
