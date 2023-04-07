import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAppContext } from '../context/appContext'
import { Alert,Entry,Loading,Paginate } from '../components'

const Home = () => {
  
    const {getEntries, isLoading, entries, showAlert,page, filteredEntries} = useAppContext()
    const navigate = useNavigate()
    
    // console.log('FILTEREDENTRIES',filteredEntries);
    // console.log('FILTERED ENTRIES TYPE', typeof(filteredEntries));
    useEffect(()=>{
       // eslint-disable-next-line
        getEntries()  
    },[page,filteredEntries])
  
    return (

      <Wrapper >
        <div className='container'>
        {showAlert && <Alert/>}
        {isLoading && <Loading/>}
        
          {entries && (
            <div className="entries">
            {entries.map(entry=>{
              if(filteredEntries && filteredEntries.includes(entry._id)){
                return 
              }
              return <Entry key={entry._id} {...entry}/>
            })}
          </div>
        )}      
         <Paginate/>
        </div>
       
      </Wrapper>
      
    )
    
  }
   
  const Wrapper = styled.div`

  .hide{
    visibility:hidden;
  }
.container{
  width:90vw;
  margin:0 auto;
  min-height:100vh;
  display:flex;
  flex-direction:column;
  align-items:center;
}
.entries{
  margin-top:30rem;
  width:100%;
  display:grid;
  grid-template-rows: 1fr; 
  // justify-items:center;
  align-items:center;
  row-gap:4rem;
}

@media screen and (min-width: 768px){
   .entries{
    margin-top:15rem;
    display:grid;
    grid-template-columns: 1fr 1fr;
    column-gap:4rem;
   }
    
}

`

export default Home