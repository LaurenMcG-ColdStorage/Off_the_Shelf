import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';

import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const user = useSelector(store => store.user)
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();
    //Log user in on submit
    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
      dispatch({ type: 'GRAB_COLLECTION', payload: user.collection_id})
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            required
            value={username}
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
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <Button className="btn" variant='contained' 
          sx={{
          backgroundColor:'#e7822b',
          '&:hover': {backgroundColor:'#f9a44d'}
          }}
        type="submit" name="submit" value="Log In">Log In</Button>
      </div>
    </form>
  );
}

export default LoginForm;
