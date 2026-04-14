import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import "./Footer.css";

const footerLinks = [
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Privacy", path: "/privacy" },
  { label: "Terms", path: "/terms" },
];

const socialLinks = [
  { label: "LinkedIn", icon: <FaLinkedin />, path: "https://linkedin.com" },
  { label: "Twitter", icon: <FaTwitter />, path: "https://twitter.com" },
  { label: "Instagram", icon: <FaInstagram />, path: "https://instagram.com" },
];

function Footer() {
  return (
    <footer className="footer-section">
      {/* Logo / Brand */}
      <div className="footer-brand">
        <span className="footer-logo">LUXE.</span>
        <p className="footer-desc">
          Curating premium lifestyle products for modern living.
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="footer-nav" aria-label="Footer navigation">
        <ul className="links-section">
          {footerLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className="footer-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Social Links */}
      <div className="footer-social" aria-label="Social media links">
        {socialLinks.map((s) => (
          <a
            key={s.label}
            href={s.path}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label={s.label}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </footer>
  );
}

export default Footer;