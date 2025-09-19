import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../public/humanoid_maker_logo_white-Photoroom.png";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaShoppingCart } from "react-icons/fa";
import SearchBar from "./SearchBar";

// Styled Components
const Nav = styled.nav`
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 0 3%;
  }
`;

const Logo = styled.img`
  height: 50px;
  width: auto;
  cursor: pointer;

  @media (max-width: 768px) {
    height: 40px;
  }
`;

const LogoWrapper = styled(NavLink)`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    order: 2; /* Second in mobile */
    margin: 0 auto;
  }
`;


const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(NavLink)`
  color: #34495e;
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.2s ease;
  position: relative;

  &:hover {
    color: #3498db;
  }

  &.active {
    color: #3498db;

    &::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background: #3498db;
    }
  }
`;

const MobileMenuButton = styled.div`
  display: none;
  font-size: 30px;
  color: #34495e;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    order: 1;
  }
`;

const SideMenu = styled.div`
  position: fixed;
  top: 0;
  left: ${(props) => (props.open ? "0" : "-100%")};
  width: 280px;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease-in-out;
  z-index: 1100;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.div`
  align-self: flex-end;
  font-size: 24px;
  color: #7f8c8d;
  cursor: pointer;
  margin-bottom: 30px;
`;

const MobileNavItem = styled(NavLink)`
  color: #34495e;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #ecf0f1;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    color: #3498db;
  }

  &.active {
    color: #3498db;
    font-weight: 600;
  }
`;
const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const IconButton = styled.div`
  color: #34495e;
  font-size: 18px;
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;

  &:hover {
    color: #3498db;
  }

  span {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #e74c3c;
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: bold;
  }
`;


const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1050;
  display: ${(props) => (props.$show ? "block" : "none")};
`;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems] = useState(0);

  return (
    <>
      <Nav>
        <LogoWrapper to="/">
          <Logo src={logo} alt="Company Logo" />
        </LogoWrapper>

       <SearchBar/>

        <NavLinks>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/About">About</NavItem>
          <NavItem to="/ContactUs">Contact</NavItem>
          <NavItem to="/products">Policy</NavItem>
        </NavLinks>

        <IconsContainer>
          <IconButton>
            <FaUser />
          </IconButton>
          <IconButton>
            <FaShoppingCart />
            <span>{cartItems}</span>
          </IconButton>
        </IconsContainer>

        <MobileMenuButton onClick={() => setMenuOpen(true)}>
          <FaBars />
        </MobileMenuButton>
      </Nav>

      <SideMenu open={menuOpen}>
        <CloseButton onClick={() => setMenuOpen(false)}>
          <FaTimes />
        </CloseButton>
        <MobileNavItem to="/" onClick={() => setMenuOpen(false)}>
          Home
        </MobileNavItem>
        <MobileNavItem to="/products" onClick={() => setMenuOpen(false)}>
          Products
        </MobileNavItem>
        <MobileNavItem to="/about" onClick={() => setMenuOpen(false)}>
          About Us
        </MobileNavItem>
        <MobileNavItem to="/contact" onClick={() => setMenuOpen(false)}>
          Contact
        </MobileNavItem>
        <MobileNavItem to="/account" onClick={() => setMenuOpen(false)}>
          <FaUser /> My Account
        </MobileNavItem>
        <MobileNavItem to="/cart" onClick={() => setMenuOpen(false)}>
          <FaShoppingCart /> Cart ({cartItems})
        </MobileNavItem>
      </SideMenu>

      <Overlay $show={menuOpen} onClick={() => setMenuOpen(false)} />
    </>
  );
}

export default Header;