import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../App.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';
 

const Event = () => {
    const [events, setEvents] = useState([]);
    const [duration, setDuration] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchEvents();
    }, [currentPage, duration]);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/events/?duration=${duration}&page=${currentPage}`);
            setEvents(response.data.results);
            setHasNext(response.data.next !== null);
            setHasPrevious(response.data.previous !== null);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleDurationChange = (event) => {
        setDuration(event.target.value);
        setCurrentPage(1); // Reset to first page when duration changes
    };

    const handlePaginationClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container-flued">
            <Helmet>
                <title>Events</title>
            </Helmet>
            <h2 className='v_title'>தேவாலய நிகழ்வுகள்</h2>
            <div>
                <form style={{ textAlign: 'right' }} className="mr-5">
                    <select
                        name="duration"
                        value={duration}
                        onChange={handleDurationChange}
                        className="filter_select"
                    >
                        <option value="all">All</option>
                        <option value="1h">Past 1 Hour</option>
                        <option value="1d">Past 1 Day</option>
                        <option value="1w">Past 1 Week</option>
                        <option value="1m">Past 1 Month</option>
                        <option value="1y">Past 1 Year</option>
                    </select>
                </form>
            </div>

            <div className="video-container" style={{ placeContent: 'center', color: '#9e052b' }}>
                {events.length > 0 ? (
                    events.map(event => (
                        <div className="video-item" key={event.id}>
                            <img src={`http://localhost:8000${event.image}`} style={{ width: '400px', height: '460px' }} alt="Event" />
                            <br />
                            <a style={{ borderRadius: '13px', background: '#9e052b' }} target="_blank" rel="noopener noreferrer" href={`http://localhost:8000${event.image}`} className="btn btn-primary mt-2">Download</a>
                            <a style={{ textDecoration: 'none', fontSize: 'large' }}>{event.discription}</a>
                        </div>
                    ))
                ) : (
                    <div>
                        <h3>No data found</h3>
                    </div>
                )}
            </div>

            <div className="pagination" style={{ justifyContent: 'center' }}>
                <span className="step-links">
                    {hasPrevious && (
                        <>
                            <Link style={{ marginRight: '5px' }} to="#" onClick={() => handlePaginationClick(1)}>
                                &laquo; first
                            </Link>
                            <Link to="#" onClick={() => handlePaginationClick(currentPage - 1)}>
                                previous
                            </Link>
                        </>
                    )}

                    <span className="current">
                        Page {currentPage}
                    </span>

                    {hasNext && (
                        <>
                            <Link style={{ marginRight: '5px' }} to="#" onClick={() => handlePaginationClick(currentPage + 1)}>
                                next
                            </Link>
                            <Link to="#" onClick={() => handlePaginationClick(totalPages)}>
                                last &raquo;
                            </Link>
                        </>
                    )}
                </span>
            </div>
        </div>
    );
};

export default Event;