import React from 'react'

export default function Navbar({ logout }) {
    return (
        <div className='nav'>
            <h1 className='title'>Let Me Check My Schedule</h1>
            <div onClick={logout}className='logout-btn'>Logout</div>
        </div>
    )
}
