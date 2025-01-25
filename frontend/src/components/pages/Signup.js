import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
import './Signup.css'
import drone from '../../assets/drone.mp4'

const Signup = () => {

  const[signupInfo, setSignInfo] = useState({
    name:'',
    email:'',
    password:''
  })
  const navigate = useNavigate();
  const handleChange =(e)=>{
    const{ name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...signupInfo};
    copySignupInfo[name] = value;
    setSignInfo(copySignupInfo);
  }
  const handleSignup = async (e)=>{
    e.preventDefault();
    const{ name, email, password } = signupInfo;
    if(!name || !email || !password) {
      return handleError('All fields are required')
    }
    try {
      const url = 'http://localhost:8080/auth/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate('/login')
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
        <h1>Signup</h1>
          <form onSubmit={handleSignup} action="">

            <input 
              onChange={handleChange}
              type="text" 
              name='name'
              autoFocus
              placeholder='Full Name'
              value={signupInfo.name}
            />

            <input 
              onChange={handleChange}
              type="text"
              name='email'
              placeholder='Email Address' 
              value={signupInfo.email}
            />

            <input 
              onChange={handleChange}
              type="password"
              name='password'
              placeholder='Password (8 characters)' 
              value={signupInfo.password}
           />

            <button type='submit'> Signup </button>
            <span>Already have an account? 
              <Link to="/Login"> Login</Link>
            </span>
          </form>
          <ToastContainer />
      </div>
    </div>
    </>
  )
}

export default Signup