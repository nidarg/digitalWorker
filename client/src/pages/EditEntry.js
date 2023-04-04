import {useState,useEffect}from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import {Alert} from '../components'
import styled from 'styled-components'
import { useAppContext } from '../context/appContext'
import axios from 'axios'


const EditEntry = () => {
  const {id:entryId} = useParams()

  const {entry,getEntry,isLoading, showAlert, updateEntry, displayAlert} = useAppContext()

  const navigate = useNavigate()
  const[isAdded, setIsAdded] = useState(false)

  useEffect(()=>{
    getEntry(entryId)
  },[entryId])

  const {title, description, image, customerWebsite} = entry
  console.log(title, description );
  const [entryImage,setEntryImage] = useState(image)
  
  const [entryTitle,setEntryTitle] = useState(title)
  const [entryDescription,setEntryDescription] = useState(description)
  const [entryCustomerWebsite,setEntryCustomerWebsite] = useState(customerWebsite)

  const handleChangeImage = async(e)=>{
    if(image !== entry.image){
      console.log('image !== entry.image');
      const formData = new FormData()
    formData.append('image', image)
    try {
      const {data} = await axios.post('/api/v1/entries/uploads', formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })
      // return data
      setEntryImage(data)
    } catch (error) {
      setEntryImage('')
    }
    }
      setIsAdded(true)
    
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    await handleChangeImage()
    
    if(!entryId || !entryTitle || !entryDescription || !entryImage || !entryCustomerWebsite){
      displayAlert()
      return
    }

    // setTimeout(()=>{
    //   navigate('/dashboard')
    //   // window.location.reload(false);
    // },2000)
  }

  useEffect(()=>{
    if(isAdded){
      updateEntry({entryId,entryTitle,entryDescription,entryImage,entryCustomerWebsite})
    }
  },[isAdded])

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h3>Edit Entry</h3>
        {showAlert && <Alert/>}
       
         
          
 <>
<div className="form-row">
<label className='form-label' htmlFor="title">Title</label>
<input id="title" name="title"className='form-input' type="text" value={entryTitle}  onChange={(e)=>setEntryTitle(e.target.value)} />
</div>
<div className="form-row">
<label className='form-label'  htmlFor="description">Description</label>
<input name="description" id = "description" className='form-input' type="text" value={entryDescription} onChange={(e)=>setEntryDescription(e.target.value)} />
</div>


<div className="form-row">
<label className='form-label'  htmlFor="image">Image</label>
<div className='input-image'>
  <img src={entryImage} alt="" />
</div>

{/* <input name="image" id = "image" placeholder='Enter image url'className='form-input' type="text" value={image}  /> */}
<input name="image" id = "image" className='form-input' type="file" accept='image/*'  onChange={(e)=>{setEntryImage(e.target.files[0])}} />
</div>

<div className="form-row">
<label className='form-label'  htmlFor="customerWebsite">Customer Website</label>
<input name="customerWebsite" id = "customerWebsite" className='form-input' type="text" value={entryCustomerWebsite} onChange={(e)=>setEntryCustomerWebsite(e.target.value)} />
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
