import React, { useState, useEffect,useRef } from "react";
import styled from "styled-components";
import logo from "../../public/humanoid_maker_logo_white-Photoroom.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaShoppingCart } from "react-icons/fa";
import SearchBar from "./SearchBar";
import Cart from "../pages/Cart";

// ========================
// Profile Dropdown
// ========================
const ProfileDropdown = styled.div`
  position: absolute;
  top: 36px;
  right: 0;
  background: #ffffff;
  border: 1px solid #eee;
  border-radius: 6px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  width: 220px;
  z-index: 1200;
  overflow: hidden;
`;

const ProfileItem = styled.div`
  padding: 12px 16px;
  font-size: 14px;
  color: #34495e;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;

  &:hover {
    background: #f7f7f7;
    color: #3498db;
  }

  &:last-child {
    border-bottom: none;
    color: #e74c3c;
    font-weight: 500;
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
    order: 2;
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

// ========================
// Orders Dropdown Styled
// ========================
const OrdersDropdown = styled.div`
  position: absolute;
  top: 28px;
  right: 0;
  background: #ffffff;
  border: 1px solid #eee;
  border-radius: 6px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  width: 160px;
  z-index: 1200;
`;

const OrdersItem = styled.div`
  padding: 12px 14px;
  cursor: pointer;
  font-size: 14px;
  color: #34495e;

  &:hover {
    background: #f5f5f5;
    color: #3498db;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #fff;
  position: relative;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 10px 15px;
  }
`;


function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);

  const [showOrdersDropdown, setShowOrdersDropdown] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart.length);

    const updateCart = () => {
      const updated = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(updated.length);
    };

    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target)
    ) {
      setShowProfileDropdown(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  const handleUserClick = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("cart");
      setCartItems(0);
      navigate("/");
      window.location.reload();
    } else {
      navigate("/auth");
    }
  };

  return (
    <>
      <Nav>
        <LogoWrapper to="/">
          <Logo src={logo} alt="Company Logo" />
        </LogoWrapper>

        <SearchBar />

        <NavLinks>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/About">About</NavItem>
          <NavItem to="/ContactUs">Contact</NavItem>
          <NavItem to="/policy">Policy</NavItem>
        </NavLinks>

        <IconsContainer>
          {/* Login / Logout Button */}
<IconButton ref={profileRef} onClick={() => {
  if (token) {
    setShowProfileDropdown((prev) => !prev);
  } else {
    navigate("/auth");
  }
}}>

  <FaUser />

  {showProfileDropdown && token && (
    <ProfileDropdown>

      <ProfileItem
        onClick={() => {
          setShowProfileDropdown(false);
          navigate("/my-orders");
        }}
      >
        My Orders
      </ProfileItem>

      <ProfileItem
  onClick={() => {
    navigate("/add-address");
    setShowProfileDropdown(false);
    setShowAddAddress(true); // open modal
  }}
>
  Add New Address
</ProfileItem>


      <ProfileItem
        onClick={() => {
          setShowProfileDropdown(false);
          handleUserClick();
        }}
      >
        Logout
      </ProfileItem>
    </ProfileDropdown>
  )}
</IconButton>


          {/* ✅ Orders Button (only if logged in) */}
          {token && (
            <IconButton
              onClick={() => {
                navigate("/my-orders");
              }}
            >
              Orders
            </IconButton>
          )}

          {/* Cart Button */}
          <IconButton
            onClick={() => {
              if (cartItems > 0) {
                setShowCart(true);
              } else {
                setShowOrdersDropdown((prev) => !prev);
              }
            }}
          >
            <FaShoppingCart />
            {/* <span>{cartItems}</span>

            {showOrdersDropdown && cartItems === 0 && (
              <OrdersDropdown>
                <OrdersItem
                  onClick={() => {
                    setShowOrdersDropdown(false);
                    navigate("/my-orders");
                  }}
                >
                  Your Orders
                </OrdersItem>
              </OrdersDropdown>
            )} */}
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

        <MobileNavItem to="/" onClick={() => setMenuOpen(false)}>Home</MobileNavItem>
        {/* <MobileNavItem to="/products" onClick={() => setMenuOpen(false)}>Products</MobileNavItem> */}
        <MobileNavItem to="/about" onClick={() => setMenuOpen(false)}>About Us</MobileNavItem>
        <MobileNavItem to="/ContactUs" onClick={() => setMenuOpen(false)}>Contact</MobileNavItem>

      {token ? (
  <>
    <MobileNavItem to="/profile" onClick={() => setMenuOpen(false)}>
      <FaUser /> My Profile
    </MobileNavItem>

    <MobileNavItem to="/my-orders" onClick={() => setMenuOpen(false)}>
      My Orders
    </MobileNavItem>

    <MobileNavItem to="/add-address" onClick={() => setMenuOpen(false)}>
      Add New Address
    </MobileNavItem>

    <MobileNavItem
      as="div"
      onClick={() => {
        handleUserClick();
        setMenuOpen(false);
      }}
    >
      Logout
    </MobileNavItem>
  </>
) : (
  <MobileNavItem to="/auth" onClick={() => setMenuOpen(false)}>
    <FaUser /> Login / Register
  </MobileNavItem>
)}

        <MobileNavItem to="/cart" onClick={() => setMenuOpen(false)}>
          <FaShoppingCart /> Cart ({cartItems})
        </MobileNavItem>
      </SideMenu>

      <Overlay $show={menuOpen} onClick={() => setMenuOpen(false)} />

      {/* Cart Modal */}
      {showCart && (
        <Cart
          onClose={() => {
            setShowCart(false);
            setShowOrdersDropdown(false);
          }}
        />
      )}
    </>
  );
}

export default Header;