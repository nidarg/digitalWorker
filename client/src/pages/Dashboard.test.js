
import {render, screen,waitFor} from '@testing-library/react'
import user from '@testing-library/user-event'
import Dashboard from './Dashboard'
import { AppProvider } from '../context/appContext'
import { BrowserRouter } from 'react-router-dom';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import { DashboardEntry } from '../components';

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

test('shows two entries and seven buttons',async()=>{
    
    render(<AppProvider value={false}><BrowserRouter><Dashboard/></BrowserRouter></AppProvider>)
    
    
    expect(await screen.findAllByRole('link')).toHaveLength(2) 
    expect(await screen.findAllByRole('button')).toHaveLength(7) 
})

test('dasboard entry has four buttons',async()=>{
    const entry = {
        _id:1,
        title:"first title",
        description:"first description",
        image:"first image", 
        customerWebsite:"first customer website"
    }
    
    render(<AppProvider value={false}><BrowserRouter><DashboardEntry {...entry} /></BrowserRouter></AppProvider>)

    const hideBtn = screen.getByRole('button', {name:/hide/i})
    await user.click(hideBtn)
    expect(hideBtn).toBeInTheDocument()
    expect(await screen.findAllByRole('button')).toHaveLength(3) 
})
