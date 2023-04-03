import React from 'react'
import { useAppContext } from '../context/appContext'
import styled from 'styled-components'

const Paginate = () => {
  const {numPages,page, changePage} = useAppContext()
  return ( numPages > 1 && (
    <Wrapper>
      <div className="page-btn-container">
       {[...Array(numPages).keys()].map(x=>(
        <button className={x+1===page ? 'btn btn-active' : 'btn '} 
          key={x}
          onClick = {()=>changePage(x+1)}>
            {x+1}
        </button>
       ))
       }
      
      </div>
    </Wrapper>
    )
  )
   
}



const Wrapper = styled.section`

.page-btn-container {
  margin-top:10rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

  // .btn {
  //   cursor: pointer;
  //   color: var(--white);
  //   background: var(--primary-medium);
  //   border: transparent;
  //   border-radius: var(--borderRadius);
  //   letter-spacing: var(--letterSpacing);
  //   padding: 0.4rem 0.8rem;
  //   box-shadow: var(--shadow-2);
  //   transition: var(--transition);
  //   text-transform: capitalize;
  //   display: inline-block;
  //   text-align:center;
  //   font-family: var(--headingFont);
  // }

.btn-active{
  background: var(--primary-dark);
  box-shadow: var(--shadow-3);
}

`

export default Paginate