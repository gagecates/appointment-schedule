import React, { useState, useEffect } from "react"
import { Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Navbar from './Navbar'
import Firebase from 'firebase'

export default function Dashboard() {
  const [error, setError] = useState("")
  const [apts, setApts] = useState([])
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  //<strong>Email:</strong> {currentUser.email}

  useEffect(() => {
    const getUsers = Firebase.functions().httpsCallable('getUserData');

    getUsers({
      data: null
    }).then((result) => {
        setApts(result.data.appointments);
    }).catch((error) => {
    console.log(`error: ${JSON.stringify(error)}`);
    });
  },[]);

  return (
    <>
      <Navbar/>
      <Link to="/add">
        <Button className="m-4">
          Add Appointment
        </Button>
      </Link>
      <h1 className='text-center'>Appointments</h1>
      <div className="apts-container flex-center">
        <div className='apts-content flex-center'>
          {apts}
        </div>
      </div>
    </>
  )
}