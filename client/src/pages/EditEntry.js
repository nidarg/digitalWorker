import {useState,useEffect,useRef}from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import {Alert} from '../components'
import styled from 'styled-components'
import { useAppContext } from '../context/appContext'
import axios from 'axios'


const EditEntry = () => {
  
  const {getEntry,isLoading, showAlert, updateEntry, displayAlert} = useAppContext()
  
  const location = useLocation()
  const navigate = useNavigate()

  const [values, setValues] = useState({})
  console.log('VALUES', values);
  console.log('TITLE', values.title);
  const [image,setImage] = useState('')
  const [entryId, setEntryId] = useState('')
  useEffect(()=>{
    console.log('LOCATION', location);
    
    
      setValues({title:location.state.title,description:location.state.description,customerWebsite:location.state.customerWebsite})
      setImage(location.state.image)
      setEntryId(location.state._id)
  },[location]) 
  


  // const [values, setValues] = useState(initialState)
  // console.log('VALUES', values);
  // console.log('TITLE', values.title);
  // const [image,setImage] = useState(entry.image)
  const[isAdded,setIsAdded] = useState(false)
  const[isChanged,setIsChanged] = useState(false)

  // useEffect(()=>{
  //   setValues(initialState)
  // },[render])

  const handleChange = async(e) => {
      setValues({...values, [e.target.name] : e.target.value})

  }

  const handleChangeImage = async(e)=>{
      const formData = new FormData()
      formData.append('image', image)
      if(isChanged){
        try {
          const {data} = await axios.post('/api/v1/entries/uploads', formData,{
            headers:{
              'Content-Type':'multipart/form-data'
            }
          })
          
          setImage(data)
          
        } catch (error) {
          setImage('')
        }
      }else{
        setImage(image)
      }
      setIsAdded(true)
    }

  const submitHandler = async(e)=>{
    e.preventDefault()
    await handleChangeImage()
    // setRerender(false)
    const {title,description,customerWebsite} = values
    if(!title || !description || !customerWebsite ||!image){
      displayAlert()
      return
    }
}
 

  useEffect(()=>{
    const {title,description,customerWebsite} = values
    if(isAdded){
      updateEntry({entryId,title,description,image,customerWebsite})
      setTimeout(()=>{
        navigate('/dashboard')
        window.location.reload(false);
      })
    }
  },[isAdded])

  return (
    <Wrapper>
      <form onSubmit={submitHandler} className="form">
        <h3>Edit Entry</h3>
        {showAlert && <Alert/>}
          <>
              <div className="form-row">
              <label className='form-label' htmlFor="title">Title</label>
              <input id="title" name="title" className='form-input' type="text" value={values.title} onChange={handleChange} />
              </div>
              <div className="form-row">
              <label className='form-label'  htmlFor="description">Description</label>
              <input name="description" id = "description" className='form-input' type="text" value={values.description}  onChange={handleChange} />
              </div>


             <div className="form-row">
              <label className='form-label'  htmlFor="image">Image</label>
              <div className='input-image'>
                <img src={image} alt="" />
              </div>

              {/* <input name="image" id = "image" placeholder='Enter image url'className='form-input' type="text" value={firstImage}  onChange={handleChange}/> */}
              <input name="image" id = "image" className='form-input' type="file" accept='image/*'  onChange={(e)=>{
                setImage(e.target.files[0])
                setIsChanged(true)
                }} />
              </div> 

              <div className="form-row">
              <label className='form-label'  htmlFor="customerWebsite">Customer Website</label>
              <input name="customerWebsite" id = "customerWebsite" className='form-input' type="text" value={values.customerWebsite}  onChange={handleChange} />
              </div>


              <button type='submit' disabled = {isLoading} className='btn btn-block'>
              submit
              </button>
          </>

        
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
  img{
    height:5rem;
    width:5rem;
    object-fit:cover;
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

  @media screen and (max-width: 768px){
    .form{
      margin-top:30rem;
    }
  }

`


export default EditEntry
