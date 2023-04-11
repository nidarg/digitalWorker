import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const Entry = ({_id,title,description,image,customerWebsite}) => {
  
  return (
    <Wrapper>
      <div className='entry'>
        <img crossorigin="anonymous" src={image} alt="" />
        <h5 className='title'>{title}</h5>
        <p className='description'>{description}</p>
        <a href={customerWebsite} rel='noopener' target="_blank">
          <button className='btn btn-full-width'>{customerWebsite}</button></a>
      </div>
    </Wrapper>
    
  )
}

const Wrapper = styled.section`

  
.entry{
  background:var(--white);
  min-width:80vw;
  max-height:50rem;
display:grid;
grid-template-columns:1fr;
padding:1rem;
}
img{
  width:100%;
  height:18rem;
  object-fit:cover;
}

.title{
  text-align:center;
  font-weight:700;
}

.description{
  font-size:var(--small-text);
}


@media screen and (min-width: 1120px){
  .entry{
   min-width:50vw;
  }
  img{
    height:24rem;
  }
  
}
@media screen and (min-width: 768px){
  .entry{
   min-width:40vw;
  }
  
}

`

export default Entry