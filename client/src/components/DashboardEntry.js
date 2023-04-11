import React, { useState,useEffect } from 'react'
import styled from 'styled-components'
import { useAppContext } from '../context/appContext'
import { Link, useNavigate } from 'react-router-dom'


const DashboardEntry = ({...entry}) => {
  const navigate = useNavigate()
  const {_id,title,description,image, customerWebsite} = entry
  const{deleteEntry,hide,show} = useAppContext()
 

  const hideEntry = ()=>{

    hide(_id)
  }
  const showEntry = ()=>{
   show(_id)
  }

  const handleDeleteEntry = ()=>{
    deleteEntry(_id)
    setTimeout(()=>{
      navigate('/dashboard')
      window.location.reload(false);
    },)
  }


  return (
    <Wrapper>
      <div className='dashboard-entry' >
        <img  src={image} alt="" />
        <div className="title-container">
        <p className='title'>{title}</p>
        </div>
        
        <Link className='btn' to={`/edit-entry/${_id}`} state={entry}>Update Entry</Link>
      
        <button onClick={hideEntry}  className='btn'>Hide Entry </button>
        <button onClick={showEntry} className='btn'>Show Entry</button>
        <button onClick={handleDeleteEntry}  className='btn btn-danger'>Delete Entry</button>
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
  row-gap:.5rem;
  padding:1rem;
  }
  img{
    width:100%;
    height:15rem;
    object-fit:cover;
  }
  
  .title{
    font-weight:700;
  }
  p{
    margin-bottom:0;
  }
    
  .btn,
  .title-container{
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:var(--smal-text);
    font-weight:400;
  }
  
  @media screen and (min-width: 768px){
    .dashboard-entry{
     max-height:5rem;
     display:grid;
     grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr;
     padding:.5rem;
     column-gap:.5rem;
    }
    img{
        height:4rem;
        object-fit:cover;
    }
  }

`

export default DashboardEntry