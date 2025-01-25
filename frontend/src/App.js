import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import React, { useState } from 'react';
import Home from './components/pages/Home.js'
import Signup from './components/pages/Signup.js';
import Login from './components/pages/Login.js';
import Welcome from './components/pages/Welcome.js'
import 'react-toastify/ReactToastify.css'
import RefreshHandler from './components/RefreshHandler.js';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({element}) => {
    return isAuthenticated ? element : <Navigate to="/login"/>
  }
  return (
    <>
    <Router>
      <Navbar />
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/' exact Component={Home}/>
        <Route path='/home' element={<PrivateRoute element={<Home />}/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
