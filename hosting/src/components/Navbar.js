import React from 'react'
import Login from './Login'
import SignUp from './SignUp'
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className='navbar'>
            <h1 className='title'>Let Me Check My Schedule</h1>
            <Link to="/login" className="link">
                <Login/>
            </Link>
            <Link to="/signup" className="link">
                <SignUp/>
            </Link>   
        </div>
    )
}
