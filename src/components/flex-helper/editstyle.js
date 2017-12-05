import React from 'react';
import Draggable from 'react-draggable'
import FlexElement from './flexelement.js'
import {ChromePicker} from 'react-color'
import {  bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addElement, getFlexHelper, saveFlexHelper, setCurrentFlex, clearCurrentFlex, clearElement, clearAll, editFlex, copyStyle, clearFlexHelper } from './actions'

class EditStyle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: this.props.flexHelper.current,
      showColor: false
    }

    this.loremipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet sollicitudin nulla. Vestibulum nec nibh sodales, auctor ex sed, dictum sem. Donec pharetra sagittis nisl, eget tempor elit tincidunt eu. Proin ultricies elementum turpis non bibendum. Vestibulum nisi odio, tincidunt id cursus et, convallis ut dui. Cras sagittis vitae orci et feugiat."
  }

  toggle(field){
    this.setState({
      [field]: !this.state[field]
    })
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.flexHelper.current.id !== this.props.flexHelper.current.id) {
      // this.elementCopy = Object.assign({}, nextProps.flexHelper.current)
      this.setState({
        current: nextProps.flexHelper.current
      })
    }
  }

  handleStyleChange(field, event){
    this.setState({
      current: Object.assign({}, this.state.current, {
        style: Object.assign({}, this.state.current.style, {
          [field]: event.target.value
        })
      })
    }, ()=>{
      this.props.editFlex(this.state.current)
    })
  }

  addIpsum(){
    this.setState({
      current: Object.assign({}, this.state.current, {
        content: this.state.current.content += this.loremipsum
      })
    }, ()=>{
      this.props.editFlex(this.state.current)
    })
  }

  pickColor(color){
    this.setState({
      current: Object.assign({}, this.state.current, {
        style: Object.assign({}, this.state.current.style, {
          backgroundColor: color.hex
        })
      })
    }, ()=>{
      this.props.editFlex(this.state.current)
    })
  }

  handleChange(field, event){
    this.setState({
      current: Object.assign({}, this.state.current, {
        content: event.target.value
      })
    }, ()=>{
      this.props.editFlex(this.state.current)
    })
  }

  render() {
    let {x, y} = this.props.position

    if (this.props.flexHelper.current.id) {
      let {id} = this.props.flexHelper.current
      let colorPicker = <div className={this.state.showColor ? "color-picker" : "color-picker is-hidden"}>
          <span className="color-picker__close" onClick={this.toggle.bind(this, 'showColor')}>x</span>
          <ChromePicker
            color={this.props.flexHelper.current.style.backgroundColor}
            disableAlpha={true}
            onChange={ this.pickColor.bind(this) }
            onChangeComplete={ this.pickColor.bind(this) }
             />
        </div>

      return (
        <Draggable
          axis="both"
          handle=".handle"
          defaultPosition={{x: x, y: y}}
          grid={null}
          zIndex={1}>
          <div id="flex-editor">
            <h2 className="handle">Editing {id}</h2>
            <div className="flex-operations">
              <button className="flex-operations" onClick={this.props.addFlexElement.bind(this)}>add element</button>
              <button onClick={this.props.deleteElement.bind(this)}>delete</button>
            </div>
            <div>
              <span className="is-link" onClick={this.toggle.bind(this, 'showColor')}>Set Background Color</span>
              {colorPicker}
            </div>
            <div>
              <label>Padding: </label>
              <input type="number" value={this.props.flexHelper.current.style.padding} onChange={this.handleStyleChange.bind(this, 'padding')} />
            </div>
            <div>
              <label>Margin: </label>
              <input type="number" value={this.props.flexHelper.current.style.margin} onChange={this.handleStyleChange.bind(this, 'margin')} />
            </div>
            <div>
              <label>Display: </label>
              <input type="text" value={this.props.flexHelper.current.style.display} onChange={this.handleStyleChange.bind(this, 'display')} />
              <input type="text" value={this.props.flexHelper.current.style.flexDirection} onChange={this.handleStyleChange.bind(this, 'flex-direction')} />
            </div>
            <div>
              <label>Align: </label>
              <input type="text" value={this.props.flexHelper.current.style['align-items']} onChange={this.handleStyleChange.bind(this, 'align-items')} />
            </div>
            <div>
              <label>Wrap: </label>
              <input type="text" value={this.props.flexHelper.current.style['flex-wrap']} onChange={this.handleStyleChange.bind(this, 'flex-wrap')} />
            </div>
            <div>
              <span className="is-link" onClick={this.addIpsum.bind(this)}>Insert Lorem Ipsum Text</span>
            </div>
            <textarea value={this.props.flexHelper.current.content}
                onChange={this.handleChange.bind(this, 'content')}/>
          </div>
        </Draggable>
      );
    } else {
      return null
    }
  }
}

const mapStateToProps = (state) => {
  return ({
    flexHelper: state.manageFlexHelper
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    clearAll, setCurrentFlex, editFlex, copyStyle
  }, dispatch)
}

const ConnectedEditStyle = connect(mapStateToProps, mapDispatchToProps)(EditStyle)

export default ConnectedEditStyle
