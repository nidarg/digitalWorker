import React from 'react'
import styled from 'styled-components'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'

const Entry = ({_id,title,description,image,customerWebsite}) => {
  const navigate = useNavigate()
  const {isDashboard} = useAppContext()

  const handleUpdateEntry = ()=>{
    navigate(`/edit-entry/${_id}`)
  }

  const handleHideEntry = ()=>{
    
  }

  const handleDeleteEntry = ()=>{
    
  }


  return (
    <Wrapper>
      <div className={isDashboard ? 'dashboard-entry' : 'entry'}>
        <img src={image} alt="image" />
        <p className='title'>{title}</p>
        <p className={isDashboard ? 'not-show' : 'description'}>{description}</p>
        <p className="customerWebsite">{customerWebsite}</p>
        <button onClick={handleUpdateEntry} className={isDashboard ? 'btn' : 'not-show'}>Update Entry</button>
        <button onClick={handleHideEntry}  className={isDashboard ? 'btn' : 'not-show'}>Hide Entry</button>
        <button onClick={handleDeleteEntry}  className={isDashboard ? 'btn' : 'not-show'}>Delete Entry</button>
      </div>
    </Wrapper>
    
  )
}

const Wrapper = styled.section`

img{
  object-fit: cover;
}
  .dashboard-entry,
  .entry{
    background:var(--white);
    width:30rem;
    height:20rem;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center
    
  }

  @media(min-width:768px){
   
    .dashboard-entry{
      flex-direction: row;
    }
  }

`

export default Entry
