import React from 'react';
import './Navigation.css';
import { Link, useNavigate } from 'react-router-dom';

function Navigation({ isUserLoggedIn, isClubLoggedIn, isAccountLoggedIn ,onLogout }) {
    const navigate = useNavigate();

    const handleHomeButtonClick = () => {
        navigate('/');
    };

    const handleSurveyButtonClick = () => {
        navigate('/club_matching_survey');
    };

    const handleDashboardButtonClick = () => {
        navigate('/account_dashboard');
    };

    const handleUserLoginButtonClick = () => {
        navigate('/user_login');
    };

    const handleClubLoginButtonClick = () => {
        navigate('/club_login');
    };
    
    const handleClubManagementButtonClick = () => {
        navigate('/club_management');
    };

    const handleClubDetailsButtonClick = () => {
        navigate('/club_details');
    };

    const handleUserManagementButtonClick = () => {
        navigate('/user_management');
    };

    const handleDatabase = () =>{
        navigate('/database');
    }

    const handleLogout = () => {
        onLogout(); // Call the onLogout function provided by the parent component
        navigate('/');
    };

    return (
        <nav className="navbar">
            <span className="navbar-title">SJSU Club Matching</span>
            <ul>
                <li><button onClick={handleHomeButtonClick}>Home</button></li>
                {(isUserLoggedIn || isClubLoggedIn) && <li><button onClick={handleDashboardButtonClick}>Account Dashboard</button></li>}
                {!isAccountLoggedIn && <li><button onClick={handleClubLoginButtonClick}>Club Login</button></li>}
                {!isAccountLoggedIn && <li><button onClick={handleUserLoginButtonClick}>User Login</button></li>}
                {(!isUserLoggedIn && isClubLoggedIn) && <li><button onClick={handleClubManagementButtonClick}>Club Management</button></li>}
                {(!isUserLoggedIn && isClubLoggedIn) && <li><button onClick={handleClubDetailsButtonClick}>Club Details</button></li>}
                {(isUserLoggedIn && !isClubLoggedIn) && <li><button onClick={handleUserManagementButtonClick}>User Management</button></li>}
                <li><button onClick={handleSurveyButtonClick}>Club Matching Survey</button></li>
                {(isUserLoggedIn || isClubLoggedIn) && <li><button onClick={handleDatabase}>Database</button></li>}
                {(isUserLoggedIn || isClubLoggedIn) && <li><button onClick={handleLogout}>Log Out</button></li>}
            </ul>
        </nav>
    );
};

export default Navigation;

