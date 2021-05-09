import React from 'react'
import SignUp from './SignUp'

export default function HomePage() {
    return (
        <>  
            <div className='home-content'>
                <p>Let Me Check My Schedule makes connecting with others simple</p>
                <p>Login or sign up to begin booking appointments!</p>
            </div>
            <SignUp/>
        </>
    )
}
