import React, { useState, useEffect } from 'react';
import "./ClubManagement.css";

const ClubManagement = ({currentClub}) => {
  useEffect(() => {
    console.log(currentClub.members)
  });
  
  return (
    <div className='database-container'>
      <div>
        <h1>{`Welcome to ${currentClub.clubName}`}</h1>
      </div>
      <h2 className='club-list-title'>Member List:</h2>
      <table className='list'>
        <thead>
          <tr>
            <th className='cell-labels'>Member Username</th>
          </tr>
        </thead>
        <tbody>
          {currentClub.members.map((member) => (
            <tr key={member._id}>
              <td>{member.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ClubManagement