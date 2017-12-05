export const manageStatus = (state={}, action) => {
  switch (action.type) {
    case "ADD_ERROR":
      return Object.assign({}, state, {error: action.payload})
    case "ADD_SUCCESS":
      return Object.assign({}, state, {success: action.payload})
    default:
      return state
  }
}
