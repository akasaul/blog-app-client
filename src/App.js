import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Nav from './components/Nav';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Details from './pages/Details';
import NewPost from './pages/NewPost';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
    <Nav /> 

    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/posts/:id' element={<Details />} />
        <Route path='/new' element={<NewPost />} />
    </Routes>
    <Toaster />
    </>
  );
} 

export default App;
