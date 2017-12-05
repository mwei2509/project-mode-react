import React from 'react';
import './style.css';
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addElement, getFlexHelper } from './actions'

class FlexElement extends React.Component {

  render() {

    let childflexelements = null;

    if(this.props.children) {
      childflexelements = this.props.children.map((childflexelement, index) => {
       return (
         <FlexElement key={index} flexelement={childflexelement} children={childflexelement.children} selectedElement={this.props.selectedElement} />
       );
     });
    }

    let {id, style, className, content} = this.props.flexelement

    return (
      <div id={id}
        style={style}
        className={className + (this.props.selectedElement == id ? ' pm-selected': '') + (content ? ' has-content' : ' is-empty')}>
        { content ? content : childflexelements.length == 0 ? 'empty div' : null}
        { childflexelements.length > 0 ? childflexelements : null}
      </div>
    );
  }
}

export default FlexElement
