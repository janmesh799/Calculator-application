import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import { useSelector } from 'react-redux';



const Navbar = () => {
    const navigate = useNavigate();
    const {isLoggedIn} = useSelector(state=>state.auth);

    const mobileShowTabs = ()=>{
        document.getElementById("mobile-tabContainer").style.display = "block";
        document.getElementById("cross").style.display = "block"; 
        document.getElementById("hamburger").style.display = "none"
    }
    const mobileHideTabs = ()=>{
        document.getElementById("mobile-tabContainer").style.display = "none";
        document.getElementById("cross").style.display = "none"; 
        document.getElementById("hamburger").style.display = "block"
    }
    return (
        <>
            <div className='navbar'>
                <div className='navTitle' >
                    <span onClick={() => { navigate('/') }}> Calculator.io</span>
                </div>
                <i onClick={() => { mobileShowTabs()}} id="hamburger" className="fa-solid fa-bars hamburger" style={{ color: "#eeeeec" }}></i>
                <i onClick={() => {mobileHideTabs() }} id = "cross" class="fa-solid fa-xmark cross" style={{ color: "#eeeeec" }}></i>
                <div className='tabContainer'>{
                    !isLoggedIn ? <>
                        <button onClick={() => { navigate('/login') }} className='navButton' >Login</button>
                        <button onClick={() => { navigate('/signup') }} className='navButton' >Signup</button>
                    </> : <>
                        <span className='navButton'   >Username</span>
                        <button className='navButton' > Logout </button>
                    </>
                }
                </div>
            </div >
            <div id="mobile-tabContainer" className='mobile-tabContainer'>
                {
                    !isLoggedIn ? <>
                        <button onClick={() => { navigate('/login') }} className='mobile-navButton' >Login</button>
                        <button onClick={() => { navigate('/signup') }} className='mobile-navButton' >Signup</button>
                    </> : <>
                        <span className='mobile-navButton'   >Username</span>
                        <button className='mobile-navButton' > Logout </button>
                    </>
                }
            </div>
        </>
    )
}

export default Navbar