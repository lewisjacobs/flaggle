import React from 'react';
import './header.css';

function Header({ title, dayNumber }) {

  return (
      <div className='header'>
        <div className='title'>{title} #{dayNumber}</div>
    </div>
  );
}

export default Header;
