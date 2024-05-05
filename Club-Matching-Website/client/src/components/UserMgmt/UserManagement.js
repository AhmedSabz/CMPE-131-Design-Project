import React, { useState, useEffect } from 'react';
import "./UserManagement.css";


const UserManagement = ({currentUser}) => {
  const spacedInterests = currentUser.interests.join(', ');

  const concatenateJoinedClubNames = () => {
    return currentUser.joinedClubs.map(obj => `${obj.clubName}`).join(', ');
  };
  
  return (
    <div className='database-container'>
      <div> 
      <h1>{`${currentUser.username}'s Account Credentials`}</h1>
      </div>
      <h2 className='club-list-title'><span className="label">Username:</span> {currentUser.username}</h2>
      <h2 className='club-list-title'><span className="label">Password:</span> {currentUser.password}</h2>
      <h2 className='club-list-title'><span className="label">Interests:</span> {spacedInterests}</h2>
      <h2 className='club-list-title'><span className="label">Joined Clubs:</span> {concatenateJoinedClubNames()}</h2>
    </div>
  )
}

export default UserManagement