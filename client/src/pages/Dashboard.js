import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Dashboard = () => {
  const navigate = useNavigate()

  const addEntry = ()=>{
    navigate('/add-entry')
  }

  return (
    <Wrapper>
      <div className='container'>
        <div className="add-entry">
          <button onClick={addEntry} className="btn">Add New Entry</button>
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

`

export default Dashboard
