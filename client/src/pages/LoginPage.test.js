
import {render, screen, waitFor} from '@testing-library/react'
import user from '@testing-library/user-event'
import LoginPage from './LoginPage'
import { AppProvider } from '../context/appContext'
import { BrowserRouter, Router } from 'react-router-dom';

test('it shows two inputs and a button', ()=>{
    render(<AppProvider value={false}><BrowserRouter><LoginPage/></BrowserRouter></AppProvider>)

    const textInput = screen.getByRole('textbox');
    const passwordInput = screen.getByLabelText(/password/i)
    const button = screen.getByRole('button');

    expect(textInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
})

test('it calls loginUser when the form is submitted', async()=>{
    const onSubmit = jest.fn()
    render(<AppProvider value={false}><BrowserRouter><LoginPage handleSubmit={onSubmit}/></BrowserRouter></AppProvider>)
   
  
    // screen.logTestingPlaygroundURL()
   

    const textInput = screen.getByRole('textbox',{name:/email/i});
    const passwordInput = screen.getByLabelText('Password')
    const button = screen.getByRole('button');

    // await user.click(textInput)
    await user.type(textInput,'admin@example.com')
    // await user.click(passwordInput)
    await user.type(passwordInput,'admin')
   await user.click(button)

    await waitFor(()=>{expect(onSubmit).toHaveBeenCalledTimes(1)})
    expect(onSubmit).toHaveBeenCalledWith({email:'admin@example.com', password:'admin'})
})