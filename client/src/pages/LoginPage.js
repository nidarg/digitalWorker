import {useState,useEffect}from 'react'
import { useNavigate } from 'react-router-dom'
import {Alert} from '../components'
import styled from 'styled-components'
import { useAppContext } from '../context/appContext'

const initialState = {
  email:'',
  password:''
}
const LoginPage = () => {

  const [values, setValues] = useState(initialState)
  const {isLoading, user, showAlert, loginUser, displayAlert} = useAppContext()

  const navigate = useNavigate()

  const handleChange = (e)=>{
    setValues({...values, [e.target.name]:e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    const {email, password} = values
    if(!email || !password){
      displayAlert()
      return
    }
    const currentUser = {email,password}
    loginUser(currentUser)
  }

  useEffect(()=>{
    if(user){
      setTimeout(()=>{
        navigate('/dashboard')
        window.location.reload(false)
      },1000)
    }
  },[user,navigate])

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h3>Login</h3>
        {showAlert && <Alert/>}
        <div className="form-row">
          <label className='form-label' htmlFor="email">Email</label>
          <input id="email" name="email"className='form-input' type="email" value={values.email} onChange={handleChange} placeholder='admin@example.com'/>
        </div>
        <div className="form-row">
          <label className='form-label'  htmlFor="password">Password</label>
          <input name="password" id = "password" className='form-input' type="password" value={values.password} onChange={handleChange} placeholder='admin'/>
        </div>
        <button type='submit' disabled = {isLoading} className='btn btn-block'>
          submit
        </button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  min-height:100vh;
  display: grid;
  align-items: center;
  .form {
    max-width: 60rem;
    border-top: 5px solid var(--primary-medium);
  }
  h3 {
    text-align: center;
  }
  .btn-block{
    width:100%;
  }
  .btn {
    margin-top: 1rem;
  }

`

export default LoginPage
