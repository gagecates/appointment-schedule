import React, { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import Navbar from './Navbar'
import Firebase from 'firebase'

export default function Dashboard() {
  const [apts, setApts] = useState([])
  const [aptRequests, setAptRequests] = useState([])
  const { currentUser } = useAuth()


  useEffect(() => {
    // get curent users appointments and appointment requests on render
    const getUserData = Firebase.functions().httpsCallable('getUserData');
     getUserData({
      data: null
    }).then((result) => {
        setApts(result.data.appointments);
        setAptRequests(result.data.newApt)
        console.log(aptRequests)
        console.log(apts)
    }).catch((error) => {
    console.log(`error: ${JSON.stringify(error)}`);
    });
  },[]);

  const updateNewApts = (newApt) => {
    // updates new appointments array in database
    const newAptRequests = aptRequests.filter(apt => apt !== newApt)
    setAptRequests(newAptRequests);
    const updateNewApt = Firebase.functions().httpsCallable('updateNewAppointments');
        updateNewApt({
            id: currentUser.uid,
            newApt: newAptRequests
        }).then((result) => {
            console.log('updated appointments and new appointments')
        }).catch((error) => {
        console.log(`error updating appoitments`);
        });
  };

  const acceptAptHandler = (newApt, userId) => {
    const newAptRequests = aptRequests.filter(apt => apt !== newApt)
    // update current users appointments
    const updateApt = Firebase.functions().httpsCallable('updateAppointments');
        updateApt({
            id: currentUser.uid,
            apt: newApt
        }).then((result) => {
            alert('Updated your appointments')
            // update other users appointments
            const usersNewApt = Object.assign({}, newApt, {email: currentUser.email});
            updateApt({
              id: userId,
              apt: usersNewApt
            }).then((result) => {
              // update current users appointment requests
              updateNewApts(newApt);
              const getUserData = Firebase.functions().httpsCallable('getUserData');
              getUserData({
                data: null
              }).then((result) => {
                  setApts(result.data.appointments);
                  setAptRequests(result.data.newApt)
              }).catch((error) => {
              console.log(`error fetching userData`);
              })
            }).catch((error) => {
              console.log(`error updating users appoitments`);
              })
        }).catch((error) => {
        console.log(`error updating current users appoitments`);
        });
  };

  const newApts = aptRequests.map(apt => {
    return(
      <div className='new-apt-container'>
        <div className='apt-details'>
          <div>{apt.email}</div>
          <div>{apt.apt}</div>
        </div>
        <Button 
          className="m-4"
          onClick={e => acceptAptHandler(apt, apt.id)}
        >
          Accept Appointment
        </Button>
        <Button 
          className="m-4"
          onClick={e => updateNewApts(apt)}
        >
          Decline Appointment
        </Button>
      </div>
    )
  })

  const scheduledApts = apts.map(apt => {
    return(
      <div className='new-apt-container'>
        <div className='apt-details'>
          <div>{apt.email}</div>
          <div>{apt.apt}</div>
        </div>
      </div>
    )
  })

  return (
    <>
      <Navbar/>
      <Link to="/add">
        <Button className="m-4">
          Add Appointment
        </Button>
      </Link>
      <h1 className='text-center'>Appointments for <div>{currentUser.email}</div></h1>
      <div className="apts-container flex-center">
        <div className='apts-content flex-center'>
          {
            (apts.length > 0) ? scheduledApts : 'You have no appointments'
          }
        </div>
      </div>
      <div className='apt-requests flex-center mt-5'>
        <h2 className='text-center'>Appointment Requests</h2>
        <div>
          {
            (aptRequests.length > 0) ? newApts : 'You have no new appointment requests'
          }
        </div>
      </div>
    </>
  )
}