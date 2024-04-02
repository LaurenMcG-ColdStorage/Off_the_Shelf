import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState("It's Game Night!");
  const user = useSelector(store => store.user);
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  useEffect(() => {
    {user.id && setHeading(`Welcome Back ${user.username}!`) }
  },[])

  return (
    <div className="container">
      <div className="grid">
        <div className="grid-col grid-col_8">
          <h2>{heading}</h2>
          <p>
            Is your group having trouble settling on a game to play? Do you spend
            what feels like forever looking over your collection, and just can't 
            figure out the perfect game? We all know that feeling. 
          </p>

          <p>
            We've designed Off the Shelf to help you out with finding just the right 
            game to play. Are you feeling a fantasy game where everyone is trying 
            to control parts of a map, and you're all battling with cards? Or maybe you're 
            just feeling like rolling dice tonight? Maybe a few of your regulars had to 
            drop out last minute, and the game you were thinking about just doesn't 
            fit anymore.
          </p>

          <p>
            No matter your vibe, we've got you covered. We let you build a 
            collection here in our application, and can help you sort through it 
            quickly and easily. That way, you get to spend more time playing.
          </p>
        </div>
        {user.id ? 
        <></>

        :

        <div className="grid-col grid-col_4">
          <RegisterForm /> 
          <center>
            <h4>Already a Member?</h4>
            <Button className="btn btn_sizeSm" variant='contained'
              sx={{
                backgroundColor:'#e7822b',
                '&:hover': {backgroundColor:'#f9a44d'}
              }} onClick={onLogin}>
              Login
            </Button>
          </center>
        </div>
        }
      </div>

    </div>
  );
}

export default LandingPage;
