// App.js
import React, {useState, useEffect} from 'react';
import './App.css';
import {useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Survey from './components/Survey/Survey';
import Navigation from './components/Navigation/Navigation';
import Dashboard from './components/Dashboard/Dashboard';
import UserLogin from './components/UserLogin/UserLogin';
import UserManagement from './components/UserMgmt/UserManagement';
import ClubLogin from './components/ClubLogin/ClubLogin';
import ClubDetails from './components/ClubDetails/ClubDetails';
import ClubManagement from './components/ClubMgmt/ClubManagement';
import Home from './components/Home/Home';
import Database from './components/Database/Database';
import EditUser from './components/DBOperations/EditUser';
import EditClub from './components/DBOperations/EditClub';
import DeleteUser from './components/DBOperations/DeleteUser';
import DeleteClub from './components/DBOperations/DeleteClub';
import axios from 'axios';




function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isClubLoggedIn, setIsClubLoggedIn] = useState(false);
  const [isAccountLoggedIn, setIsAccountLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [userDataArray, setUserDataArray] = useState([]); 
  const [clubDataArray, setClubDataArray] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [currentClub, setCurrentClub] = useState({});
  const [showSurvey, setShowSurvey] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    // Retrieve state from local storage
    const savedState = localStorage.getItem('state');
    const initialState = savedState ? JSON.parse(savedState) : {};

    // Update state based on local storage
    if (initialState.isUserLoggedIn) setIsUserLoggedIn(initialState.isUserLoggedIn);
    if (initialState.isClubLoggedIn) setIsClubLoggedIn(initialState.isClubLoggedIn);
    if (initialState.isAccountLoggedIn) setIsAccountLoggedIn(initialState.isAccountLoggedIn);
    if (initialState.isAdminLoggedIn) setIsAdminLoggedIn(initialState.isAdminLoggedIn);
    if (initialState.currentUser) setCurrentUser(initialState.currentUser);
    if (initialState.currentClub) setCurrentClub(initialState.currentClub);
  }, []);

  useEffect(() => {
    // Save state to local storage whenever state changes
    const stateToSave = {
      isUserLoggedIn,
      isClubLoggedIn,
      isAccountLoggedIn,
      isAdminLoggedIn,
      currentUser,
      currentClub
    };
    localStorage.setItem('state', JSON.stringify(stateToSave));
  }, [isUserLoggedIn, isClubLoggedIn, isAccountLoggedIn, isAdminLoggedIn, currentUser, currentClub]);

  useEffect(() => {
    axios
    .get('http://localhost:5555/Clubs')
    .then((response) => {
      setClubDataArray(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });

    axios
    .get('http://localhost:5555/Users')
    .then((response) => {
      setUserDataArray(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const handleUserLogin = (newUserData) => {
    axios
    .get('http://localhost:5555/Users')
    .then((response) => {
      setUserDataArray(response.data.data);

    })
    .catch((error) => {
      console.log(error);
    })

    if ((newUserData.username === "Admin123") && (newUserData.password === "CMPE131")){
      setIsAdminLoggedIn(true);
      setIsAccountLoggedIn(true);
      setCurrentUser(newUserData);
      navigate("/database");
    }
    else {
      const searchedUserName = userDataArray.find(user => user.username === newUserData.username);
      const searchedUserPassword = userDataArray.find(user => user.password === newUserData.password);
      if((searchedUserName && searchedUserPassword) && (searchedUserName === searchedUserPassword)){
        setIsUserLoggedIn(true);
        setIsAccountLoggedIn(true);
        setCurrentUser(newUserData);
        navigate("/account_dashboard");
      }
      else{
        alert("Incorrect Username or Password");
      }
    }
  };

  const handleClubLogin = (newClubData) => {
    axios
    .get('http://localhost:5555/Clubs')
    .then((response) => {
      setClubDataArray(response.data.data);

    })
    .catch((error) => {
      console.log(error);
    })
    const searchedClubName = clubDataArray.find(club => club.clubName === newClubData.clubName);
    const searchedClubPassword = clubDataArray.find(club => club.password === newClubData.password);
    console.log(newClubData);
    console.log(searchedClubName);
    if((searchedClubName && searchedClubPassword) && (searchedClubName === searchedClubPassword)){
      setIsClubLoggedIn(true);
      setIsAccountLoggedIn(true);
      setCurrentClub(newClubData);
      navigate('/club_management');
    }
    else{
      alert("Incorrect Username or Password");
    }

  };

  const handleLogout = () => {
    navigate("/");
    setIsUserLoggedIn(false);
    setIsClubLoggedIn(false);
    setIsAccountLoggedIn(false);
    setCurrentUser({});
    setCurrentClub({});
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
      <div className="App">
        <Navigation isUserLoggedIn={isUserLoggedIn} isClubLoggedIn={isClubLoggedIn} isAdminLoggedIn={isAdminLoggedIn} isAccountLoggedIn={isAccountLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          
          {(isUserLoggedIn || isClubLoggedIn) && <Route path="/account_dashboard" element={<Dashboard currentUser={currentUser}/>} />}
          
          {!isAccountLoggedIn && <Route path="/club_login" element={<ClubLogin onLogin={handleClubLogin} setClubDataArray={setClubDataArray} isClubLoggedIn={isClubLoggedIn}/>} />}

          {!isAccountLoggedIn && <Route path="/user_login" element={<UserLogin onLogin={handleUserLogin} setUserDataArray={setUserDataArray} isUserLoggedIn = {isUserLoggedIn}/>} />}

          {(!isUserLoggedIn && isClubLoggedIn) && <Route path="/club_management" element={<ClubManagement />} />}
          {(!isUserLoggedIn && isClubLoggedIn) && <Route path="/club_details" element={<ClubDetails />} />}
          {(isUserLoggedIn && !isClubLoggedIn) && <Route path="/user_management" element={<UserManagement />} />}

          <Route path="/club_matching_survey" element={<Survey onSurveySubmit={handleSurveySubmit} />} />
          
          { (isAdminLoggedIn) && <Route path="/database" element={<Database userDataArray={userDataArray} clubDataArray={clubDataArray}/>} />}
          <Route path="/database/users/edit/:id" element={<EditUser/>} />
           <Route path="/database/users/delete/:id" element={<DeleteUser/>} />
          <Route path="/database/clubs/edit/:id" element={<EditClub/>} />
         <Route path="/database/clubs/delete/:id" element={<DeleteClub/>} />
        </Routes>
      </div>
  );
}

export default App;
