import {Link} from 'react-router-dom'
import styled from 'styled-components'
import img from '../assets/not-found.svg'

import React from 'react';
const ErrorPage = () => {
  return (
    <Wrapper className='full-page'>
      <div className='container'>
        <img className='img' src={img} alt="not found" />
        <h3>Ohh! page not found</h3>
        <p>We can't seem to find page you are looking for</p>
        <Link to = '/' >Back Home</Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
.full-page {
  min-height: 100vh;
}
.container{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:column;
}

  img {
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
    padding-top:30rem;
  }
 
  h3 {
    margin-top:3rem;
    margin-bottom: 0.5rem;
    font-size:var(--small-text)
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size:var(--extra-small-text)
    
  }
  a {
    color: var(--primary-medium);
    text-decoration: underline;
    text-transform: capitalize;
  }

  @media screen and (min-width: 768px){
    img{
      padding-top:15rem;
    }
    h3{
      font-size:1.5rem;
      margin-top:1.2rem;
    }
    p{
      font-size:1.1rem;
    }
  }
`

export default ErrorPage
