import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
import './Signup.css';
import drone from '../../assets/drone.mp4'

const Login = () => {

  const[loginInfo, setloginInfo] = useState({
    email:'',
    password:''
  })
  const navigate = useNavigate();
  const handleChange =(e)=>{
    const{ name, value } = e.target;
    console.log(name, value);
    const copyloginInfo = { ...loginInfo};
    copyloginInfo[name] = value;
    setloginInfo(copyloginInfo);
  }
  const handleLogin = async (e)=>{
    e.preventDefault();
    const{ email, password } = loginInfo;
    if(!email || !password) {
      return handleError('All fields are required')
    }
    try {
      const url = 'http://localhost:8080/auth/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if(success){
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(()=>{
          navigate('/welcome')
        }, 1000)
      }else if(error){
        const details = error?.details[0].message;
        handleError(details);
      }else if(!success){
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <>
        <video className='video' autoPlay loop muted>
          <source src={drone} />
        </video>
    <div className="container">
      <div className="form">
        <h1>Login</h1>
          <form onSubmit={handleLogin} action="">
            
            <input 
              onChange={handleChange}
              type="text"
              name='email'
              placeholder='Email Address' 
              value={loginInfo.email}
            />

            <input 
              onChange={handleChange}
              type="password"
              name='password'
              placeholder='Password (8 characters)' 
              value={loginInfo.password}
           />

            <button type='submit'> Login </button>
            <span>Don't have an account? 
              <Link to="/signup"> Signup</Link>
            </span>
          </form>
          <ToastContainer />
      </div>
    </div>
    </>
  )
}

export default Login