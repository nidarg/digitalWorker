
import {render, screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import Home from './Home'
import { AppProvider } from '../context/appContext'
import { BrowserRouter, Router } from 'react-router-dom';

test('shows entries',()=>{
    
    render(<AppProvider value={false}><BrowserRouter><Home/></BrowserRouter></AppProvider>)
    
    // screen.logTestingPlaygroundURL()
})