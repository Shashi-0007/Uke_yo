import {allCategoryReducer , deleteCategoryReducer , editcategoryReducer, UpdateCategoryReducer, editfieldReducer ,
     allFieldsReducer , deleteFieldsReducer ,allGroupReducer ,deleteGroupReducer ,editGroupReducer, UpdateGroupReducer
    } from './Reducer'
import {togglingReducer} from './Reducer'
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    togglingReducer,
    allCategoryReducer,
    deleteCategoryReducer,
    editcategoryReducer,
    UpdateCategoryReducer,
    editfieldReducer,
    allFieldsReducer,
    deleteFieldsReducer,
    allGroupReducer,
    deleteGroupReducer,
    editGroupReducer,
    UpdateGroupReducer
})
export default rootReducer;