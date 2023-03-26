import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAppContext } from '../context/appContext'
import { Alert,Entry,Loading } from '../components'

const Home = () => {
  
    const {getEntries, isLoading, entries, showAlert,page} = useAppContext()
    const navigate = useNavigate()
    
    useEffect(()=>{
       // eslint-disable-next-line
      getEntries()
    },[page])
  
    return (
      <Wrapper>
        <div className='container'>
        {showAlert && <Alert/>}
        {isLoading && <Loading/>}
        {entries && (
          <div className="entries">
          {entries.map(entry=>{
            return <Entry key={entry._id} {...entry}/>
          })}
        </div>
        )}
          
        </div>
      </Wrapper>
    )
  }
   
  const Wrapper = styled.section`
.container{
  display:flex;
  justify-content:center;
  margin-top:4rem;
}
`

export default Home
