import React from 'react'
import axios from 'axios'




const Dashboard = ({currentUser}) => {
  return (
    <div>
        <h1>Account Dashboard</h1>
        <h2>{`Welcome ${currentUser.username}`}</h2>
    </div>
  )
}

export default Dashboard