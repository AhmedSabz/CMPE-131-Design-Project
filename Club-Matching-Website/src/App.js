// App.js
import React, { useState } from 'react';
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
  const [userData, setUserData] = useState(null); // Store user data when logged in
  const [clubs, setClubs] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showSurvey, setShowSurvey] = useState(false);

  const handleUserLogin = (userData) => {
    setIsUserLoggedIn(true);
    setIsAccountLoggedIn(true);
    setUserData(userData); // Set user data after successful login
  };

  const handleClubLogin = (clubData) => {
    setIsClubLoggedIn(true);
    setIsAccountLoggedIn(true);
    setClubs(clubData); // Set user data after successful login
  };

  const handleLogout = () => {
    setIsUserLoggedIn(false);
    setIsClubLoggedIn(false);
    setIsAccountLoggedIn(false);
    setUserData(null); // Clear user data on logout
    setClubs(null);
  };

  const handleUserRegistration = (newUserData) => {
    // Add the new user data to the database component
    setUserData(userData => {
      if (userData === null) {
        return [newUserData]; // If prevData is null, return a new array with newUserData
      } else {
        return [...userData, newUserData]; // Otherwise, spread prevData and add newUserData
      }
    });
  };
  
  const handleClubRegistration = (newClubData) => {
    // Add the new user data to the database component
    setClubs(clubs => {
      if (clubs === null) {
        return [newClubData]; // If prevData is null, return a new array with newUserData
      } else {
        return [...clubs, newClubData]; // Otherwise, spread prevData and add newUserData
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
      setClubs(recommendedClubs);
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
          
          {!isAccountLoggedIn && <Route path="/club_login" element={<ClubLogin onLogin={handleClubLogin} onClubRegistration={handleClubRegistration}/>} />}

          {!isAccountLoggedIn && <Route path="/user_login" element={<UserLogin onLogin={handleUserLogin} onUserRegistration={handleUserRegistration} />} />}

          {(!isUserLoggedIn && isClubLoggedIn) && <Route path="/club_management" element={<ClubManagement />} />}
          {(!isUserLoggedIn && isClubLoggedIn) && <Route path="/club_details" element={<ClubDetails />} />}
          {(isUserLoggedIn && !isClubLoggedIn) && <Route path="/user_management" element={<UserManagement />} />}

          <Route path="/club_matching_survey" element={<Survey onSurveySubmit={handleSurveySubmit} />} />
          
          {(isUserLoggedIn || isClubLoggedIn) && <Route path="/account_management" element={<Database userData={userData} />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
