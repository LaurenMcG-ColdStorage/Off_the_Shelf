import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';

import './RegisterForm.css';

function RegisterForm() {

  //These state bits are for collecting a new user's inputs. 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [collection, setCollection] = useState('');
  const [role, setRole] = useState('Player');

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
      <table className='registerTable'>
        <tbody>
          <tr>
            <td><label htmlFor="username">Username:</label></td>
            <td>
              <input
                type="text"
                name="username"
                value={username}
                required
                onChange={(event) => setUsername(event.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="password">Password:</label></td>
            <td>
              <input
                type="password"
                name="password"
                value={password}
                required
                onChange={(event) => setPassword(event.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="collection">Collection:</label></td>
            <td>
              <input
                type="collection"
                name="collection"
                value={collection}
                required
                onChange={(event) => setCollection(event.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="role">Role:</label></td>
            <td>
              <select
                type="role"
                name="role"
                value={role}
                required
                onChange={(event) => setRole(event.target.value)}>
                  <option default value='Player'>Player</option>
                  <option value='Collector'>Collector</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
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
