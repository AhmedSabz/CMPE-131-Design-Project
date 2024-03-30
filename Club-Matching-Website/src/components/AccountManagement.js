// UserManagement.js
import React, { useState } from 'react';

const UserManagement = ({ onLogin, onUserRegistration }) => {
  const [isNewUser, setIsNewUser] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleExistingUser = () => {
    setIsNewUser(false);
  };

  const handleNewUser = () => {
    setIsNewUser(true);
  };

  const handleUserRegistration = (newUserData) => {
    // Add the new user data to the database component
    onUserRegistration(newUserData);
    // setUserData(prevData => prevData ? [...prevData, newUserData] : [newUserData]);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNewUser) {
      // Call the onUserRegistration function to add new user to the database
      onUserRegistration({ username, password });
    } else {
      // Log in logic
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      {isNewUser ? (
        <div>
          <h3>Create New Account</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
            </label>
            <br />
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
            </label>
            <br />
            <button type="submit">Create Account</button>
          </form>
          <p>Already have an account? <button onClick={handleExistingUser}>Log In</button></p>
        </div>
      ) : (
        <div>
          <h3>Log In</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
            </label>
            <br />
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
            </label>
            <br />
            <button type="submit">Log In</button>
          </form>
          <p>New user? <button onClick={handleNewUser}>Create Account</button></p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UserManagement;
