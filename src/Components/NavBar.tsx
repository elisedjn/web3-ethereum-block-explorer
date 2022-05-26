import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const NavBar = () => {
  return (
    <div id='main-header'>
      <div className='flex'>
        <a href={'/'}>
          <img src='main-logo.png' alt='Home' />
        </a>
        <h1>Ethereum Block Explorer</h1>
      </div>
      <nav className='flex nav-links'>
        <a className='nav-link' href={'/block'}>
          Blocks
        </a>
        <a className='nav-link' href={'/address'}>
          Addresses
        </a>
        <a className='nav-link' href={'/tx'}>
          Transactions
        </a>
      </nav>
    </div>
  );
};

export default NavBar;
