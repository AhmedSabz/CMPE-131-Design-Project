// Survey.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import './Survey.css';


const Survey = ({currentUser, setCurrentUser, currentUserId}) => {
  const [userInterests, setUserInterests] = useState([]);
  const [interests, setInterests] = useState(['', '', '']);
  const [hobbies, setHobbies] = useState(['', '', '']);
  const [playsSports, setPlaysSports] = useState('');
  const [sportPlayed, setSportPlayed] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    axios
    .get(`http://localhost:5555/Users/${currentUser._id}`)
    .then((response) => {
      setUserInterests(response.data.interests);
      setCurrentUser(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  },[currentUser._id, setCurrentUser, setUserInterests]);

  useEffect(() => {
    console.log(userInterests);
  }, [userInterests]);


  // useEffect(() => {
  //   console.log(currentUser);

  //   axios
  //   .get(`http://localhost:5555/Users/${currentUserId}`)
  //   .then((response) => {
  //     setCurrentUser(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  // }, []);

  const handleInterestChange = (index, value) => {
    setInterests((prevInterests) => {
      const updatedInterests = [...prevInterests];
      updatedInterests[index] = value;
      return updatedInterests;
    });
  };

  const handlePlaysSportsChange = (value) => {
    setPlaysSports(value);
    if (value === 'no') {
      setSportPlayed('');
    }
  };

  const handleHobbyChange = (index, value) => {
    setHobbies((prevHobbies) => {
      const updatedHobbies = [...prevHobbies];
      updatedHobbies[index] = value;
      return updatedHobbies;
    });
  };

  const updateInterests = () => {
    const updatedInterests = interests;
    console.log(currentUser);
    const updatedInterestUser = {...currentUser, interests: [...currentUser.interests, ...updatedInterests]};
    console.log(updatedInterestUser);
    setCurrentUser(updatedInterestUser);
    axios
    .put(`http://localhost:5555/Users/${currentUser._id}`, updatedInterestUser)
    .then(() => {
      alert("Changes have been saved")
    })  
    .catch((error) => {
        alert('Something went wrong, changes could not be saved'); 
    }) 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to a server)
    console.log('Form submitted:', { interests, hobbies, playsSports, sportPlayed });
    updateInterests();
    setInterests(['', '', '']);
    setHobbies(['', '', '']);
    setPlaysSports('');
    setSportPlayed('');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 3000); // Reset the form after 3 seconds
  };

  return (
    <div className='database-container'>
    <h1>Club Matching Survey</h1>
    <form className='form-contain' onSubmit={handleSubmit}>
      <label className='question-row'>
        What are your 3 favorite school interests?
        {interests.map((interest, index) => (<input className='survey-answers' key={index} type="text" value={interest} onChange={(e) => handleInterestChange(index, e.target.value)} required/> ))}
      </label>
      <br />
      <br />
      <label className='question-row'>
        What are 3 of your favorite hobbies?
        {hobbies.map((hobby, index) => ( <input className='survey-answers2' key={index} type="text" value={hobby} onChange={(e) => handleHobbyChange(index, e.target.value)} required /> ))}
      </label>
      <br />
      <br />
      <label className='question-row'>
        Do you play sports?
        <select className='sport-dec' value={playsSports} onChange={(e) => handlePlaysSportsChange(e.target.value)}>
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>
      <br />
      <br />
      {playsSports === 'yes' && (
        <label className='question-row'>
          Which sport do you play?
          <input className='what-sport' type="text" value={sportPlayed} onChange={(e) => setSportPlayed(e.target.value)}/>
        </label>
      )}
      <br />
      <br />
      <button className='submit-button' type="submit">Submit</button>
    </form>
    </div>
  );
};


//export default Survey;
export default Survey;