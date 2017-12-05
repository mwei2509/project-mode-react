import React from 'react';

class ClassStyleViewer extends React.Component {

  render() {
    return (
      <div>
        {Object.keys(this.props.classStyles).map((classname, index)=>{
          return (
            <div><h1>{classname}</h1>
              <ul>{Object.keys(this.props.classStyles[classname]).map((style, index)=>{
                  return (
                    <li>{style}: {this.props.classStyles[classname][style]}</li>
                  )
                })}</ul>
            </div>
          )
        })}
      </div>
    )
  }
}

export default ClassStyleViewer
