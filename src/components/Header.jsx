import { useState } from 'react';
import styled from 'styled-components';
import { IoIosSearch } from "react-icons/io";
import logo from "../../public/humanoid_maker_logo_white-Photoroom.png";
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaShoppingCart } from "react-icons/fa";

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
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f5f7fa;
  border-radius: 30px;
  padding: 8px 15px;
  width: 40%;
  max-width: 500px;
  transition: all 0.3s ease;

  &:focus-within {
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3);
  }

  @media (max-width: 1024px) {
    width: 50%;
  }

  @media (max-width: 768px) {
    width: 70%;
    margin: 0 10px;
  }
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  padding: 5px 10px;
  font-size: 14px;
  color: #2c3e50;
  outline: none;

  &::placeholder {
    color: #95a5a6;
  }
`;

const SearchIcon = styled(IoIosSearch)`
  color: #7f8c8d;
  font-size: 20px;
  margin-right: 5px;
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
      content: '';
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
  font-size: 24px;
  color: #34495e;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const SideMenu = styled.div`
  position: fixed;
  top: 0;
  left: ${props => (props.open ? '0' : '-100%')};
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

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1050;
  display: ${props => (props.$show ? 'block' : 'none')};
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

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems] = useState(0); 

  return (
    <>
      <Nav>
        <NavLink to="/">
          <Logo src={logo} alt="Company Logo" />
        </NavLink>

        <SearchContainer>
          <SearchIcon />
          <SearchInput type="text" placeholder="Search products..." />
        </SearchContainer>

        <NavLinks>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/products">Products</NavItem>
          <NavItem to="/About">About</NavItem>
          <NavItem to="/ContactUs">Contact</NavItem>
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
