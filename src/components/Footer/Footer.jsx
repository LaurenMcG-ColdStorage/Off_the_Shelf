import React from 'react';
import { Link } from '@mui/material';
import './Footer.css';

function Footer() {
  return (
    <footer className='navFoot'>
      <div className='navBarFoot'>
        <Link to='/data' className='navLinkFoot' 
          sx={{color: '#f2f2f2', 
          fontSize: 10, 
          textDecoration: 'none'}}
          >Data Policy</Link>
        <div>&copy; Rust Monster</div>
      </div>

    </footer>
  );
}

export default Footer;
