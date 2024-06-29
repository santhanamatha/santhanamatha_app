import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import logo from '../images/matha2.jpeg';


const NavigationMenu = () => {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
        const response = await axios.get('http://localhost:8000/api/notifications/');
        setNotifications(response.data.last_events);
        } catch (error) {
        console.error('Error fetching notifications:', error);
        }
    };

    const myFunction = () => {
        const x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
          x.className += " responsive";
        } else {
          x.className = "topnav";
        }
      };

    return (
        <div className="container-flued">
            <div className="fullnav">
            <div>
            <img src={logo} style={{ width: '3.5%', float: 'left' }} className="ml-5 m-2 logo" alt="Logo" />
              <p className="logo_name">Santhanamatha</p>
            </div>
            <div className="topnav" id="myTopnav">
                <a className="ml-2" href="#" />
                <Link className="ml-2 home_algn" to="/">Home</Link>
                <Link to="/prayer">Prayer</Link>
                <Link to="/mass_schedule">Mass Schedule</Link>
                <Link to="/event">Events</Link>
                <Link to="/festival_videos">Videos</Link>
                <Link to="/contact">Contact</Link>
                <a href="javascript:void(0);" className="icon" onClick={myFunction}>
                    <i className="fa fa-bars" />
                </a>
            </div>
          </div>
          <div>
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div id="scroll-container" key={notification.id}>
                  {notification.live_link ? (
                    <a style={{ textDecoration: 'none', color: 'whitesmoke' }} href={notification.live_link} target="_blank" rel="noopener noreferrer">
                      <div id="scroll-text">{notification.discription}</div>
                    </a>
                  ) : (
                    <div id="scroll-text">{notification.discription}</div>
                  )}
                </div>
              ))
            ) : (
              <div id="scroll-container">
                <div id="scroll-text">Welcome to the Santhanamatha Church.</div>
              </div>
            )}
          </div>
        </div>
    );
};

export default NavigationMenu;