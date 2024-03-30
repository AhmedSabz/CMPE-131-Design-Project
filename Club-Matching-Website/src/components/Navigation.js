import React from 'react';
import './Navigation.css';
import { Link, useNavigate } from 'react-router-dom';

function Navigation({ isLoggedIn, onLogout }) {
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

    const handleUserRegistrationButtonClick = () => {
        navigate('/user_registration');
    };

    const handleClubRegistrationButtonClick = () => {
        navigate('/club_registration');
    };

    const handleLogout = () => {
        onLogout(); // Call the onLogout function provided by the parent component
    };

    return (
        <nav className="navbar">
            <span className="navbar-title">SJSU Club Matching</span>
            <ul>
                <li><button onClick={handleHomeButtonClick}>Home</button></li>
                {isLoggedIn && <li><button onClick={handleDashboardButtonClick}>Account Dashboard</button></li>}
                <li><button onClick={handleClubRegistrationButtonClick}>Club Management</button></li>
                <li><button onClick={handleUserRegistrationButtonClick}>User Management</button></li>
                <li><button onClick={handleSurveyButtonClick}>Club Matching Survey</button></li>
                {isLoggedIn && <li><button onClick={handleLogout}>Log Out</button></li>}
            </ul>
        </nav>
    );
};

export default Navigation;

