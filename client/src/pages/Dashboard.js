import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAppContext } from '../context/appContext'
import { Alert,DashboardEntry,Loading, Paginate} from '../components'

const Dashboard = () => {
  const {getEntries, isLoading, entries, showAlert,clearValues,page} = useAppContext()
  const navigate = useNavigate()
  const addEntry = ()=>{
    navigate('/add-entry')
  }

  useEffect(()=>{
    getEntries()
     clearValues()
  },[page])

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
            return <DashboardEntry key={entry._id} {...entry}/>
          })}
        </div>
        <Paginate/>
      </div>
    
    </Wrapper>
  )
}

const Wrapper = styled.section`
.container{
  width:90vw;
  margin:0 auto;
  min-height:100vh;
  display:flex;
  flex-direction:column;
  align-items:center;
 
}

.add-entry{
  margin-top:25rem;
}

.entries{
  margin-top:5rem;
  width:100%;
  display:grid;
  grid-template-rows: 1fr; 
  // justify-items:center;
  align-items:center;
  row-gap:10rem;
}

@media screen and (min-width: 768px){
  .add-entry{
    margin-top:10rem;
  }
   .entries{
    margin-top:5rem;
    display:grid;
    grid-template-rows: 1fr ;
    
    row-gap:2rem;
   }
    
}
`

export default Dashboard