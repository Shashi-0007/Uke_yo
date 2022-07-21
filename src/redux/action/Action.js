import  Axios  from 'axios';
import {TOGGLE_ALL} from '../actionType/Types';
import {ALLCATEGORIES,ADDCATEGORIES , DELETECATEGORIES , EDITCATEGORIES , EDITFIELD , ADDFIELD ,ALLFIELDS,
    DELETEFIELD , ADDGROUP, DELETEGROUP, ALLGROUP, EDITGROUP, UPDATEGROUP} 
from '../actionType/Types'
import { baseURL} from '../../../src/Components/Api/BaseLine'


 export const toggle = () => {
    return{
        type:TOGGLE_ALL,
         payload:false,
    }
}
    // export const allCategories = () => async dispatch =>{
    //      const res = await axios.get('https://8042-223-178-212-210.in.ngrok.io/allCategory' )
    //      dispatch({
    //          type:ALLCATEGORIES,
    //          payload:res.data,
    //      })

    // } 
    export const allCategories = () => async dispatch => {
        try {
            const res = await Axios.get(baseURL + 'allCategory');
            dispatch({
                type: ALLCATEGORIES,
                payload: res.data,
            })
    
        } catch (e) {
            dispatch({
                type: 'USERS_ERROR',
                payload: console.log(e)
            })
        }
    }
    export const addcategory = (data) => async dispatch => {
        try {
            await Axios.post(baseURL + `addCategory`, { ...data });
            dispatch({
                type: ADDCATEGORIES,
    
            })
        } catch (error) {
            console.log(error, 'something went wrong');
    
        }
    }



    export const deletecategory = (id) => async dispatch => {
        try {
            const res = await Axios.delete(baseURL + `deleteCategory/${id}`);
            dispatch({
                type: DELETECATEGORIES,
                payload: res.data,
            })
    
        } catch (e) {
            dispatch({
                type: 'USERS_ERROR',
                payload: console.log(e)
            })
        }
    }

    export const editcategory = (id) => async dispatch =>{
        try{
            const response = await Axios.get(baseURL +  `singleCategory/${id}`);
            dispatch({
                type : EDITCATEGORIES,
                payload : response.data,
            })

        }catch(e){
            dispatch({
                type : 'USERS_ERROR',
                payload : console.log(e)
            })

        }
    }

//ADDATTRIBUTE
    export const addField = (data) => async dispatch => {
        try {
            await Axios.post(baseURL + `addFeild`, { ...data });
            dispatch({
                type: ADDFIELD,
    
            })
        } catch (error) {
            console.log(error, 'something went wrong');
    
        }
    }

//EDITATTRIBUTE
    export const editField = (id) => async dispatch =>{
        try{
            const response = await Axios.get(baseURL +  `singleFeild/${id}`);
            dispatch({
                type : EDITFIELD,
                payload : response.data,
            })

        }catch(e){
            dispatch({
                type : 'USERS_ERROR',
                payload : console.log(e)
            })

        }
    }

//ALLATTRIBUTE    
    export const allField = () => async dispatch => {
        try {
            const res = await Axios.get(baseURL + 'allFeild');
            dispatch({
                type: ALLFIELDS,
                payload: res.data,
            })
    
        } catch (e) {
            dispatch({
                type: 'USERS_ERROR',
                payload: console.log(e)
            })
        }
    }

//DELETEATTRIBUTE    
    export const deletefield= (id) => async dispatch => {
        try {
            const res = await Axios.delete(baseURL + `deleteFeild/${id}`);
            dispatch({
                type: DELETEFIELD,
                payload: res.data,
            })
    
        } catch (e) {
            dispatch({
                type: 'USERS_ERROR',
                payload: console.log(e)
            })
        }
    }
    
    //ADDGROUP
    export const addGroup = (data) => async dispatch => {
        try {
            await Axios.post(baseURL + `addgroup`, { ...data });
            dispatch({
                type: ADDGROUP,
    
            })
        } catch (error) {
            console.log(error, 'something went wrong');
    
        }
    }

    //DELETEGROUP
    export const deleteGroup= (id) => async dispatch => {
        console.log('id of delete is', id)
        try {
            const res = await Axios.post(baseURL + `deletegroup`,{...id});
            dispatch({
                type: DELETEGROUP,
                payload: res.data,
            })
    
        } catch (e) {
            dispatch({
                type: 'USERS_ERROR',
                payload: console.log(e)
            })
        }
    }

    //ALLGROUP
    export const allGroup = () => async dispatch => {
        try {
            const res = await Axios.get(baseURL + 'allgroup');
            dispatch({
                type: ALLGROUP,
                payload: res.data,
            })
    
        } catch (e) {
            dispatch({
                type: 'USERS_ERROR',
                payload: console.log(e)
            })
        }
    }

    //EDITGROUP
    export const editGroup = (id) => async dispatch =>{
        console.log('idss', id)
        try{
            const response = await Axios.post(baseURL +  `singlegroup`,{...id});
            dispatch({
                type    : EDITGROUP,
                payload : response.data,
            })

        }catch(e){
            dispatch({
                type : 'USERS_ERROR',
                payload : console.log(e)
            })

        }
    }

        //UPDATEGROUP
        export const UpdateGroup = (id) => async dispatch =>{
            try{
                const response = await Axios.put(baseURL +  `updategroup`,{...id});
                dispatch({
                    type    : UPDATEGROUP,
                    payload : response.data,
                })
    
            }catch(e){
                dispatch({
                    type : 'USERS_ERROR',
                    payload : console.log(e)
                })
    
            }
        }