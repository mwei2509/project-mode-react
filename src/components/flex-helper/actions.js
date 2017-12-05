import axios from 'axios'

export const getFlexHelper = (token, id) => {
  return (dispatch) => {
    axios
    .get('http://localhost:4000/flexhelpers/' + id, { headers: {token: token }})
    .then(({data}) => {
      dispatch({
        type: 'SET_FLEX',
        payload: data
      })
    })
    .catch((errors)=>{
      debugger
    })
  }
}

export const saveFlexHelper = (token, id, payload) => {
  return (dispatch) => {
    axios
    .patch('http://localhost:4000/flexhelpers/' + id, payload, { headers: {token: token }})
    .then(({data}) => {
      dispatch({
        type: 'SET_FLEX',
        payload: data
      })
    })
    .catch((errors)=>{
      debugger
    })
  }
}

export const addElement = (parent, payload) => {
  return(dispatch)=>{
    dispatch({
      type: "ADD_FLEX",
      payload: payload
    })
  }
}

export const clearElement = (payload) => {
  return(dispatch)=>{
    dispatch({
      type: "CLEAR_FLEX",
      payload: payload
    })
    dispatch({
      type: "CLEAR_CURRENT_FLEX"
    })
  }
}

export const clearAll = () => {
  return(dispatch)=>{
    dispatch({
      type: "CLEAR_ALL"
    })
  }
}

export const setCurrentFlex = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "SET_CURRENT_FLEX",
      payload: payload
    })
  }
}

export const clearCurrentFlex = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_CURRENT_FLEX"
    })
  }
}

export const editFlex = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "EDIT_FLEX",
      payload: payload
    })
  }
}

export const copyStyle = (payload) => {
  return (dispatch) => {
    dispatch({
      type: "COPY_STYLE",
      payload: payload
    })
  }
}

export const clearFlexHelper = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_FLEX_HELPER"
    })
  }
}

export const buildStyles = (all) => {
  var style = {}
  var classes = {}
  var iterate = (array) => {
    for (var i = 0; i < array.length; i++) {
      var parent = array[i].parent || '0'
      style[parent] = style[parent] || []
      //iterate over array, extract styles
      style[parent].push(array[i].style)
      if (array[i].children && array[i].children.length > 0){
        iterate(array[i].children)
      }
    }
  }

  var buildClass = (styleObj) =>{
    //iterate through siblings
    for (var sibling in styleObj) {
      //iterate through style array
      classes[`class${sibling}`] = {}

      for (var i = 0; i < styleObj[sibling].length; i++) {
        //iterate through siblings

        for (var style in styleObj[sibling][i]){
          //iterate through styles

          if (classes[`class${sibling}`][style]){
            //if the style exists, compare
            if (classes[`class${sibling}`][style] == styleObj[sibling][i][style]){
              //leave it
            } else {
              //mark it to remove
              classes[`class${sibling}`][style] = 'delete'
            }
          } else {
            //if style doesn't exist, add it
            classes[`class${sibling}`][style] = styleObj[sibling][i][style]
          }
        }
      }
    }
  }

  var cleanClass = () => {
    for (var className in classes) {
      //iterate through classes

      for (var style in classes[className]) {
        if (classes[className][style] == 'delete' || classes[className][style] == '') {
          classes[className][style] = undefined
        }
      }
    }
  }

  iterate(all)
  buildClass(style)
  cleanClass()
  classes = JSON.parse(JSON.stringify(classes));

  return (dispatch) => {
    dispatch({
      type: "CREATE_CLASS_STYLES",
      payload: classes
    })
  }
}
