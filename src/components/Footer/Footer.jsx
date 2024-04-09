import React from 'react';
import { Link } from '@mui/material';
import './Footer.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (
    <footer className='navFoot'>
      <div className='navBarFoot'>
        <Link to='/data' className='navLinkFoot' sx={{color: '#f2f2f2', textDecoration: 'none'}}>Data Policy</Link>
        <div>&copy; Rust Monster</div>
      </div>

    </footer>
  );
}

export default Footer;
