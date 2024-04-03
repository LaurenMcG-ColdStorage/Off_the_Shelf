import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { UserModal } from './UserModal';
import { Button } from '@mui/material';

import './UserPage.css';

function UserPage() {

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const collect = useSelector((store) => store.selectables.collectReducer);
  //This local state tracks whether the UserModal element is requested to be open in our page, default closed.
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    setModal(false);
  }


  return (
    <div className="container">
      {modal && 
        <UserModal onClose={handleButtonClick} onCancel={handleButtonClick} onSubmit={handleButtonClick}/>
      }
      <h2>Welcome, {user.username}!</h2>
      <p>Your Active Collection: {collect}</p>
      <Button variant='contained' sx={{
                    width: 150,
                    mx: 'auto',
                    my: 1,
                    border: 1,
                    borderColor: '#575477',
                    backgroundColor: '#464366',
                    '&:hover':{backgroundColor: '#e7822b'}}}
                    onClick={(event) => setModal(true)}>Edit Profile</Button>
      <Button variant='contained' sx={{
                    width: 150,
                    mx: 'auto',
                    my: 1,
                    border: 1,
                    borderColor: '#575477',
                    backgroundColor: '#464366',
                    '&:hover':{backgroundColor: '#e7822b'}}}
                    onClick={(event) =>dispatch({type: 'LOGOUT'})}>Log Out</Button>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
