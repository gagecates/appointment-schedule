import React, { useState, useEffect } from 'react'
import { useAuth } from "../contexts/AuthContext"
import { Button } from "react-bootstrap"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select } from 'semantic-ui-react'
import Navbar from './Navbar'
import Modalz from './Modalz'
import Firebase from 'firebase';

const defaultTimes = [
    {key: '7', value: '7', text: '7:00am'},
    {key: '8', value: '8', text: '8:00am'},
    {key: '9', value: '9', text: '9:00am'},
    {key: '10', value: '10', text: '10:00am'},
    {key: '11', value: '11', text: '11:00am'},
    {key: '12', value: '12', text: '12:00pm'},
    {key: '1', value: '1', text: '1:00pm'},
    {key: '2', value: '2', text: '2:00pm'},
    {key: '3', value: '3', text: '3:00pm'},
    {key: '4', value: '4', text: '4:00pm'},
];


export default function AddAppointment() {
    const { currentUser } = useAuth()
    const [users, setUsers] = useState([])
    const [modal, setModal] = useState(false)
    const [availability] = useState(defaultTimes)
    const [timeChosen, setTimeChosen] = useState('7:00am')
    const [date, setDate] = useState(new Date())
    const [userId, setUserId] = useState('')
    const [userEmail, setUserEmail] = useState('')


    useEffect(() => {
        // get all users
        const getUsers = Firebase.functions().httpsCallable('getUsers');
        getUsers().then((result) => {
            console.log(result.data);
            const users = result.data.map(user => {
                return {
                    email: user.email, 
                    id: user.id,
                    apts: user.appointments
                }
            })
            const newUsers = users.filter(user => user.email !== currentUser.email)
            setUsers(newUsers);
        }).catch((error) => {
        console.log(`error: ${JSON.stringify(error)}`);
        });
    },[]);

    // opens modal to set appointment time
    const newAppointment = ((e, id, email) => {
        setModal(true);
        setUserId(id)
        setUserEmail(email)
    });

    const closeModal = () => {
        setModal(false)
        console.log('closed')
    };

    const handleAptSubmit = ((e) => {
        // format date
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const year = date.getUTCFullYear();

        const formattedDate = month + '/' + day + '/' + year
        const apt = {
            apt: timeChosen + " " + formattedDate,
            email: currentUser.email,
            id: currentUser.uid
        }
        // submit new appointment info to database
        const addApt = Firebase.functions().httpsCallable('addNewAppointment');
        addApt({
            id: userId,
            apt: apt
        }).then((result) => {
            console.log('done')
        }).catch((error) => {
        console.log(`error: ${JSON.stringify(error)}`);
        });
        setModal(false)
        alert('Your appointment request has been submitted')
    });


    const showUsers = users.map(user => {
        return (
            <>
                <div className='user-container'>
                    <span className='m-5' key={user.id}>{user.email}</span>
                    <Button 
                        onClick={e => newAppointment(e, user.id, user.email)}
                        value={user.email}   
                    >
                        New Appointment
                    </Button>
                </div>
                <Modalz modal={modal} handleClose={closeModal}>
                    <DatePicker selected={date} onChange={date => setDate(date)} />
                    <Select
                        placeholder={timeChosen}
                        options={availability}
                        value={timeChosen}
                        onChange={e => setTimeChosen(e.target.innerText)}
                    />
                    <Button 
                        onClick={handleAptSubmit}
                    >
                        Submit Appointment Request
                    </Button>
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
                        (users.length > 0) ? showUsers : 'Loading Users'
                    }
                </div>
            </div>
        </>
    )
}
