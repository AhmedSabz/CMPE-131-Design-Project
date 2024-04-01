// UserLogin.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./UserLogin.css";


const UserLogin = ({ onLogin, onUserRegistration }) => {
  const [isNewUser, setIsNewUser] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleExistingUser = () => {
    setIsNewUser(false);
  };

  const handleNewUser = () => {
    setIsNewUser(true);
  };

  const handleUserRegistration = (newUserData) => {
    // Add the new user data to the database component
    onUserRegistration(newUserData);
    // setUserData(userData => userData ? [...userData, newUserData] : [newUserData]);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNewUser) {
      // Call the onUserRegistration function to add new user to the database
      handleUserRegistration({ username, password });
    } else {
      // Log in logic
      onLogin({ username, password });
      navigate('/account_dashboard');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
      {isNewUser ? (
        <div className='form-container-form'>
          <h2>Create New Account</h2>
          <form onSubmit={handleSubmit}>
            <label className='form-container-label'>
              Username:
              <input type="text" className='form-container-input' value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
            </label>
            <br />
            <label className='form-container-label'>
              Password:
              <input type="password" className='form-container-input' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
            </label>
            <br />
            <button type="submit" className='form-container-button'>Create Account</button>
          </form>
          <p>Already have an account? <button className='form-container-button' onClick={handleExistingUser}>Log In</button></p>
        </div>
      ) : (
        <div className='form-container-form'>
          <h2>Log In</h2>
          <form onSubmit={handleSubmit}>
            <label className='form-container-label'>
              Username:
              <input type="text" className='form-container-input' value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
            </label>
            <br />
            <label className='form-container-label'>
              Password:
              <input type="password" className='form-container-input' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
            </label>
            <br />
            <button type="submit" className='form-container-button'>Log In</button>
          </form>
          <p>New user? <button className='form-container-button' onClick={handleNewUser}>Create Account</button></p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default UserLogin;
