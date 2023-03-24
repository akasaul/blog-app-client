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
import AntiPrivateRoute from './components/AntiPrivateRoute';
import GetUser from './pages/GetUser';
import EditProfile from './pages/EditProfile';


function App() {
  return (
    <>
    <Nav /> 

    <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/signup'element={<AntiPrivateRoute />} >
          <Route path='/signup' element={<Signup />} />
        </Route>


        <Route path='/login' element={<AntiPrivateRoute />} >
          <Route path='/login' element={<Login />} />
        </Route>

        <Route path='/signup/add-details' element={<PrivateRoute />} >
          <Route path='/signup/add-details' element={<AddDetails />} />
        </Route>
        
        <Route path='/posts/:id' element={<Details />} />
       
        <Route path='/new' element={<PrivateRoute />} >
          <Route path='/new' element={<NewPost />} />
        </Route>
       

        <Route path='/edit' element={<PrivateRoute />} >
          <Route path='/edit' element={<EditPost />} />
        </Route>

        <Route path='/profile' element={<PrivateRoute />} >
          <Route path='/profile' element={<Profile />} />
        </Route>

        <Route path='/edit-profile' element={<PrivateRoute />} >
          <Route path='/edit-profile' element={<EditProfile />} />
        </Route>
        
        <Route path='/profile/:id' element={<PrivateRoute />} >
          <Route path='/profile/:id' element={<GetUser />} />
        </Route>

    </Routes>
    <Toaster />
    </>
  );
} 

export default App;
