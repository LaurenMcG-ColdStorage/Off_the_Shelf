import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import CollectionPage from '../CollectionPage/CollectionPage';
import PlayHistory from '../PlayHistory/PlayHistory';
import Manage from '../Manage/Manage';

import Recommend from '../Recommend/Recommend';
import RecPlayers from '../Recommend/RecPlayers/RecPlayers';
import RecTime from "../Recommend/RecTime/RecTime";
import RecMech from "../Recommend/RecMech/RecMech";
import RecTheme from "../Recommend/RecTheme/RecTheme";
import RecResult from '../Recommend/RecResult/RecResult';

import DataPolicy from '../DataPolicy/DataPolicy';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'GET_MECHANICS'});
    dispatch({ type: 'GET_GAME_THEMES'});
  }, []);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:5173/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          
          <ProtectedRoute exact path='/collection'>
            {/* This route shows the Collection Page when logged in, otherwise it's the login page */}
            <CollectionPage />
          </ProtectedRoute>
          
          <ProtectedRoute exact path='/recommend'>
            {/* This route shows the Recommend Feature when logged in, or Login Page if not. */}
            <Recommend />
          </ProtectedRoute>

          <ProtectedRoute exact path='/recplayers'>
              <RecPlayers />
          </ProtectedRoute>

          <ProtectedRoute exact path='/reclength'>
              <RecTime />
          </ProtectedRoute>

          <ProtectedRoute exact path='/recmechanics'>
              <RecMech />
          </ProtectedRoute>

          <ProtectedRoute exact path='/rectheme'>
              <RecTheme />
          </ProtectedRoute>
          
          <ProtectedRoute exact path='/history'>
            <PlayHistory />
          </ProtectedRoute>

          <ProtectedRoute exact path='/manage'>
            <Manage />
          </ProtectedRoute>

          <ProtectedRoute exact path='/recresult'>
            <RecResult />
          </ProtectedRoute>

          <Route path="/data">
            <DataPolicy />
          </Route>

          {/* <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute> */}

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/home" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/home" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          {/* This takes our user to the landing page. The landing page already has logic to
          render items conditionally, so we don't need a redirect */}
          <Route exact path="/home"> 
              <LandingPage />
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
