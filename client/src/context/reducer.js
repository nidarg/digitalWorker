

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
    UPDATE_ENTRY_REQUEST,
    UPDATE_ENTRY_SUCCESS, 
    UPDATE_ENTRY_FAIL, 
    GET_ENTRY_REQUEST, 
    GET_ENTRY_SUCCESS ,
    GET_ENTRY_FAIL,
    DELETE_ENTRY_REQUEST, 
    DELETE_ENTRY_SUCCESS ,
    DELETE_ENTRY_FAIL,
    HIDE_ENTRY,
    SHOW_ENTRY,
    CHANGE_PAGE
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
          isDashboard:true,
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
          ...state,
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
          // filteredEntries:state.filteredEntries,
          totalEntries:action.payload.totalEntries,
          numPages : action.payload.numPages,
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

      if(action.type === GET_ENTRY_REQUEST){
        return {...state, isLoading:true, showAlert:false}
      }
      
      if(action.type === GET_ENTRY_SUCCESS){
        return{
          ...state,
          isLoading:false,
          entry:action.payload
        }
      }
      
      if (action.type === GET_ENTRY_FAIL) {
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
            dashboardEntries:[...state.dashboardEntries,action.payload],
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

      
      if(action.type === UPDATE_ENTRY_REQUEST){
        return {...state, isLoading:true}
      }

      if(action.type === UPDATE_ENTRY_SUCCESS){
        const updatedEntry = action.payload
        return{
            ...state,
            entries:state.entries.map(entry=>{
                if(entry._id === updatedEntry._id){
                    return updatedEntry
                }
                return entry
            }),
            dashboardEntries:state.dashboardEntries.map(entry=>{
              if(entry._id === updatedEntry._id){
                  return updatedEntry
              }
              return entry
          }),
            isLoading:false,
            showAlert:true,
            alertType:'success',
            alertText:'Entry Updated'
        }

      }
      if (action.type === UPDATE_ENTRY_FAIL) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        };
      }

      if(action.type === DELETE_ENTRY_REQUEST){
        return {...state, isLoading:true}
      }

      if(action.type === DELETE_ENTRY_SUCCESS){
        return{
            ...state,
            isLoading:false,
            showAlert:true,
            alertType:'success',
            alertText:'Entry deleted!'
        }

      }
      if (action.type === DELETE_ENTRY_FAIL) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        };
      }

      if(action.type === HIDE_ENTRY){
        return{
          ...state,
          hide:true,
          filteredEntries:action.payload,
        }
      }

      if(action.type === SHOW_ENTRY){
        return{
          ...state,
          hide:false,
          filteredEntries:action.payload
          
        }
      }

      if (action.type === CLEAR_VALUES) {
      
        return {
            ...state,
            entry:{}
        }
    }
    if (action.type === CHANGE_PAGE) {
      return { ...state, page: action.payload.page }
    }

      throw new Error(`no such action: ${action.type}`)
}

export default reducer