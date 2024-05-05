import React, { useState, useEffect } from 'react';
import "./ClubDetails.css";

const ClubDetails = ({currentClub}) => {
  const spacedTags = currentClub.tags.join(', ');

  const concatenateJoinedClubNames = () => {
    return currentClub.members.map(obj => `${obj.username}`).join(', ');
  };

  return (
    <div className='database-container'>
      <div> 
      <h1>{`${currentClub.clubName} Account Credentials`}</h1>
      </div>
      <h2 className='club-list-title'><span className="label">Username:</span> {currentClub.clubName}</h2>
      <h2 className='club-list-title'><span className="label">Password:</span> {currentClub.password}</h2>
      <h2 className='club-list-title'><span className="label">Tags:</span> {spacedTags}</h2>
      <h2 className='club-list-title'><span className="label">Members:</span> {concatenateJoinedClubNames()}</h2>
    </div>
  )
}

export default ClubDetails