import React from 'react'
import axios from 'axios'

const ClubManagement = ({currentClub}) => {
  return (
    <div>
     <h1>Club Management</h1>
      <h2>{`Welcome to ${currentClub.clubName}`}</h2>
    </div>
  )
}

export default ClubManagement