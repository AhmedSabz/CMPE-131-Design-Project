// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Survey from './components/Survey';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import UserLogin from './components/UserLogin';
import UserManagement from './components/UserManagement';
import ClubLogin from './components/ClubLogin';
import ClubDetails from './components/ClubDetails';
import ClubManagement from './components/ClubManagement';
import Home from './components/Home';
import Database from './components/Database';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isClubLoggedIn, setIsClubLoggedIn] = useState(false);
  const [isAccountLoggedIn, setIsAccountLoggedIn] = useState(false);
  const [userDataArray, setUserDataArray] = useState([{userName: '', password: ''}]); // Store user data when logged in
  const [clubDataArray, setClubDataArray] = useState([{clubName: '', password: ''}]);
  const [currentUser, setCurrentUser] = useState({});
  const [currentClub, setCurrentClub] = useState({});
  const [showSurvey, setShowSurvey] = useState(false);



  const handleUserLogin = ({ passedUsername, passedUserPassword }) => {
    const searchedUserName = userDataArray.find(user => user.userName === passedUsername);
    const searchedUserPassword = userDataArray.find(user => user.password === passedUserPassword);
    if(searchedUserName && searchedUserPassword){
      setIsUserLoggedIn(true);
      setIsAccountLoggedIn(true);
      setCurrentUser({ passedUsername, passedUserPassword });
    }
    else{
      alert("Incorrect Username or Password");
    }
  };

  const handleClubLogin = ({ passedClubName, passedClubPassword }) => {
    const searchedClubName = clubDataArray.find(club => club.clubName === passedClubName);
    const searchedClubPassword = clubDataArray.find(club => club.passoword === passedClubPassword);
    if(searchedClubName && searchedClubPassword){
      setIsClubLoggedIn(true);
      setIsAccountLoggedIn(true);
      setCurrentClub({ passedClubName, passedClubPassword });

    }
    else{
      alert("Incorrect Username or Password");
    }
  };

  const handleLogout = () => {
    setIsUserLoggedIn(false);
    setIsClubLoggedIn(false);
    setIsAccountLoggedIn(false);
    setCurrentUser({}); // Clear user data on logout
    setCurrentClub({});
  };

  const handleUserRegistration = ({ passedUsername, passedUserPassword }) => {
    // Add the new user data to the database component
    setUserDataArray(userDataArray => {
      if (userDataArray.length === 0) {
        return [{ passedUsername, passedUserPassword }]; // If prevData is null, return a new array with newUserData
      } else {
        return [...userDataArray, { passedUsername, passedUserPassword }]; // Otherwise, spread prevData and add newUserData
      }
    });
  };
  
  const handleClubRegistration = ({ passedClubName, passedClubPassword }) => {
    // Add the new user data to the database component
    setClubDataArray(clubDataArray => {
      if (clubDataArray.length === 0) {
        return [{ passedClubName, passedClubPassword }]; // If prevData is null, return a new array with newUserData
      } else {
        return [...clubDataArray, { passedClubName, passedClubPassword }]; // Otherwise, spread prevData and add newUserData
      }
    });
  };

  const handleSurveySubmit = (answers) => {
    if (answers.interest1 !== '' && answers.interest2 !== '' && answers.interest3 !== '') {
      const recommendedClubs = [
        { id: 1, name: 'Chess Club', category: 'Strategy', description: 'A club for chess enthusiasts.' },
        { id: 2, name: 'Art Club', category: 'Creative', description: 'A club for art lovers.' },
        // Add more recommended clubs based on the survey answers
      ];
      setClubDataArray(recommendedClubs);
      setShowSurvey(false); // Hide the survey after submission
    } else {
      alert("Please Provide Three Interests");
      return;
    }
  };

  return (
    <Router>
      <div className="App">
        <Navigation isUserLoggedIn={isUserLoggedIn} isClubLoggedIn={isClubLoggedIn} isAccountLoggedIn={isAccountLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          
          {(isUserLoggedIn || isClubLoggedIn) && <Route path="/account_dashboard" element={<Dashboard />} />}
          
          {!isAccountLoggedIn && <Route path="/club_login" element={<ClubLogin onLogin={handleClubLogin} onClubRegistration={handleClubRegistration} isClubLoggedIn = {isClubLoggedIn}/>} />}

          {!isAccountLoggedIn && <Route path="/user_login" element={<UserLogin onLogin={handleUserLogin} onUserRegistration={handleUserRegistration} isUserLoggedIn = {isUserLoggedIn}/>} />}

          {(!isUserLoggedIn && isClubLoggedIn) && <Route path="/club_management" element={<ClubManagement />} />}
          {(!isUserLoggedIn && isClubLoggedIn) && <Route path="/club_details" element={<ClubDetails />} />}
          {(isUserLoggedIn && !isClubLoggedIn) && <Route path="/user_management" element={<UserManagement />} />}

          <Route path="/club_matching_survey" element={<Survey onSurveySubmit={handleSurveySubmit} />} />
          
          {(isUserLoggedIn || isClubLoggedIn) && <Route path="/database" element={<Database userDataArray={userDataArray} clubDataArray={clubDataArray}/>} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
