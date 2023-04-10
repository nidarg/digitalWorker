
import {render, screen, waitFor} from '@testing-library/react'
import user from '@testing-library/user-event'
import LoginPage from './LoginPage'
import { AppProvider } from '../context/appContext'
import { BrowserRouter} from 'react-router-dom';
import {rest} from 'msw'

test('it shows two inputs and a button', ()=>{
    render(<AppProvider value={false}><BrowserRouter><LoginPage/></BrowserRouter></AppProvider>)

    const textInput = screen.getByRole('textbox');
    const passwordInput = screen.getByLabelText(/password/i)
    const button = screen.getByRole('button');

    expect(textInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
})

const resolver = jest.fn()
rest.post('/api/v1/auth/login',resolver)
test('it calls loginUser when the form is submitted', async()=>{
    
    render(<AppProvider value={false}><BrowserRouter><LoginPage/></BrowserRouter></AppProvider>)
   
  
    // screen.logTestingPlaygroundURL()
    
    const textInput = screen.getByRole('textbox',{name:/email/i});
    const passwordInput = screen.getByLabelText('Password')
    const button = screen.getByRole('button');

    // await user.click(textInput)
    await user.type(textInput,'admin@example.com')
    // await user.click(passwordInput)
    await user.type(passwordInput,'admin')
   await user.click(button)

    // eslint-disable-next-line testing-library/await-async-utils
    waitFor(()=>expect(resolver).toHaveBeenCalledTimes(1)) 
    // eslint-disable-next-line testing-library/await-async-utils
    waitFor(()=>expect(resolver).toHaveBeenCalledWith({email:'admin@example.com', password:'admin'}))
})