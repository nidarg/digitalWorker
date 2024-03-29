
import React, { useReducer, useContext } from 'react'
import reducer from './reducer'
import axios from 'axios'

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


const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
let filteredEntries = localStorage.getItem('filteredEntries')


export const initialState = {
    
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user:user ? JSON.parse(user) : null,
    token:token,
    page:1,
    numPages:1,
    totalEntries:0,
    entries:[],
    dashboardEntries:[],
    entriesIds:[],
    filteredEntries:filteredEntries ? filteredEntries : [],
    isEditing:false,
    editEntrieId:'',
    entry:{},
    hide:false,
    
    }

    const AppContext = React.createContext()

    const AppProvider = ({children})=>{
        const [state, dispatch] = useReducer(reducer,initialState)

        const displayAlert =() =>{
        dispatch({type:DISPLAY_ALERT})
        clearAlert()
        }

        const clearAlert = () => {
        setTimeout(() => {
            dispatch({
            type: CLEAR_ALERT,
            })
        }, 3000)
        }

        const addUserToLocalStorage = ({user, token})=>{
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token',token)
        }

        const removeUserFromLocalStorage = ()=>{
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        }

        const loginUser = async(currentUser)=>{
            dispatch({type:LOGIN_REQUEST})
            try {
                const {data} = await axios.post('/api/v1/auth/login',currentUser)
                const {user,token} = data
                dispatch({
                type:LOGIN_SUCCESS,
                payload:{user,token}
            })
            addUserToLocalStorage({user,token})
            } catch (error) {
                dispatch({
                    type:LOGIN_FAIL,
                    payload:{msg:error.response.data.msg}
                })
            }
            clearAlert()
        }

        const logout = ()=>{
            dispatch({
              type:LOGOUT
            })
            removeUserFromLocalStorage()
          }

          const getEntries = async()=>{
            const {page} = state
            let url = `/api/v1/entries?page=${page}`
            dispatch({type:GET_ENTRIES_REQUEST})
            try {
                const {data} = await axios.get(url)
                const {entries,totalEntries,numPages} = data
                dispatch({
                    type:GET_ENTRIES_SUCCESS,
                    payload:{entries,totalEntries,numPages}
                })
                // localStorage.setItem('entries', JSON.stringify(entries))
            } catch (error) {
                dispatch({
                    type:GET_ENTRIES_FAIL,
                    payload: { msg: error.response.data.msg }
                })
            }
          }

        

          const getEntry = async(id)=>{
            dispatch({type:GET_ENTRY_REQUEST})
            try {
              const {data} = await axios.get(`/api/v1/entries/${id}`, {
                headers:{
                  Authorization:`Bearer ${token}`
                }
            })
              const {entry} = data
              dispatch({
                type:GET_ENTRY_SUCCESS,
                payload:entry
              })
            } catch (error) {
              dispatch({
                type: GET_ENTRY_FAIL,
              payload: { msg: error.response.data.msg },
              })
            }
          }

          const createEntry = async(currentEntry)=>{
    
            dispatch({type:CREATE_ENTRY_REQUEST})
              try {
                
                const{data} = await axios.post('/api/v1/entries', currentEntry, {
                headers:{
                  Authorization:`Bearer ${token}`
                }})
                const {entry} = data
                dispatch({
                  type:CREATE_ENTRY_SUCCESS,
                  payload:entry
                })
                dispatch({ type: CLEAR_VALUES });
                
              } catch (error) {
                if (error.response.status === 401) return;
                dispatch({
                  type: CREATE_ENTRY_FAIL,
                payload: { msg: error.response.data.msg },
                }) 
              }
          }

          const updateEntry = async ({entryId,title,description,image,customerWebsite}) => {
            dispatch({ type: UPDATE_ENTRY_REQUEST });
        
            try {
              const {data} = await axios.patch(`/api/v1/entries/${entryId}`,{title,description,image,customerWebsite},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
              }) 
              const {entry} = data
        
              dispatch({ type: UPDATE_ENTRY_SUCCESS,payload:entry});
              dispatch({ type: CLEAR_VALUES });
            } catch (error) {
              // if (error.response.status === 401) return;
              dispatch({
                type: UPDATE_ENTRY_FAIL,
                payload: { msg: error.response.data.msg },
              });
            }
            clearAlert();
          };


          const deleteEntry = async (id) => {
            dispatch({ type: DELETE_ENTRY_REQUEST });
        
            try {
              await axios.delete(`/api/v1/entries/${id}`,
              {
                headers:{
                    Authorization:`Bearer ${token}`
                }
              }) 
              dispatch({ type: DELETE_ENTRY_SUCCESS});
              
            } catch (error) {
              dispatch({
                type: DELETE_ENTRY_FAIL,
                payload: { msg: error.response.data.msg },
              });
            }
            
          };

          const hide = async(id)=>{
            filteredEntries = [...state.filteredEntries]
            // console.log(typeof id);
            if(!filteredEntries){
              // console.log('NO FILTERED ENTRIES');
              filteredEntries = [...state.filteredEntries, id]
              localStorage.setItem('filteredEntries',filteredEntries)
              dispatch({type:HIDE_ENTRY, payload:filteredEntries})
              
            }
            else if(filteredEntries && !filteredEntries.includes(id)){
            const newArray = [...state.filteredEntries,id]
            // console.log('hide FILTERED ENTRIES MODIFIED',newArray);
            dispatch({type:HIDE_ENTRY, payload:newArray})
            const stringArr = JSON.stringify(newArray)
            localStorage.setItem('filteredEntries',stringArr)  
            }else{
              // console.log('hide FILTERED ENTRIES',filteredEntries);
              dispatch({type:HIDE_ENTRY, payload:filteredEntries})
            }
          }

          const show = async(id)=>{
            // console.log(typeof filteredEntries);
            filteredEntries = [...state.filteredEntries]
            // console.log('show FILTERED ENTRIES',filteredEntries)
            if(filteredEntries.includes(id)){
            const newArray= filteredEntries.filter(entryId=>entryId !== id)
            // console.log('show FILTERED ENTRIES MODIFIED',newArray);
            dispatch({type:SHOW_ENTRY, payload:newArray})
            const stringArr = JSON.stringify(newArray)
            localStorage.setItem('filteredEntries',stringArr)
          }else{
            dispatch({type:SHOW_ENTRY, payload:filteredEntries})
          }
        }

        const changePage=(page)=>{
          dispatch({
            type:CHANGE_PAGE, payload:{page}
          })
        }

          const clearValues = () => {
            dispatch({ type: CLEAR_VALUES });
          };

        return (
            <AppContext.Provider value={{
                ...state,
                displayAlert,
                loginUser,
                logout,
                getEntries,
                createEntry,
                clearValues,
                updateEntry,
                getEntry,
                deleteEntry,
                hide,
                show,
                changePage

            }}>{children}</AppContext.Provider>
        )

    }


    export const useAppContext = () => {
        return useContext(AppContext)
    }

    export  { AppProvider }