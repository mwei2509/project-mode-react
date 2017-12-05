let defaultState={
    all: []
  }

export const manageCategories = (state=defaultState, action) => {
  switch (action.type) {
    // case "ADD_CATEGORY":
    //   return Object.assign({}, state, {all: [...state.all, action.payload]})
    case "SET_CATEGORIES":
      return Object.assign({}, state, {
        all: action.payload
      })
    default:
      return state
  }
}
