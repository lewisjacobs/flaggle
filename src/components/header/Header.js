import React from 'react';
import './header.scss';

function Header({ title, dayNumber }) {

  return (
      <div className='header'>
        <div className='title'>{title} #{dayNumber}</div>
    </div>
  );
}

export default Header;
