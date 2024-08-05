import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark-gray text-gray-300 py-8 rounded-t-3xl">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        <div>
          <h4 className="text-white mb-2">EventPlus</h4>
          <p>&copy; 2024 EventPlus. All rights reserved.</p>
          <p>Your ultimate solution for seamless event management.</p>
        </div>
        <div>
          <h4 className="text-white mb-2">Services</h4>
          <ul>
            <li><a href="#event-planning">Event Planning</a></li>
            <li><a href="#ticketing">Ticketing</a></li>
            <li><a href="#venue-selection">Venue Selection</a></li>
            <li><a href="#event-marketing">Event Marketing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white mb-2">Quick Links</h4>
          <ul>
            <li><a href="#contact-us">Contact Us</a></li>
            <li><a href="#about-us">About Us</a></li>
            <li><a href="#privacy-policy">Privacy Policy</a></li>
            <li><a href="#terms-of-service">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white mb-2">Follow Us</h4>
          <ul>
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
