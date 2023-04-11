import React from 'react';
import {render, screen, waitFor} from '@testing-library/react'
import user from '@testing-library/user-event'
import AddEntry from './AddEntry'
import { AppProvider } from '../context/appContext'
import { BrowserRouter} from 'react-router-dom';
import {rest} from 'msw'



describe('test add entry',()=>{
    test('render four inputs and a submit button', async()=>{

        render(<AppProvider><BrowserRouter><AddEntry/></BrowserRouter></AppProvider>)
       
        const allTextInputs = screen.getAllByRole('textbox')
        const imageInput = screen.getByLabelText(/image/i)
        const submitButton = screen.getByRole('button')
    
       await waitFor(()=>expect(allTextInputs).toHaveLength(3))
       await waitFor(()=>expect(imageInput).toBeInTheDocument())
      
        expect(submitButton).toBeInTheDocument()
    })

    const upload = jest.fn()
    rest.post('/api/v1/entries/uploads',upload)
    const resolver = jest.fn()
    rest.post('/api/v1/entries',resolver)

    test('upload file',async()=>{
        render(<AppProvider><BrowserRouter ><AddEntry/></BrowserRouter></AppProvider>)
        const file = new File(['hello'], 'hello.png', {type: 'image/png'})
        const imageInput = screen.getByLabelText(/image/i)
        await user.upload(imageInput,file)

        expect(imageInput.files[0]).toStrictEqual(file)
        expect(imageInput.files.item(0)).toStrictEqual(file)
        expect(imageInput.files).toHaveLength(1)
    })
    
    test('render inputs values', async()=>{
        render(<AppProvider><BrowserRouter ><AddEntry/></BrowserRouter></AppProvider>)

        const file = new File(['hello'], 'hello.png', {type: 'image/png'})
        const titleInput = screen.getByRole('textbox',{name:/title/i})
        const descriptionInput = screen.getByRole('textbox',{name:/description/i})
        const customerWebsiteInput = screen.getByRole('textbox',{name:/customer Website/i})
        const imageInput = screen.getByLabelText(/image/i)
        const submitButton = screen.getByRole('button')

        await user.type(titleInput,'new title')
        await user.type(descriptionInput,'new description')
        await user.upload(imageInput,file)
        await user.type(customerWebsiteInput,'new customer website')
        await user.click(submitButton)
         
        await waitFor(()=>expect(titleInput).toHaveValue('new title'))
        await waitFor(()=>expect(descriptionInput).toHaveValue('new description'))
        await waitFor(()=>expect(customerWebsiteInput).toHaveValue('new customer website'))

    })
})