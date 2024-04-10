import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import './LogOutButton.css'

//This button will likely be deprecated in the future

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <Button variant='contained' sx={{
      backgroundColor: 'rgb(0, 0, 0, 0.0)',
      '&:hover':{backgroundColor: '#e7822b'}}}

      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
