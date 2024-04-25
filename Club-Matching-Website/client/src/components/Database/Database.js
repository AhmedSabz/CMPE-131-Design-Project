import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddEdit, MdOutlineDelete} from 'react-icons/md';
import './Database.css'

import axios from 'axios';

const Database = () => {
  const [userList, setUserList] = useState([]);
  const [clubList, setClubList] = useState([]);
  useEffect(() => {
    axios
    .get('http://localhost:5555/Users')
    .then((response) => {
      setUserList(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    })

    axios
    .get('http://localhost:5555/Clubs')
    .then((response) => {
      setClubList(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  return (
    <div className='database-container'>
      <div> 
        <h1 className='database-title'>Account Database</h1>
      </div>
      <h2 className='user-list-title'>Users:</h2>
      <table className='list'>
        <thead>
          <tr>
            <th className='cell-labels'> # </th>
            <th className='cell-labels'> Username </th>
            <th className='cell-labels'> Password </th>
            <th className='cell-labels'> Operations </th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr key = {user._id}>
              <td>
                {index + 1}
              </td>
              <td>
                {user.username}
              </td>
              <td>
                {user.password}
              </td>
              <td>
                <div>
                  <Link to={`/database/users/edit/${user._id}`}>
                      <AiOutlineEdit/>
                  </Link>
                  <Link to={`/database/users/delete/${user._id}`}>
                      <MdOutlineDelete/>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h2 className='club-list-title'>Clubs:</h2>
      <table className='list'>
        <thead>
        <tr>
          <th className='cell-labels'> # </th>
          <th className='cell-labels'> Club Name </th>
          <th className='cell-labels'> Password </th>
          <th className='cell-labels'> Operations </th>
        </tr>
        </thead>
        <tbody>
          {clubList.map((club, index) => (
            <tr key = {club._id}>
              <td>
                {index + 1}
              </td>
              <td>
                {club.clubName}
              </td>
              <td>
                {club.password}
              </td>
              <td>
                <div>
                  <Link to={`/database/clubs/edit/${club._id}`}>
                      <AiOutlineEdit/>
                  </Link>
                  <Link to={`/database/clubs/delete/${club._id}`}>
                      <MdOutlineDelete/>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Database;
