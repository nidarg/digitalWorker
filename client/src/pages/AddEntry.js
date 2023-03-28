import {useState,useEffect}from 'react'
import { useNavigate } from 'react-router-dom'
import {Alert,Loading} from '../components'
import styled from 'styled-components'
import { useAppContext } from '../context/appContext'
import axios from 'axios'


const AddEntry = () => {

  const [image,setImage] = useState('')
  const[isUploaded, setIsUploaded] = useState(false)
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [customerWebsite,setCustomerWebsite] = useState('')
  // const [values, setValues] = useState(initialState)
  const {isLoading, showAlert, createEntry, displayAlert,getEntries} = useAppContext()

  const navigate = useNavigate()

  const handleChangeImage = async(e)=>{
    const formData = new FormData()
    formData.append('image', image)
    try {
      const {data} = await axios.post('/api/v1/entries/uploads', formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })
      // return data
      setImage(data)
      setIsUploaded(true)
      setTimeout(()=>{
       
        navigate('/dashboard')
        window.location.reload(false);
      },)
    } catch (error) {
      setImage('')
    }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    await handleChangeImage()
    
    if(!title || !description || !image || !customerWebsite){
      displayAlert()
      return
    }
    
  }

  useEffect(()=>{
    console.log(image);
    if(isUploaded){
      createEntry({title,description,image,customerWebsite})
      
    }
    
    
  },[isUploaded])

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h3>Add Entry</h3>
        {showAlert && <Alert/>}
        {isLoading && <Loading/>}
        <div className="form-row">
          <label className='form-label' htmlFor="title">Title</label>
          <input id="title" name="title"className='form-input' type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
        </div>
        <div className="form-row">
          <label className='form-label'  htmlFor="description">Description</label>
          <input name="description" id = "description" className='form-input' type="text" value={description} onChange={(e)=>setDescription(e.target.value)} />
        </div>


        <div className="form-row">
          <label className='form-label'  htmlFor="image">Image</label>
          {/* <input name="image" id = "image" placeholder='Enter image url'className='form-input' type="text" value={image} onChange={(e)=>setImage(e.target.files[0])} /> */}
          <input name="image" id = "image" className='form-input' type="file" accept='image/*'  onChange={(e)=>{setImage(e.target.files[0])}} />
        </div>

        <div className="form-row">
          <label className='form-label'  htmlFor="customerWebsite">Customer Website</label>
          <input name="customerWebsite" id = "customerWebsite" className='form-input' type="text" value={customerWebsite} onChange={(e)=>setCustomerWebsite(e.target.value)} />
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
  @media screen and (max-width: 768px){
    .form{
      margin-top:30rem;
    }
  }

`


export default AddEntry
