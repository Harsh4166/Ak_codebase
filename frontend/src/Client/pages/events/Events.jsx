import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext'; // Update the path


import '../css/Events.css'
const pageTitle = 'Events';

const Events = ({ }) => {
    const { decodedToken } = useAuth();
    const [eventsData, setEventsData] = useState([]);

    useEffect(() => {
        // Fetch event data from your API
        fetch('http://localhost:3000/api/events/fetch') // Replace with your actual API endpoint
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setEventsData(data);
            })
            .catch((error) => {
                console.error('Error fetching events data:', error);
            });
    }, []); // Empty dependency array means this effect runs once when the component mounts



    const events = [
        { title: 'Free Event', price: 0, unit: 'nos', image: './logo/Logo.png', features: ['event description'] },
        { title: 'Business Event', price: 19, unit: 'kg', image: 'path-to-business-image.jpg', features: [''] },
        { title: 'Developer Event', price: 29, unit: 'kg', image: 'path-to-developer-image.jpg', features: [''] },
        { title: 'Ultimate Event', price: 49, unit: 'nos', image: 'path-to-ultimate-image.jpg', features: [''] },
    ];

    return (
        <>
            <Breadcrumbs currentPage={pageTitle} />

            <section id="event" className="event">
                <div className="container">
                    <div className="section-header">
                        <h2>Events</h2>
                        <p>Our decorated <span>Event </span></p>
                    </div>
                    <div className="row">
                        {eventsData.map((event, index) => (
                            <div key={index} className={`col-lg-3 col-md-6`}>
                                <div className="box">
                                    <h3>{event.eventName}</h3>
                                    <img src={event.eventImage.url} alt={event.eventName} className="event-image" />

                                    <h4><sup><i className="bi bi-currency-rupee"></i></sup>{event.eventPrice}<span></span></h4>

                                    <div className="btn-wrap">
                                        {decodedToken ? (
                                            <NavLink to={`/events/event-booking/${event._id}`} className="btn-buy">
                                                Book Event
                                            </NavLink>
                                        ) : (
                                            <NavLink to="/clientAuth" className="btn-buy">
                                                Book Event
                                            </NavLink>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Events;
