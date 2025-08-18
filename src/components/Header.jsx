// src/components/Header.jsx
import React, { useState } from 'react'
import styled from 'styled-components';
import { IoIosSearch } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";

const Nav = styled.div`
  border-bottom: 1px solid #ece2e2ff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 4rem;
  position: relative;

  .logo { width: 3rem; height: 3rem; }
  .search { position: relative; width: 30%; }
  .input {
    width: 100%;
    height: 2.5rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #f0f0f0;
    padding-left: 2rem;
    font-size: 1rem;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: #888;
    font-size: 1.3rem;
  }
  .links {
    height: 100%;
    width: 40%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.3rem;
  }
  .links a { text-decoration: none; color: black; }
  .hamburger { display: none; font-size: 1.8rem; cursor: pointer; }

  @media (max-width: 768px) {
    .links { display: none !important; }
    .hamburger { display: block; }
    .search { width: 50%; }
  }
`;

const SideMenu = styled.div`
  position: fixed;
  top: 0;
  left: ${props => (props.open ? '0' : '-250px')};
  width: 250px;
  height: 100%;
  background-color: #ebeff7;
  color: black;
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
  transition: left 0.3s ease;
  z-index: 1000;

  a { color: black; text-decoration: none; margin-bottom: 20px; font-size: 18px; }
  .close-btn { font-size: 24px; margin-bottom: 30px; align-self: flex-end; cursor: pointer; }
`;

// ✅ Changed 'show' to transient prop '$show'
const Overlay = styled.div`
  position: fixed;
  display: ${props => (props.$show ? 'block' : 'none')};
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,0.4);
  z-index: 999;
`;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Nav>
        <img className='logo' src="/logo2.avif" alt="Logo" />
        
        <div className='search'>
          <IoIosSearch className='search-icon'/>
          <input className='input' type="text" placeholder=' Search...' />
        </div>

        <div className='links'>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contactus">Contact Us</NavLink>
        </div>

        <div className='hamburger' onClick={() => setMenuOpen(true)}>
          <FaBars />
        </div>
      </Nav>

      {/* Side Menu */}
      <SideMenu open={menuOpen}>
        <span className="close-btn" onClick={() => setMenuOpen(false)}>
          <FaTimes />
        </span>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
        <NavLink to="/contactus" onClick={() => setMenuOpen(false)}>Contact Us</NavLink>
      </SideMenu>

      {/* Overlay */}
      <Overlay $show={menuOpen} onClick={() => setMenuOpen(false)} />
    </>
  );
}

export default Header;
