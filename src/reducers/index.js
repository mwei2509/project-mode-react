import {manageAccount} from './manageAccount'
import {manageLogin} from './manageLogin'
import {manageStatus} from './manageStatus'
import {manageSubscriptions} from './manageSubscriptions'
import {manageQualifications} from './manageQualifications'
import {manageCategories} from './manageCategories'
import {manageChannel} from './manageChannel'
import {manageSkills} from './manageSkills'
import {manageFlexHelper} from './manageFlexHelper'
import {manageProjects} from './manageProjects'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  manageAccount: manageAccount,
  manageLogin: manageLogin,
  manageStatus: manageStatus,
  manageCategories: manageCategories,
  manageChannel: manageChannel,
  manageSkills: manageSkills,
  manageSubscriptions: manageSubscriptions,
  manageQualifications: manageQualifications,
  manageFlexHelper: manageFlexHelper,
  manageProjects: manageProjects
})

export default rootReducer
