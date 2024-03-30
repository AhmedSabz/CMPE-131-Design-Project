// App.js
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Survey from './components/Survey';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import UserManagement from './components/AccountManagement';
import ClubManagement from './components/ClubManagement';
import Home from './components/Home';
import Database from './components/Database';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null); // Store user data when logged in
  const [clubs, setClubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showSurvey, setShowSurvey] = useState(false);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUserData(userData); // Set user data after successful login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null); // Clear user data on logout
  };

  const handleUserRegistration = (newUserData) => {
    // Add the new user data to the database component
    setUserData(prevData => {
      if (prevData === null) {
        return [newUserData]; // If prevData is null, return a new array with newUserData
      } else {
        return [...prevData, newUserData]; // Otherwise, spread prevData and add newUserData
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
        <Navigation isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          {isLoggedIn && <Route path="/account_dashboard" element={<Dashboard />} />}
          {/* Render "Account Dashboard" route only if user is logged in */}
          <Route path="/club_registration" element={<ClubManagement />} />
          <Route path="/user_registration" element={<UserManagement onLogin={handleLogin} onUserRegistration={handleUserRegistration} />} />
          {/* Pass the handleUserRegistration function to the UserManagement component */}
          <Route path="/club_matching_survey" element={<Survey onSurveySubmit={handleSurveySubmit} />} />
          {isLoggedIn && (
            <Route path="/account_management" element={<Database userData={userData} />} />
          )}
          {/* Render "Account Management" route only if user is logged in */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;