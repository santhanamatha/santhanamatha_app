import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import logo from './images/matha2.jpeg';
import song from './song/santhathaya.mp3';
import Prayer from './components/Prayer';
import MassSchedule from './components/MassTime';
import Events from './components/Event';
import Home from './components/Home';
import Videos from './components/Video';
import Contact from './components/Contact';
import img2 from './images/02.jpg';
import img3 from './images/03.jpg';
import img5 from './images/05.jpg';
import img6 from './images/06.jpg';
import img7 from './images/07.jpg';
import NavigationMenu from './components/Navigation.js'


function App() {

  

  return (
    <div>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content="Santhanamatha church" />
        <meta name="keywords" content="Santhanamatha church, santhanamatha, santhanamatha church thanjavur,
        santhanamatha church tanjur, santhanamathagn, santhanamatha church ganamnagar, Rev.Fr. A. Victor Dass,
        ST. ANNE'S CHURCH GNANAM NAGAR, st.anne's church gnanam nagar, st.anne's church, st.anne's church thanjvur" />
        <meta name="author" content="A. Victor Dass" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Home</title>
        <link rel="icon" type="image/png" href={logo} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Kavivanar&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
        <div className="container-flued">
          <Router>
            <NavigationMenu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/prayer" element={<Prayer />} />
                <Route path="/mass_schedule" element={<MassSchedule />} />
                <Route path="/event" element={<Events />} />
                <Route path="/festival_videos" element={<Videos />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
          </Router>
        </div>
        <footer>
          <div className="left">© Copyright Santhanamatha 2024. All rights reserved.</div>
          <div className="right mr-3">
            <a href="https://edwinjoe.vercel.app/" target="_blank" style={{color: 'white', textDecoration: 'none'}}>
              <i className="fa fa-external-link" aria-hidden="true" />&nbsp;
              Developed by: A Edwin Joe <br /> edwinjoedevops@gmail.com
            </a>
          </div>
        </footer>
      </div>
  );
}

export default App;
