import React, {useEffect, useState} from 'react'
import { Button } from './Button';
import './HeroSection.css'
import '../App.css'
import drone from '../assets/drone.mp4'

export const HeroSection = () => {
  return (
    <>
    <div className='hero-container'>
        <video className='video' autoPlay loop muted>
          <source src={drone} />
        </video>
      <div className="box">
        <h1>surveillence system</h1>
        <p>FYP Batch 2021 <br /> Department of Electronic Engineering NED</p>
        <div className="hero-btns">
          {
            <Button className="btns"
              buttonStyle='btn--outline'
              buttonSize='btn--large'>
                LOGIN 
            </Button>
          }
        </div>        
      </div>
    </div>
    </>
  )
}

export default HeroSection;