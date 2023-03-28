import { useState } from "react"
import { Link } from "react-router-dom"
import styled from 'styled-components'
import { useAppContext } from "../context/appContext"
import {FaUserCircle, FaCaretDown} from 'react-icons/fa'
import Logo from './Logo'


const Navbar = () => {
  const[showLogout, setShowLogout] = useState(false)
  const {user,logout} = useAppContext()
  return (
    <Wrapper>
      <nav className="nav">
        <div className="nav-center">
          <Link to='/'><Logo/></Link>
          
          {user ? (
            <div className="nav-links">
            <div className='btn-container'>
              <button type='button' className='btn' onClick={() => setShowLogout(!showLogout)}>
                <FaUserCircle />
                {user && 'ADMIN'}
                <FaCaretDown />
                
              </button>
              <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                <button type='button'
                  onClick={logout}
                  className='dropdown-btn'
                >
                  logout
                </button>
              </div>
            </div>
            
            <Link to='/dashboard'><button  className="btn">
              Dashboard
              </button> </Link>
            </div>
          ):(
            <Link to='/dashboard' ><button className="btn">
           Dashboard
            </button></Link>
          )}
        </div>
        
      </nav>
   </Wrapper>
  )
}

const Wrapper = styled.nav`
  // width:100%;
  .nav{
    height: 22rem;
    display:grid;
    align-items:center;
    justify-items:center;
    box-shadow: var(--shadow-2);
    background:var(--nav-background);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .nav-center{
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    width: 90vw;
    gap:2rem;
  }
  .nav-links{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-between;
    gap:4rem;
  }
  .btn-container {
    position: relative;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    padding:.5rem;
    font-size:1.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
  }
  .dropdown {
    position: absolute;
    top: 50px;
   
    left: 0;
    width: 100%;
    background: var(--primary-medium);
    box-shadow: var(--shadow-2);
    padding: 0.3rem;
    text-align: center;
    visibility: hidden;
    border-radius: var(--borderRadius);
   
    
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: var(--white);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
    font-size:1.5rem;
    
  }
  @media screen and (min-width: 768px){
    .nav{
      height: var(--nav-height);
    }
    .nav-center{
      display: flex;
      flex-direction:row;
      width: 90vw;
      align-items: center;
      justify-content: space-between;
    }
    .nav-links{
      display:flex;
      flex-direction:row;
      align-items:center;
      justify-content:space-between;
      
    }
    .btn-container {
      position: relative;
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0 0.5rem;
      position: relative;
      box-shadow: var(--shadow-2);
      font-size: 1.1rem;
    }
    .dropdown {
      position: absolute;
      top: 40px;
      left: 0;
      width: 100%;
      background: var(--primary-medium);
      box-shadow: var(--shadow-2);
      padding: 0.2rem;
      text-align: center;
      visibility: hidden;
      border-radius: var(--borderRadius);
    }
    .show-dropdown {
      visibility: visible;
    }
    .dropdown-btn {
      background: transparent;
      border-color: transparent;
      color: var(--white);
      letter-spacing: var(--letterSpacing);
      text-transform: capitalize;
      cursor: pointer;
      font-size: 1rem;
    }
  }
  
`

export default Navbar