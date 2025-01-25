import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button';
import './Navbar.css';

export const Navbar = () => {
    const[click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const [button,setButton] = useState(true);
    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        }
        else{
            setButton(true);
        };
    };

    useEffect(() => {showButton();}, []);

    window.addEventListener('resize', showButton);
  return (
    <>
    <nav className="navbar">
        <div className="navbar-container">
            <Link to="/" className="navbarlogo" onClick={closeMobileMenu}>
            FYP
            </Link>
            <div className="menu-icon" onClick={handleClick}>
                <i className={click ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                    <Link to='/' className="nav-link" onClick={closeMobileMenu}>
                    Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/' className="nav-link" onClick={closeMobileMenu}>
                    About
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/' className="nav-link" onClick={closeMobileMenu}>
                    Home
                    </Link>
                </li>
            </ul>

            {button && <Button buttonStyle='btn--outline'> LOGIN </Button>}

        </div>
    </nav>
    
    </>
  )
}
