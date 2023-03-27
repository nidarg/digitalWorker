import React from 'react'
import styled from 'styled-components'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'

const DashboardEntry = ({_id,title,description,image,customerWebsite}) => {
  const navigate = useNavigate()
  

  const handleUpdateEntry = ()=>{
    navigate(`/edit-entry/${_id}`)
  }

  const handleHideEntry = ()=>{
    
  }

  const handleDeleteEntry = ()=>{
    
  }


  return (
    <Wrapper>
      <div className='dashboard-entry' >
        <img src={image} alt="" />
        <p className='title'>{title}</p>
        {/* <p className='description'>{description}</p> */}
        {/* <p className="customerWebsite">{customerWebsite}</p> */}
        <button onClick={handleUpdateEntry} className='btn'>Update Entry</button>
        <button onClick={handleHideEntry}  className='btn'>Hide Entry</button>
        <button onClick={handleDeleteEntry}  className='btn'>Delete Entry</button>
      </div>
    </Wrapper>
    
  )
}

const Wrapper = styled.section`
.dashboard-entry{
    background:var(--white);
    min-width:80vw;
    max-height:35rem;
  display:grid;
  grid-template-columns:1fr;
  padding:1rem;
  row-gap:.5rem;
  }
  img{
    width:100%;
    height:15rem;
    object-fit:cover;
  }
  
  .title{
    text-align:center;
    font-weight:700;
  }
    
  }
  @media screen and (min-width: 768px){
    .dashboard-entry{
     max-height:5rem;
     display:grid;
     grid-template-columns:2fr 1fr 1fr 1fr 1fr;
     padding:.5rem;
     column-gap:.5rem;
    }
    img{
        height:4rem;
    }
  }

`

export default DashboardEntry