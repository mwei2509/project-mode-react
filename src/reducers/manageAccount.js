let defaultState = {
  username: '',
  email: '',
  id: '',
  // subscriptions: [],
  projects: [],
  newsfeed_projects: [],
  qualified_projects: [],
  interests: [],
  skills: []
}
export const manageAccount = (state=defaultState, action) => {
  switch (action.type) {
    case "LOAD_USER":
      return Object.assign({}, state, action.data)
    case "CLEAR_USER":
      return defaultState
    case "ADD_PROJECT_TO_USER":
      return Object.assign({}, state, {projects: [...state.projects, action.payload]})
    default:
      return state
  }
}
