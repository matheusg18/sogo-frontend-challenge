import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
import './styles.scss';

function Navbar() {
  const [canShowMobileButton, setCanShowMobileButton] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) setCanShowMobileButton(true);
  }, []);

  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) setCanShowMobileButton(true);
    else setCanShowMobileButton(false);
  });

  return (
    <div className={`navbar ${canShowMobileButton && !showNavbar ? 'navbar--hidden' : ''}`}>
      {canShowMobileButton && (
        <button
          className={`navbar__menu ${showNavbar ? 'navbar__menu--close' : 'navbar__menu--hamburg'}`}
          type="button"
          onClick={() => setShowNavbar((prev) => !prev)}
        >
          {showNavbar ? <IoMdClose size="32px" /> : <GiHamburgerMenu size="28px" />}
        </button>
      )}
      <nav>
        <ul className="navbar__ul">
          <li className="navbar__li">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'navbar__link navbar__link--active' : 'navbar__link')}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="navbar__li">
            <NavLink
              to="/contracts/to-expire"
              className={({ isActive }) => (isActive ? 'navbar__link navbar__link--active' : 'navbar__link')}
            >
              Lista de vencimentos
            </NavLink>
          </li>
          <li className="navbar__li">
            <NavLink
              to="/register/person"
              className={({ isActive }) => (isActive ? 'navbar__link navbar__link--active' : 'navbar__link')}
            >
              Cadastrar pessoa
            </NavLink>
          </li>
          <li className="navbar__li">
            <NavLink
              to="/register/contract"
              className={({ isActive }) => (isActive ? 'navbar__link navbar__link--active' : 'navbar__link')}
            >
              Cadastrar contrato
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="navbar__spacer" />
      <img className="navbar__img" src="images/sogo-logo.svg" alt="sogo logo" />
    </div>
  );
}

export default Navbar;
