import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ClubManagement = ({ onLogin, onClubRegistration }) => {
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
      // Call the onUserRegistration function to add new user to the database
      handleClubRegistration({ clubName, password });
    } else {
      // Log in logic
      onLogin({ clubName, password });
      navigate('/account_dashboard');
    }
  };

  return (
    <div>
      {/* <h2>Club Management</h2> */}
      {isNewClub ? (
        <div>
          <h2>Create New Club</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Club Name:
              <input type="text" value={clubName} onChange={(e) => setClubName(e.target.value)} placeholder="Enter club name" />
            </label>
            <br />
            <label>
              Password:
              <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
            </label>
            <br />
            <label>
              Description:
              <textarea placeholder="Enter club description"></textarea>
            </label>
            <br />
            <button type="submit">Create Club</button>
          </form>
          <p>Already have a club? <button onClick={handleExistingClub}>Log In</button></p>
        </div>
      ) : (
        <div>
          <h2>Log In to Club</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Club Name:
              <input type="text" value={clubName} onChange={(e) => setClubName(e.target.value)} placeholder="Enter club name" />
            </label>
            <br />
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="Enter club password" />
            </label>
            <br />
            <button type="submit">Log In</button>
          </form>
          <p>New club? <button onClick={handleNewClub}>Create Club</button></p>
        </div>
      )}
    </div>
  );
};

export default ClubManagement;
