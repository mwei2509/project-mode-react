let defaultState={
    all: []
  }

export const manageQualifications = (state=defaultState, action) => {
  switch (action.type) {
    case "ADD_QUALIFICATION":
      return Object.assign({}, state, {all: [...state.all, action.payload]})
    case "SET_QUALIFICATIONS":
      return Object.assign({}, state, {
        all: action.payload
      })
    case "DELETE_QUALIFICATION":
      console.log('delete qualification')
      return Object.assign({}, state, { all: state.all.filter(sub => sub.id !== action.payload)})
    default:
      return state
  }
}
