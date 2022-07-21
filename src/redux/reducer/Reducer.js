import {TOGGLE_ALL} from '../actionType/Types';
import {ALLCATEGORIES,ADDCATEGORIES , DELETECATEGORIES ,EDITCATEGORIES , EDITFIELD , ADDFIELD , ALLFIELDS ,
    DELETEFIELD, ADDGROUP, DELETEGROUP, ALLGROUP, EDITGROUP, UPDATEGROUP} 
from '../actionType/Types'

const inialState   = {categoryData:[]}
const dataInitial  = {deleteCategory:[]}
const InitialData  = {editcategory:[]}
const AllIntData   = {allData :[]}
const EditIntData  = {edit :[]}
const DeleteInitData = {delete :[]}
const UpdateInitData = {update :[]}

const togglingReducer = (state={togglingAll:true},action) => {
    switch(action.type){
        case TOGGLE_ALL : 
        return{
            ...state,
            togglingAll:!state.togglingAll,
        }
    
        default:return{
            ...state
        }
    }
}

 const allCategoryReducer = (state=inialState,action) => {
    switch(action.type){
        case ALLCATEGORIES : 
        return{
            ...state,
            categoryData:action.payload
        }
        case ADDCATEGORIES :return{...state}
       

        default:return{
            ...state
        }
    }
}


const deleteCategoryReducer = (state=dataInitial,action) => {
    switch(action.type){
        case DELETECATEGORIES : 
        return{
            ...state,
            deleteCategory:action.payload
        }
        default:return{
            ...state
        }
    }
}

const editcategoryReducer = (state=InitialData,action) =>{
    switch(action.type){
        case EDITCATEGORIES : return {
            ...state,
            editcategory : action.payload
        }
        default : return{
            ...state
        }
    }
}

const editfieldReducer = (state=EditIntData,action) =>{
    switch(action.type){
        case EDITFIELD : return {
            ...state,
            edit : action.payload
        }
        default : return{
            ...state
        }
    }
}

const allFieldsReducer = (state=AllIntData,action) => {
    switch(action.type){
        case ALLFIELDS : 
        return{
            ...state,
            allData:action.payload
        }
        case ADDFIELD :return{...state}
       

        default:return{
            ...state
        }
    }
}


const deleteFieldsReducer = (state=DeleteInitData,action) => {
    switch(action.type){
        case DELETEFIELD : 
        return{
            ...state,
            delete:action.payload
        }
        default:return{
            ...state
        }
    }
}
//ALLGROUP and  ADDGROUP
const allGroupReducer = (state=AllIntData,action) => {
    switch(action.type){
        case ALLGROUP : 
        return{
            ...state,
            allData:action.payload
        }
        case ADDGROUP :return{...state}
       

        default:return{
            ...state
        }
    }
}

//DELETEGROUP
const deleteGroupReducer = (state=DeleteInitData,action) => {
    switch(action.type){
        case DELETEGROUP : 
        return{
            ...state,
            delete:action.payload
        }
        default:return{
            ...state
        }
    }
}

//EDITGROUP
const editGroupReducer = (state=EditIntData,action) =>{
    switch(action.type){
        case EDITGROUP : return {
            ...state,
            edit : action.payload
        }
        default : return{
            ...state
        }
    }
}

//UPDATEGROUP
const UpdateGroupReducer = (state=UpdateInitData,action) =>{
    switch(action.type){
        case UPDATEGROUP : return {
            ...state,
            update : action.payload
        }
        default : return{
            ...state
        }
    }
}

export {togglingReducer,allCategoryReducer,deleteCategoryReducer,editcategoryReducer ,
     editfieldReducer , allFieldsReducer , deleteFieldsReducer ,
     allGroupReducer ,deleteGroupReducer ,editGroupReducer, UpdateGroupReducer   } ;