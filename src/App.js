import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Nav from './components/Nav';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
    <Nav /> 

    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
    </Routes>
    <Toaster />
    </>
  );
} 

export default App;
