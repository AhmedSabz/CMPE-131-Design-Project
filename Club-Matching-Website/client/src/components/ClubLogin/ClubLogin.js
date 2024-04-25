import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import "./ClubLogin.css";
import axios from 'axios';

const ClubLogin = ({ onLogin, setClubDataArray, isClubLoggedIn }) => {
  const [isNewClub, setIsNewClub] = useState(true);
  const [clubName, setClubName] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios
    .get('http://localhost:5555/Clubs')
    .then((response) => {
      setClubDataArray(response.data.data);

    })
    .catch((error) => {
      console.log(error);
    })

  }, [setClubDataArray]);

  const handleExistingClub = () => {
    setIsNewClub(false);
  };

  const handleNewClub = () => {
    setIsNewClub(true);
  };


  const handleClubRegistration = () => {
      const newClubData = {clubName, password, description};
      axios
        .post('http://localhost:5555/Clubs', newClubData)
        .then(() => {
            alert("Club has been created")
        })  
        .catch((error) => {
          if(error.response.status === 401){
            alert('Club name or password already in use, please choose another name');
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
          .get('http://localhost:5555/Clubs')
          .then((response) => {
            setClubDataArray(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          })
  };

  const handleClubLogin = () => {
    const newClubData = {clubName, password, description};
    onLogin(newClubData);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNewClub) {
      handleClubRegistration();
    } 
    else {
      handleClubLogin();
    }
    setClubName("");
    setPassword("");
    setDescription("");
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
              <input type="password" className='form-container-input' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
            </label>
            <br />
            <label className='form-container-label'>
              Description:
              <textarea className='form-container-textarea' value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter club description"></textarea>
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
