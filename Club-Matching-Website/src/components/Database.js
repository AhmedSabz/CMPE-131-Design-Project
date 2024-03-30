import React, { useState, useEffect } from 'react';

const Database = () => {
  // Retrieve user data from localStorage or initialize with an empty array
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  // Retrieve club data from localStorage or initialize with an empty array
  const [clubs, setClubs] = useState(() => {
    const storedClubs = localStorage.getItem('clubs');
    return storedClubs ? JSON.parse(storedClubs) : [];
  });

  // Function to handle user registration
  const registerUser = (username, password, additionalCredentials) => {
    // Add the new user to the users state
    const newUser = { username, password, additionalCredentials };
    setUsers(prevUsers => [...prevUsers, newUser]);

    // Store updated user data in localStorage
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
  };

  // Function to handle club registration
  const registerClub = (clubname, password, additionalCredentials) => {
    // Add the new club to the clubs state
    const newClub = { clubname, password, additionalCredentials };
    setClubs(prevClubs => [...prevClubs, newClub]);

    // Store updated club data in localStorage
    localStorage.setItem('clubs', JSON.stringify([...clubs, newClub]));
  };

  useEffect(() => {
    // Update localStorage whenever users or clubs state changes
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('clubs', JSON.stringify(clubs));
  }, [users, clubs]);

  return (
    <div>
      <h2>Database</h2>
      <h3>Users</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            Username: {user.username}, Password: {user.password}, Additional Credentials: {user.additionalCredentials}
          </li>
        ))}
      </ul>
      <h3>Clubs</h3>
      <ul>
        {clubs.map((club, index) => (
          <li key={index}>
            Club Name: {club.clubname}, Password: {club.password}, Additional Credentials: {club.additionalCredentials}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Database;
