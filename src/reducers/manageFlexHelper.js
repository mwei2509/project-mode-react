let defaultState={
    flex: {},
    current: { parent: '0' },
    all: [],
    style: {},
    classStyles: {}
  }

export const manageFlexHelper = (state=defaultState, action) => {

  // var iterateArray = (array) => {
  //   if (array && array.children) {
  //     for (var i = 0; i < array.children.length; i++) {
  //       var child = array.children[i]
  //       child.id = (array.id, i).join('-')
  //       if (!child.parent) {
  //         child.parent = array.id || '0'
  //       }
  //       iterateArray(child);
  //     }
  //   }
  // }
  //
  // iterateArray({children: state.all})

  var iterateGetElement = (id, array, idIndex=1) => {
    var element = id.split('-'); // 1: [0,3,2]
    var current = element[idIndex]; // 1: 3, 2: 2
    var arrayPointer = array[current] // 1: array[3], 2: array[3].children[2]
    if (idIndex >= element.length - 1){
      return arrayPointer
    } else {
      return iterateGetElement(id, arrayPointer.children, idIndex+1)
    }
  }

  switch (action.type) {
    case "ADD_FLEX":
      if (action.payload.parent !== '0') {
        var copyState = Object.assign({}, state)
        var parent = iterateGetElement(action.payload.parent, copyState.all)
        action.payload.id = action.payload.parent + '-' + parent.children.length
        parent.children.push(action.payload)
        return Object.assign({}, state, { all: copyState.all})
      } else {
        action.payload.id = `${action.payload.parent}-${state.all.length}`
        return Object.assign({}, state, { all: [...state.all, action.payload]})
      }
    case "SET_CURRENT_FLEX":
      var current = iterateGetElement(action.payload, state.all)
      return Object.assign({}, state, { current: iterateGetElement(action.payload, state.all) })
    case "CLEAR_CURRENT_FLEX":
      return Object.assign({}, state, { current: { parent: '0' }})
    case "EDIT_FLEX":
      var copyState = Object.assign({}, state)
      var parent, index;
      if (action.payload.parent == '0') {
        parent = copyState
        index = action.payload.id.split('-')[action.payload.id.split('-').length - 1]
        parent.all[Number(index)] = action.payload
      } else {
        parent = iterateGetElement(action.payload.parent, copyState.all)
        index = action.payload.id.split('-')[action.payload.id.split('-').length - 1]
        parent.children[Number(index)] = action.payload
      }
      return Object.assign({}, state, { all: copyState.all, current: action.payload })
    case "SET_FLEX":
      var loadFlex = action.payload.flexhelper_json ? JSON.parse(action.payload.flexhelper_json) : []
      return Object.assign({}, state, { flex: action.payload, all: loadFlex })
    case "CLEAR_ALL":
      return Object.assign({}, state, {
        current: { parent: '0' },
        all: [],
        style: {}
      })
    case "CLEAR_FLEX":
      var copyState = Object.assign({}, state)
      var current = iterateGetElement(action.payload, copyState.all)
      current.className += ' is-hidden'
      return Object.assign({}, state, { all: copyState.all })
    case "COPY_STYLE":
      return Object.assign({}, state, { style: action.payload })
    case "CLEAR_FLEX_HELPER":
      return defaultState
    case "CREATE_CLASS_STYLES":
      return Object.assign({}, state, { classStyles: action.payload })
    default:
      return state
  }
}
