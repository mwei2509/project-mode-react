let defaultState={
    current: { categories: [], skills: [], likes: [], comments: [] },
    all: []
  }

export const manageProjects = (state=defaultState, action) => {
  switch (action.type) {
    // case "ADD_CATEGORY":
    //   return Object.assign({}, state, {all: [...state.all, action.payload]})
    case "SET_CURRENT_PROJECT":
      return Object.assign({}, state, {
        current: action.payload
      })
    case "ADD_FLEX_TO_CURRENT_PROJ":
      return Object.assign({}, state, {
        current: Object.assign({}, state.current, { flexhelper: action.payload })
      })
    // case "ADD_LIKE_TO_CURRENT_PROJ":
    //   return Object.assign({}, state, {
    //     current: Object.assign({}, state.current, {
    //       likes: [...state.current.likes, action.payload]
    //     })
    //   })
    case "CLEAR_CURRENT_PROJECT":
      return Object.assign({}, state, {
        current: { categories: [] }
      })
    case "SET_PROJECTS": // set array of projects depending on what page you're on - aka all user's projects or all projects in newsfeed, etc
      return Object.assign({}, state, {
        all: action.payload
      })
    default:
      return state
  }
}
