import React, { useState, useEffect } from 'react'
import { useAuth } from "../contexts/AuthContext"
import { Button, Alert } from "react-bootstrap"
import Navbar from './Navbar'
import Modalz from './Modalz'
import Firebase from 'firebase';

export default function AddAppointment() {
    const { currentUser, logout } = useAuth()
    const [users, setUsers] = useState([])
    const [modal, setModal] = useState(false)
    const [bookUser, setBookUser] = userState('')

    useEffect(() => {
        const getUserData = Firebase.functions().httpsCallable('getUsers');
       
        getUserData().then((result) => {
            console.log(result.data);
            const users = result.data.map(user => {
                return {email: user.email, id: user.id}
            })
            setUsers(users);
        }).catch((error) => {
        console.log(`error: ${JSON.stringify(error)}`);
        });
    },[]);

    const newAppointment = ((e) => {
        console.log('clicked', e.target.value)
        setBookUser(e.target.value)
        setModal(true);
    });

    const closeModal = () => {
        setModal(false)
        console.log('closed')
    };

    const showUsers = users.map(user => {
        return (
            <>
                <div className='user-container'>
                    <span className='m-5' key={user.id}>{user.email}</span>
                    <Button 
                        onClick={e => newAppointment(e)}
                        value={user.email}   
                    >
                        New Appointment
                    </Button>
                </div>
                <Modalz modal={modal} handleClose={closeModal}>
                    <p>Modal</p>
                </Modalz>
            </>
        )
    });

    return (
        <>
            <Navbar/>
            <div className='flex-center'>
                <h2 className='text-center'>Users</h2>
                <div className='users-container'>
                    {
                        users ? showUsers : 'Loading Users'
                    }
                </div>
            </div>
        </>
    )
}
