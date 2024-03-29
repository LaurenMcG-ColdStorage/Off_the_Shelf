import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

  return (
    <div className="container">
      <h2>{heading}</h2>
      <div className="grid">
        <div className="grid-col grid-col_8">
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
      </div>

        {user.id ? 
        <h2>Welcome Back, {user.username}!</h2> 

        :

        <div className="grid-col grid-col_4">
        <RegisterForm /> 
        <center>
          <h4>Already a Member?</h4>
          <button className="btn btn_sizeSm" onClick={onLogin}>
            Login
          </button>
        </center>
      </div>
        }
    </div>
  );
}

export default LandingPage;
