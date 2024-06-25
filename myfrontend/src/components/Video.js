import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../App.css';
import { Helmet } from 'react-helmet'; 

const Video = () => {

    const [videos, setVideos] = useState([]);
    const [duration, setDuration] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);

    useEffect(() => {
        fetchVideos();
    }, [currentPage, duration]);

    const fetchVideos = async () => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/videos/?page=${currentPage}&duration=${duration}`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch videos');
            }
            const data = await response.json();
            setVideos(data.results); // Assuming the response structure matches pagination format
            setHasNext(data.next !== null);
            setHasPrevious(data.previous !== null);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    const handleDurationChange = (event) => {
        setDuration(event.target.value);
        setCurrentPage(1); // Reset to first page when duration changes
    };

    const handlePaginationClick = (page) => {
        setCurrentPage(page);
    };

    const getYoutubeVideoId = (youtubeLink) => {
        const match = youtubeLink.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([^#\&\?]*).*/);
        if (match && match[1]) {
        return match[1];
        }
        return null;
    };

    return (
        <div>
            <Helmet>
                <title>Videos</title>
            </Helmet>
            <h2 className="v_title">தேவாலய வீடியோக்கள்</h2>
            <div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        fetchVideos();
                    }}
                    style={{ textAlign: 'right' }}
                    className="mr-5"
                >
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
                    {/* <button type="submit" className="filter_btn">
                        Filter
                    </button> */}
                </form>
            </div>

            <div className="video-container" style={{ placeContent: 'center', color: '#9e052b' }}>
                {videos.length > 0 ? (
                    videos.map((video) => (
                        <div className="video-item" key={video.id}>
                            <a href={video.youtube_link} target="_blank" rel="noopener noreferrer">
                                <img src={`https://img.youtube.com/vi/${getYoutubeVideoId(video.youtube_link)}/0.jpg`} alt="Thumbnail" />
                            </a>
                            <br />
                            <a
                                style={{ textDecoration: 'none', fontSize: 'large' }}
                                href={video.youtube_link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {video.discription}
                            </a>
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
                            <Link style={{ marginRight: '5px' }}
                                onClick={() => handlePaginationClick(1)}
                            >
                                &laquo; first
                            </Link>
                            <Link
                                onClick={() =>
                                    handlePaginationClick(currentPage - 1)
                                }
                            >
                                previous
                            </Link>
                        </>
                    )}

                    <span className="current">
                        Page {currentPage}
                    </span>

                    {hasNext && (
                        <>
                            <Link style={{ marginRight: '5px' }}
                                onClick={() =>
                                    handlePaginationClick(currentPage + 1)
                                }
                            >
                                next
                            </Link>
                            <Link
                                onClick={() =>
                                    handlePaginationClick(currentPage)
                                }
                            >
                                last &raquo;
                            </Link>
                        </>
                    )}
                </span>
            </div>
        </div>
    );
};

export default Video;