import React from 'react';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addFlexHelperToProject } from './actions'


class ProjectAdmin extends React.Component {
  constructor(props){
    super(props)
  }

  addFlex(){
    var payload = {
      flexhelper: {
        project_id: this.props.currentProject.id
      }
    }
    this.props.addFlexHelperToProject(this.props.token, payload)
  }

  render() {
    let {currentProject} = this.props
    return (
      <div className="project-admin">
        <h2>Admin</h2>
        <ul>
          <li>Edit</li>
          <li>{currentProject.flexhelper ? <Link to={'/flexhelper/' + currentProject.flexhelper.id}>View Flexhelper</Link> : <button onClick={this.addFlex.bind(this)}>Add FlexHelper</button>}</li>
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return ({
    token: state.manageLogin.token,
    status: state.manageStatus,
    currentProject: state.manageProjects.current
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addFlexHelperToProject
  }, dispatch)
}

const ConnectedProjectAdmin = connect(mapStateToProps, mapDispatchToProps)(ProjectAdmin)

export default ConnectedProjectAdmin
