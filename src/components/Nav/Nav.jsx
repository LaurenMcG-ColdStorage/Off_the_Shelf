import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

import './Nav.css';

function Nav() {
  const user = useSelector((store) => store.user);
  
  //Photo by <a href="https://unsplash.com/@cmzw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Mingwei Lim</a> on <a href="https://unsplash.com/photos/a-pile-of-black-rocks-with-orange-letters-on-them-Qi1eNaEzlAE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  
  return (
    <div className="nav">
      <div className="nav-title">
        <Link to="/home">
          <h2 className="nav-title">Off The Shelf</h2>
        </Link>
      </div>
      <div className="navBar">
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/home">
              Home
            </Link>
            <Link className="navLink" to="/collection">
              Collection
            </Link>
            <Link className="navLink" to="/recommend">
              Recommend
            </Link>
            <Link className="navLink" to="/history">
              Play History
            </Link>
            {user.role === 'Collector' &&
              <Link className="navLink" to="/manage">
                Manage
              </Link>
            }
            <Link className="navLink" to='/user'>
              Account
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
