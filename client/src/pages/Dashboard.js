import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAppContext } from '../context/appContext'
import { Alert,Entry,Loading } from '../components'

const Dashboard = () => {
  const {getEntries, isLoading, entries, showAlert} = useAppContext()
  const navigate = useNavigate()
  const addEntry = ()=>{
    navigate('/add-entry')
  }

  useEffect(()=>{
    getEntries()
  },[])

  return (
    <Wrapper>
      <div className='container'>
        {isLoading && <Loading/>}
      {showAlert && <Alert/>}
        <div className="add-entry">
          <button onClick={addEntry} className="btn">Add New Entry</button>
        </div>
        <div className="entries">
          {entries.map(entry=>{
            return <Entry key={entry._id} {...entry}/>
          })}
        </div>
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
  .add-entry{
    background:var(--primary-medium)
  }

  .entries{
    display:grid;
    grid-template-columns:1fr;
  }

  @media(min-width:768px){
   
    .entries{
      grid-template-rows:1fr;
    }
  }

`

export default Dashboard
