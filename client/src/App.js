import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {AddEntry,Dashboard,EditEntry,ErrorPage,Home,LoginPage} from './pages'
import {ProtectedRoute, Navbar} from './components';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route element={<ProtectedRoute/>}>
          <Route element={<Dashboard/>} path='/dashboard'></Route>
          <Route element={<AddEntry/>} path='/add-entry'></Route>
          <Route element={<EditEntry/>} path='/edit-entry/:id'></Route>
          
        </Route>
        <Route element={<Home/>} exact path='/'></Route>
        <Route element={<LoginPage/>} path='/login'></Route>
        <Route element={<ErrorPage/>} path='*'></Route>
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;
