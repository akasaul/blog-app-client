import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Nav from './components/Nav';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Details from './pages/Details';
import NewPost from './pages/NewPost';
import { Toaster } from 'react-hot-toast';
import EditPost from './pages/EditPost'
import AddDetails from './pages/AddDetails';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';


function App() {
  return (
    <>
    <Nav /> 

    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/posts/:id' element={<Details />} />
       
        <Route>
          <Route path='/new-product' element={<PrivateRoute />} />
          <Route path='/new' element={<NewPost />} />
        </Route>
       
        <Route path='/edit' element={<EditPost />} />
       
        <Route>
          <Route path='/add-details' element={<PrivateRoute />} />
          <Route path='/signup/add-details' element={<AddDetails />} />
        </Route>

        <Route>
          <Route path='/add-details' element={<PrivateRoute />} />
          <Route path='/profile' element={<Profile />} />
        </Route>



    </Routes>
    <Toaster />
    </>
  );
} 

export default App;
