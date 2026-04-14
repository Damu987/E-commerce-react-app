import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";

import "./Header.css";

export default function Header() {
  const { cartItems } = useCart();
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };
  
  useEffect(() => {
    if(open){
      const timer = setTimeout(() => {
        setOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open]);
  
  return (
    <header>
      <nav className="navbar">

        {/* Logo */}
        <Link className="site-logo" to="/">LUXE.</Link>

        {/* Hamburger */}
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          {open ? <FiX /> : <FiMenu />}
        </button>

        {/* Nav Links */}
        <section className={`nav-links ${open ? "active" : ""}`}>
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/shop" onClick={() => setOpen(false)}>Shop</NavLink>
          <NavLink to="/deals" onClick={() => setOpen(false)}>Deals</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>

          {/* Mobile Only */}
          <section className="mobile-only">
            {!auth ? (
              <Link to="/signin" className="auth-btn">
                <FiUser /> Sign In
              </Link>
            ) : (
              <button onClick={handleLogout} className="logout-btn">
                <FiLogOut /> Logout
              </button>
            )}

            <Link to="/cart" className="cart-btn">
              Cart ({cartItems.length})
            </Link>
          </section>
        </section>

        {/* Desktop Right Section */}
        <section className="right-section">
          <Link to="/cart" className="cart-btn">
            Cart ({cartItems.length})
          </Link>

          {!auth ? (
            <Link to="/signin" className="icon-auth">
              <FiUser />
              <span className="tooltip">Sign In</span>
            </Link>
          ) : (
            <button onClick={handleLogout} className="logout-btn">
              <FiLogOut />Logout
            </button>
          )}
        </section>

      </nav>
    </header>
  );
}