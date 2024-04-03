import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';

import './RegisterForm.css';

function RegisterForm() {

  //These state bits are for collecting a new user's inputs. 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [collection, setCollection] = useState('');
  const [role, setRole] = useState('');

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        collection: collection,
        role: role
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="collection">
          Collection:
          <input
            type="collection"
            name="collection"
            value={collection}
            required
            onChange={(event) => setCollection(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="role">
          Role:
          <input
            type="role"
            name="role"
            value={role}
            required
            onChange={(event) => setRole(event.target.value)}
          />
        </label>
      </div>
      <div>
        <Button className="btn"  variant='contained'
          sx={{
          backgroundColor:'#e7822b',
          '&:hover': {backgroundColor:'#f9a44d'}
          }}
        type="submit" name="submit" value="Register">Register</Button>
      </div>
    </form>
  );
}

export default RegisterForm;
