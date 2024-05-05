import React from 'react'
import { useState, useEffect  } from 'react'
import { Link } from 'react-router-dom';
import {MdOutlineAdd, MdOutlineRemove} from 'react-icons/md';
import axios from 'axios'




const Dashboard = ({currentUser, setCurrentUser, clubDataArray, setClubDataArray}) => {
  const [userInterests, setUserInterests] = useState([]);
  const [matchingClubs, setMatchingClubs] = useState([]);
  const [clubsJoined, setClubsJoined] = useState([]);
  
  useEffect(() => {
    axios
    .get(`http://localhost:5555/Users/${currentUser._id}`)
    .then((response) => {
      setUserInterests(response.data.interests);
      setClubsJoined(response.data.joinedClubs);
      setCurrentUser(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
    console.log(currentUser);
  },[currentUser._id, setCurrentUser]);

  useEffect(() => {
    // console.log(userInterests);
    clubDataArray.map((clubObj) => {
      clubObj.tags.map((tag) => {
        if(userInterests.includes(tag) === true){
          if(matchingClubs.includes(clubObj) === false){
            setMatchingClubs([...matchingClubs, clubObj]);
          }
        }
      });
    });
    // console.log(matchingClubs);
    console.log(clubDataArray)
  }, [userInterests, matchingClubs, clubDataArray]);


  const addJoinedClub = (id) => {
    console.log(id);
    const foundClub = matchingClubs.find((club) => 
        club._id === id
    );
    if(clubsJoined.includes(foundClub) === false){
      const addedJoinedClubsUser = {...currentUser, joinedClubs: [...currentUser.joinedClubs, foundClub]};
      setCurrentUser(addedJoinedClubsUser);
      axios
      .put(`http://localhost:5555/Users/${currentUser._id}`, addedJoinedClubsUser)
      .then(() => {
        alert("Changes have been saved")
      })  
      .catch((error) => {
          alert('Something went wrong, changes could not be saved'); 
      })
    }
    else{
      alert("Something went wrong");
    }
    if(clubsJoined.includes(foundClub) === false){
    const addMemberClub = {...foundClub, members: [...foundClub.members, currentUser]};
    axios
      .put(`http://localhost:5555/Clubs/${id}`, addMemberClub)
      .then(() => {
        alert("Changes have been saved")
      })  
      .catch((error) => {
          alert('Something went wrong, changes could not be saved'); 
      })
    }

    console.log(currentUser);
    // console.log(foundClub);
  };


  const removeJoinedClub = (id) => {
    console.log(id);
    const foundClub = clubsJoined.find((club) => 
        club._id === id
    );
      const removedClub = currentUser.joinedClubs.filter((clubs) => clubs !== foundClub); 
      const removedJoinedClubsUser = {...currentUser, joinedClubs: removedClub};
      console.log(removedJoinedClubsUser);
      setCurrentUser(removedJoinedClubsUser);
      axios
      .put(`http://localhost:5555/Users/${currentUser._id}`, removedJoinedClubsUser)
      .then(() => {
        alert("Changes have been saved")
      })  
      .catch((error) => {
          alert('Something went wrong, changes could not be saved'); 
      })    
      console.log(foundClub);
      const removedMember = foundClub.members.filter((member) => member._id !== currentUser._id);
      console.log(currentUser._id);
      console.log(removedMember)
      const removeMemberClub = {...foundClub, members: removedMember};
      console.log(removeMemberClub)
      axios
        .put(`http://localhost:5555/Clubs/${id}`, removeMemberClub)
        .then(() => {
          alert("Changes have been saved")
        })  
        .catch((error) => {
            alert('Something went wrong, changes could not be saved'); 
        })


    console.log(currentUser);
  };

  return (
    <div className='database-container'>
      <div> 
      <h1>Account Dashboard</h1>
      <h2>{`Welcome ${currentUser.username}`}</h2>
      </div>
      <h2 className='club-list-title'>Clubs that Might Match Your Interests:</h2>
      <table className='list'>
        <thead>
        <tr>
          <th className='cell-labels'> Club Name </th>
          <th className='cell-labels'> Description </th>
        </tr>
        </thead>
        <tbody>
          {matchingClubs.map((club, index) => {
            if (!clubsJoined.find((joinedClub) => joinedClub._id === club._id)) {
              return (
            <tr key = {club._id}>
              <td>
                {club.clubName}
              </td>
              <td>
                {club.description}
              </td>
              <td>
                <div>
                  <button onClick = {() => addJoinedClub(club._id)}>
                      <MdOutlineAdd/>
                  </button>
                </div>
              </td>
            </tr>
              );
            }
          })}
        </tbody>
      </table>
      <h2 className='club-list-title'>Joined Clubs:</h2>
      <table className='list'>
        <thead>
        <tr>
        <th className='cell-labels'> Club Name </th>
        <th className='cell-labels'> Description </th>
        </tr>
        </thead>
        <tbody>
          {clubsJoined.map((club, index) => (
            <tr key = {club._id}>
              <td>
                {club.clubName}
              </td>
              <td>
                {club.description}
              </td>
              <td>
                <div>
                  <button onClick = {() => removeJoinedClub(club._id)}>
                      <MdOutlineRemove/>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard