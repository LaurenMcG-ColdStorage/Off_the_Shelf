import React from 'react';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

import './RegisterPage.css';

function RegisterPage() {
  const history = useHistory();

  return (
    <div className='page-container'>
      <RegisterForm />

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
            history.push('/login');
          }}
        >
          Login
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
