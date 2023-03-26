

import{
    DISPLAY_ALERT ,
    CLEAR_ALERT ,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    GET_ENTRIES_REQUEST, 
    GET_ENTRIES_SUCCESS ,
    GET_ENTRIES_FAIL,
    CREATE_ENTRY_REQUEST ,
    CREATE_ENTRY_SUCCESS ,
    CREATE_ENTRY_FAIL ,
    CLEAR_VALUES,
    
    } from './actions'

import {initialState} from './appContext'

const reducer = (state, action)=>{
    if (action.type === DISPLAY_ALERT) {
        return {
                ...state,
                showAlert: true,
                alertType: 'danger',
                alertText: 'Please provide all values!',
        }
    }

    if (action.type === CLEAR_ALERT) {
        return {
                ...state,
                showAlert: false,
                alertType: '',
                alertText: '',
        }
    }

    if(action.type === LOGIN_REQUEST){
        return{...state, isLoading:true}
    }

      if(action.type === LOGIN_SUCCESS){
        return {
          ...state,
          user:action.payload.user,
          token:action.payload.token,
          isLoading:false,
          showAlert:true,
          alertType:'success',
          alertText:'Login Successful! Redirecting...'
        }
      }
    
      if (action.type === LOGIN_FAIL) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        }
      }

      if(action.type === LOGOUT){
        return{
          ...initialState,
          user:null,
          token:null,
        }
      }

      if(action.type === GET_ENTRIES_REQUEST){
        return {...state, isLoading:true, showAlert:false}
      }
      
      if(action.type === GET_ENTRIES_SUCCESS){
        return{
          ...state,
          isLoading:false,
          entries:action.payload.entries,
          totalEntries:action.payload.totalEntries,
          numPages : action.payload.numPages
        }
      }

      if (action.type ===  GET_ENTRIES_FAIL) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        }
      }

      if(action.type === CREATE_ENTRY_REQUEST){
        return {...state, isLoading:true, showAlert:false}
      }

      if(action.type === CREATE_ENTRY_SUCCESS){
        return {
            ...state, 
            entries:[...state.entries,action.payload],
            isLoading:false,
            showAlert:true,
            alertType:'success',
            alertText:'Entry created!',
        }
      }
      if(action.type === CREATE_ENTRY_FAIL){
        return {
          ...state,
          isLoading:false,
          showAlert:true,
          alertType:'danger',
          alertText:action.payload.msg
        }
      }


      if (action.type === CLEAR_VALUES) {
        const initialState = {
          isEditing: false,
          editEntrieId:'',
          snippet:{}
        }
        return {
            ...state,
            ...initialState
        }
    }

      throw new Error(`no such action: ${action.type}`)
}

export default reducer