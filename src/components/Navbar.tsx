import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import icon from '../images/icon.png'

const Navbar: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false)

  // Check if the navbar burger menu is open
  // (Only applies to mobile)
  const checkIfActive = (base: string) => {
    return menuVisible
      ? `${base} is-active`
      : base
  }

  return (
    <div className='navbar is-family-secondary'>
      <div className='container'>
        <div className='navbar-brand'>
          <Link className='navbar-item' to='/'>
            <img src={icon} alt='home' />
          </Link>
          <div role='button' className={checkIfActive('navbar-burger')} onClick={() => setMenuVisible(!menuVisible)} aria-label='menu' aria-expanded='false' data-target='navMenu'>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>
        <div className={checkIfActive('navbar-menu')}>
          <div className='navbar-end'>
            <Link className='navbar-item' to='/characters' onClick={() => setMenuVisible(false)}>
              Characters
            </Link>
            <Link className='navbar-item' to='/history' onClick={() => setMenuVisible(false)}>
              History
            </Link>
            <Link className='navbar-item' to='/resources' onClick={() => setMenuVisible(false)}>
              Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar