import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

import './LoginPage.css';

function LoginPage() {
  const history = useHistory();

  return (
    <div className='page-container'>
      <LoginForm />

      <center>
        <Button
          type="button"
          className="btn btn_asLink"
          sx={{
            textDecoration: 'underline',
            color: '#808080',
            '&:hover':{color: '#e7822b'}
          }}
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
