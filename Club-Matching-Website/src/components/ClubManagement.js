import React, { useState } from 'react';

const ClubManagement = () => {
  const [isNewClub, setIsNewClub] = useState(true);

  const handleExistingClub = () => {
    setIsNewClub(false);
  };

  const handleNewClub = () => {
    setIsNewClub(true);
  };

  return (
    <div>
      <h2>Club Management</h2>
      {isNewClub ? (
        <div>
          <h3>Create New Club</h3>
          <form>
            <label>
              Club Name:
              <input type="text" placeholder="Enter club name" />
            </label>
            <br />
            <label>
              Description:
              <textarea placeholder="Enter club description"></textarea>
            </label>
            <br />
            <button type="submit">Create Club</button>
          </form>
          <p>Already have a club? <button onClick={handleExistingClub}>Log In</button></p>
        </div>
      ) : (
        <div>
          <h3>Log In to Club</h3>
          <form>
            <label>
              Club Name:
              <input type="text" placeholder="Enter club name" />
            </label>
            <br />
            <label>
              Password:
              <input type="password" placeholder="Enter club password" />
            </label>
            <br />
            <button type="submit">Log In</button>
          </form>
          <p>New club? <button onClick={handleNewClub}>Create Club</button></p>
        </div>
      )}
    </div>
  );
};

export default ClubManagement;
