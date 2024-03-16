import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { UserModal } from './UserModal';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  //This local state tracks whether the UserModal element is requested to be open in our page, default closed.
  const [modal, setModal] = useState(false);

  const handleButtonClick = () => {
    setModal(false);
  }

  return (
    <div className="container">
      {modal && 
        <UserModal onClose={handleButtonClick} onCancel={handleButtonClick} onSubmit={handleButtonClick}/>
      }
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <button onClick={(event) => setModal(true)}>Edit Profile: </button>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
