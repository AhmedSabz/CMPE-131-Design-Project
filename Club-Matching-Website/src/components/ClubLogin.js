import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./ClubLogin.css";

const ClubLogin = ({ onLogin, onClubRegistration }) => {
  const [isNewClub, setIsNewClub] = useState(true);
  const [clubName, setClubName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleExistingClub = () => {
    setIsNewClub(false);
  };

  const handleNewClub = () => {
    setIsNewClub(true);
  };

  const handleClubRegistration = (newClubData) => {
    // Add the new club data to the database component
    onClubRegistration(newClubData);
    // setClubs(clubs => clubs ? [...clubs, newClubData] : [newClubData]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNewClub) {
      // Call the onClubRegistration function to add new club to the database
      handleClubRegistration({ clubName, password });
    } else {
      // Log in logic
      onLogin({ clubName, password });
      navigate('/account_dashboard');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
      {isNewClub ? (
        <div className='form-container-form'>
          <h2>Create New Club</h2>
          <form onSubmit={handleSubmit}>
            <label className='form-container-label'>
              Club Name:
              <input type="text" className='form-container-input' value={clubName} onChange={(e) => setClubName(e.target.value)} placeholder="Enter club name" />
            </label>
            <br />
            <label className='form-container-label'>
              Password:
              <input type="text" className='form-container-input' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
            </label>
            <br />
            <label className='form-container-label'>
              Description:
              <textarea className='form-container-textarea' placeholder="Enter club description"></textarea>
            </label>
            <br />
            <button type="submit" className='form-container-button'>Create Club</button>
          </form>
          <p>Already have a club? <button className='form-container-button' onClick={handleExistingClub}>Log In</button></p>
        </div>
      ) : (
        <div className='form-container-form'>
          <h2>Log In to Club</h2>
          <form onSubmit={handleSubmit}>
            <label className='form-container-label'>
              Club Name:
              <input type="text" className='form-container-input' value={clubName} onChange={(e) => setClubName(e.target.value)} placeholder="Enter club name" />
            </label>
            <br />
            <label className='form-container-label'>
              Password:
              <input type="password" className='form-container-input' value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="Enter club password" />
            </label>
            <br />
            <button type="submit" className='form-container-button'>Log In</button>
          </form>
          <p>New club? <button className='form-container-button' onClick={handleNewClub}>Create Club</button></p>
        </div>
      )}
      </div>
    </div>
  );
};

export default ClubLogin;
