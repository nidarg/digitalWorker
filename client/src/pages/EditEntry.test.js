import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {render, screen, waitFor} from '@testing-library/react'
import user from '@testing-library/user-event'
import EditEntry from './EditEntry'
import { AppProvider } from '../context/appContext'
import { BrowserRouter} from 'react-router-dom';
import {rest} from 'msw'

describe('test edit entry',()=>{
    test('render four inputs and a submit button', async()=>{

        render(<AppProvider><MemoryRouter initialEntries={[{pathname: "/edit-entry/1",
        search: "",
        hash: "",
        state: {_id:1,title:"title",description:"description", image:"image", customerWebsite:"customer website"},
        key: "default",}]}><EditEntry/></MemoryRouter></AppProvider>)
       
        const allTextInputs = screen.getAllByRole('textbox')
        const imageInput = screen.getByLabelText(/image/i)
        const submitButton = screen.getByRole('button')
        const titleInput = screen.getByRole('textbox',{name:/title/i})

       await waitFor(()=>expect(allTextInputs).toHaveLength(3))
       await waitFor(()=>expect(imageInput).toBeInTheDocument())
       await waitFor(()=>expect(titleInput).toHaveValue('title'))
        expect(submitButton).toBeInTheDocument()
    })

   
    
    // test('update function get called on submit', async()=>{
    //     const resolver = jest.fn()
    //     rest.patch('/api/v1/entries/1',resolver)
    //     render(<AppProvider><MemoryRouter initialEntries={[{pathname: "/edit-entry/1",
    //     search: "",
    //     hash: "",
    //     state: {_id:1,title:"title",description:"description", image:"image", customerWebsite:"customer website"},
    //     key: "default",}]}><EditEntry/></MemoryRouter></AppProvider>)

    //     const titleInput = screen.getByRole('textbox',{name:/title/i})
    //     const button = screen.getByRole('button');

    //     await user.type(titleInput,'updated title')
    //     await user.click(button)
        
    //     await waitFor(()=>expect(resolver).toHaveBeenCalledTimes(1)) 
    //      // eslint-disable-next-line testing-library/await-async-utils
    //     waitFor(()=>expect(resolver).toHaveBeenCalledWith({_id:1,title:"updated title'",description:"description", image:"image", customerWebsite:"customer website"}))
    // })

    

})