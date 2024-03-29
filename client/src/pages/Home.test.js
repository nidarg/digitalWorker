
import {render, screen,waitFor} from '@testing-library/react'
import user from '@testing-library/user-event'
import Home from './Home'
import { AppProvider } from '../context/appContext'
import { BrowserRouter } from 'react-router-dom';
import {rest} from 'msw'
import {setupServer} from 'msw/node'

const handlers = [
    rest.get('/api/v1/entries',(req,res,ctx)=>{
        return res(
            ctx.json({
                entries:[
                    {
                        _id:1,
                        title:"first title",
                        description:"first description",
                        image:"first image", 
                        customerWebsite:"first customer website"
                    },
                    {
                        _id:2,
                        title:"second title",
                        description:"second description",
                        image:"second image", 
                        customerWebsite:"second customer website"
                    }
                ]
            })
        )
    })
]

const server = setupServer(...handlers)

beforeAll(()=>{server.listen()})
afterEach(()=>{server.resetHandlers()})
afterAll(()=>{server.close()})

test('shows two entries',async()=>{
    
    render(<AppProvider value={false}><BrowserRouter><Home/></BrowserRouter></AppProvider>)
    
    
    expect(await screen.findAllByRole('heading')).toHaveLength(2) 
})