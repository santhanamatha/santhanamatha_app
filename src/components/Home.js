import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import song from '../song/santhathaya.mp3';
import img2 from '../images/02.jpg';
import img3 from '../images/03.jpg';
import img5 from '../images/05.jpg';
import img6 from '../images/06.jpg';
import img7 from '../images/07.jpg'; 

const Home = () => {
    const [notifications, setNotifications] = useState([]);
    const [lastTwoVideos, setLastTwoVideos] = useState([]);
    const [lastTwoEvents, setLastTwoEvents] = useState([]);
    const [lastEvents, setLastEvents] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
        const response = await axios.get('http://localhost:8000/api/notifications/');
        setNotifications(response.data.last_events);
        setLastTwoVideos(response.data.last_two_videos);
        setLastTwoEvents(response.data.last_two_events);
        setLastEvents(response.data.last_events);
        } catch (error) {
        console.error('Error fetching notifications:', error);
        }
    };

    const getYoutubeVideoId = (youtubeLink) => {
        const match = youtubeLink.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([^#\&\?]*).*/);
        if (match && match[1]) {
        return match[1];
        }
        return null;
    };

    const [slideIndex, setSlideIndex] = useState(0);

    const slides = [
        { src: img2 },
        { src: img3 },
        { src: img5 },
        { src: img6 },
        { src: img7 }
    ];

    useEffect(() => {
        const showSlides = () => {
        let i;
        const slides = document.getElementsByClassName("mySlides");
        const dots = document.getElementsByClassName("dot");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        setSlideIndex(prev => (prev + 1 > slides.length ? 1 : prev + 1));
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        if (slides[slideIndex - 1]) {
            slides[slideIndex - 1].style.display = "block";
        }
        if (dots[slideIndex - 1]) {
            dots[slideIndex - 1].className += " active";
        }
        };
        const interval = setInterval(showSlides, 2000);
        return () => clearInterval(interval);
    }, [slideIndex]);
    return (
        <div className="container-flued">
            <div>
                <div>
                <div className="slideshow-container" style={{ marginTop: '0%' }}>
                    {slides.map((slide, index) => (
                    <div className="mySlides fade" style={{ textAlignLast: 'center' }} key={index}>
                        <img src={slide.src} style={{ width: '95%' }} alt={`Slide ${index}`} />
                    </div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', display: 'none' }}>
                    {slides.map((_, index) => (
                    <span className="dot" key={index}></span>
                    ))}
                </div>
                </div>
                </div>
            <div className="ffbox mb-5 card_align"> 
                <div className="ffbox1">
                <div> 
                    <h2 className="gfg mb-3 navanal_heading">புனித சந்தன மாதா பாடல்</h2> 
                    <div className="row">
                    <div className="col-12">
                        <audio id="audioPlayer" style={{width: '99%'}} controls>
                        <source src={song} type="audio/mpeg" />
                        Your browser does not support the audio element.
                        </audio>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div>
                <h2 className="gfg mt-4 navanal_heading">தேவாலய நிகழ்வுகள்</h2> 
            </div>
            <div className="video-container" style={{ placeContent: 'center', color: '#9e052b' }}>
                {lastTwoEvents.length > 0 ? (
                lastTwoEvents.map(event => (
                    <div key={event.id} className="video-item">
                    <img src={`http://localhost:8000${event.image}`} style={{ width: '400px', height: '460px' }} alt="Event" />
                    <br />
                    <a style={{ borderRadius: '13px', background: '#9e052b' }} href={`http://localhost:8000${event.image}`} download="event_image.jpg" className="btn btn-primary mt-2">Download</a>
                    <p style={{ textDecoration: 'none', fontSize: 'large' }}>{event.discription}</p>
                    </div>
                ))
                ) : (
                <div>
                    <h3>No data found</h3>
                </div>
                )}
                <a className="more_span_align" href="/event">
                <span className="more_span"> More 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
                    <path d="M9 18l6-6-6-6" />
                    </svg>
                </span>
                </a>
            </div>
            <div className="ffbox mb-5 mt-4 card_align"> 
                <div className="ffbox1">
                <div> 
                    <h2 className="gfg mb-3 navanal_heading">புனித சந்தன மாதாவை நோக்கி ஜெபம்</h2> 
                    <div className="row">
                    <div className="col-12">
                        <p className="navanal_2">இறையருள் நிறைந்த புனித சந்தன மாதாவே! கன்னி மரியாளின் எழில்மிகு ஒப்பற்ற தாயே ! சந்தன மாதா ஆலயத்தில் வீற்றிருந்து / உமது அன்பின் அருளால் / அண்டி வரும் மக்களுக்கு / இறைவனின் அருட்கொடைகளை வாரி வழங்கி  வருகின்றீர் ./  உமக்கே எங்கள் வணக்கமும் நன்றியும் உரித்தாகுக!
                        தாயே இறைவனால் நீர் எவ்வளவோ நேசிக்கப்பட்டிருக்கிறீர். நீர் கேட்கும்  மன்றாட்டை / அவர் தர மறுப்பதில்லை என அறிந்திருக்கிற நாங்களும் / உமது திருவடி அருகில் நிற்கின்றோம் . இறைவனின் அருளை மிகுதியாக கொண்ட புனித சந்தன மாதாவே !நாங்கள் இறையருள் நிறைந்த இல்லத்தினராய் வாழ்ந்து
                        <Link className="ml-3" to="/prayer">Read More ...</Link></p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div>
                <h2 className="gfg mb-3 navanal_heading">தேவாலய வீடியோக்கள்</h2> 
            </div>
            <div className="video-container" style={{ justifyContent: 'center', color: '#9e052b' }}>
                {lastTwoVideos.length > 0 ? (
                lastTwoVideos.map(video => (
                    <div key={video.id} className="video-item">
                    <a href={video.youtube_link} target="_blank" rel="noopener noreferrer">
                        <img
                        src={`https://img.youtube.com/vi/${getYoutubeVideoId(video.youtube_link)}/0.jpg`}
                        alt="Thumbnail"
                        onError={(e) => { e.target.onerror = null; e.target.src = "path/to/default_thumbnail.jpg"; }} // fallback for invalid thumbnail URL
                        />
                    </a>
                    <br />
                    <a style={{ textDecoration: 'none', fontSize: 'large' }} href={video.youtube_link} target="_blank" rel="noopener noreferrer">{video.discription}</a>
                    </div>
                ))
                ) : (
                <div>
                    <h3>No data found</h3>
                </div>
                )}
                <a className="more_span_align" href="/festival_videos">
                <span className="more_span"> More
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
                    <path d="M9 18l6-6-6-6" />
                    </svg>
                </span>
                </a>
            </div>
            <div style={{color: '#440707'}}>
                <h2 className="gfg navanal_heading mt-3">தேவாலய அமைப்புகள்</h2>
                <div className="row" style={{marginRight: '0 !important'}}>
                <div className="col-6 organisation">
                    <h3 className="organisation_txt" style={{textAlign: 'right'}}>பங்கு நிர்வாகக்குழு</h3>
                </div>
                <div className="col-6">
                    <h3 className="organisation_txt">பல்லோட்டின் அருட்சகோதரிகள்</h3>
                </div>
                </div> 
                <div className="row" style={{marginRight: '0 !important'}}>
                <div className="col-6 organisation" style={{textAlign: 'right'}}>
                    <h3 className="organisation_txt">வின்சென்ட் தே பவுல் சபை</h3>
                </div>
                <div className="col-6">
                    <h3 className="organisation_txt">மரியாயின் சேனை</h3>
                </div>
                </div> 
                <div className="row" style={{marginRight: '0 !important'}}>
                <div className="col-6 organisation" style={{textAlign: 'right'}}>
                    <h3 className="organisation_txt">அன்பியக் குடும்பங்கள்</h3>
                </div>
                <div className="col-6">
                    <h3 className="organisation_txt">பலிபீடச்சிறார்கள்</h3>
                </div>
                </div>
                <div className="row" style={{marginRight: '0 !important'}}>
                <div className="col-12 organisation">
                    <h3 className="organisation_txt">இளையோர் மன்றம்</h3>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Home;