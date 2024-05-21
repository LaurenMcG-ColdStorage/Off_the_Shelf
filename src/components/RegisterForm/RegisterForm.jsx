import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';

import './RegisterForm.css';

function RegisterForm() {

  //These state bits are for collecting a new user's inputs. 
  const [newUser, setNewUser] = useState({
                                username: '',
                                password: '',
                                email: '',
                                collection: ''})

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();
    dispatch({type: 'REGISTER', payload: newUser});
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
                value={newUser.username}
                required
                onChange={(event) => setNewUser({...newUser, username: event.target.value})}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="password">Password:</label></td>
            <td>
              <input
                type="password"
                name="password"
                value={newUser.password}
                required
                onChange={(event) => setNewUser({...newUser, password: event.target.value})}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="collection">Collection:</label></td>
            <td>
              <input
                type="collection"
                name="collection"
                value={newUser.collection}
                required
                onChange={(event) => setNewUser({...newUser, collection: event.target.value})}
              />
            </td>
          </tr>
          <tr>
            <td><label htmlFor="role">Email Address:</label></td>
            <td>
              <input
                type="email"
                name="email"
                value={newUser.email}
                required
                onChange={(event) => setNewUser({...newUser, email: event.target.value})}
              />
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
