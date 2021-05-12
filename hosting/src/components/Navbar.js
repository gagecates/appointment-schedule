import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext"


export default function Navbar() {
    const { logout } = useAuth()
    return (
        <div className='nav'>
            <h1 className='title'>Let Me Check My Schedule</h1>
            <Link to="/" className="btn">
              Home
            </Link>
            <Link to="/update-profile" className="btn">
              Update Profile
            </Link>
            <div onClick={logout}className='btn'>Logout</div>
        </div>
    )
}
