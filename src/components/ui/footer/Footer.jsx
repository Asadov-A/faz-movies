import React from "react";
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-title">Faz Movies</h2>
        <p className="footer-subtitle">Your ultimate entertainment hub</p>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/movies">Movies</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-socials">
          <span>Follow us:</span>
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaYoutube /></a>
        </div>

        <p className="footer-note">&copy; {new Date().getFullYear()} Faz Movies. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
