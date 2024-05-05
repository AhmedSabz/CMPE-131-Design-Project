// UserLogin.js
import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import "./UserLogin.css";
import axios from 'axios';

const UserLogin = ({ onLogin, setUserDataArray, isUserLoggedIn}) => {
  const [isNewUser, setIsNewUser] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [interests, setInterests] = useState([]);
  const [joinedClubs, setJoinedClubs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
    .get('http://localhost:5555/Users')
    .then((response) => {
      setUserDataArray(response.data.data);

    })
    .catch((error) => {
      console.log(error);
    })

  }, [setUserDataArray]);

  const handleExistingUser = () => {
    setIsNewUser(false);
  };

  const handleNewUser = () => {
    setIsNewUser(true);
  };

  const handleUserRegistration = () => {
    const newUserData = {username, password, interests, joinedClubs};
    console.log(newUserData);
    axios
      .post('http://localhost:5555/Users', newUserData)
      .then(() => {
          alert("User has been created")
      })  
      .catch((error) => {
        if(error.response.status === 401){
          alert('Username or password already in use, please choose another name');
        }
        else if(error.response.status === 400){
          alert('Please fill in all fields');
        }
        else{
          alert('An error happened. Please check the console'); 
        }
        console.log(error);
      });
      axios
        .get('http://localhost:5555/Users')
        .then((response) => {
          setUserDataArray(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        })
  };

  const handleUserLogin = () => {
    const newUserData = {username, password, interests, joinedClubs};
    onLogin(newUserData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNewUser) {
      handleUserRegistration();
    } 
    else {
      handleUserLogin();
      if(isUserLoggedIn === true){
        navigate('/account_dashboard');
      }
    }
    setUsername("");
    setPassword("");
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
      </div>
    </div>
  );
};

export default UserLogin;
