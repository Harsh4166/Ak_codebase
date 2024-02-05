import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import '../css/Events.css';
import EventForm from './EventForm';

const EventsBooking = () => {
    const { eventId } = useParams();
    const [eventsData, setEventsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/events/fetch/${eventId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setEventsData(Array.isArray(data) ? data : [data]);
            } catch (error) {
                console.error('Error fetching events data:', error);
                setError('Error fetching events data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [eventId]);

    return (
        <>
            <Breadcrumbs previousPage={'Events'} currentPage={'Event Booking'} />

            <section id="event" className="event">
                <div className="container">
                    <div className="section-header">
                        <h2>Event Booking</h2>
                        <p>Book your <span>Event</span></p>
                    </div>
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {!loading && !error && (
                        <div className="row">
                            {eventsData.map((event, index) => (
                                <div key={index} className="col-md-12 mb-4">
                                    <div className="card event-card">
                                        <div className="card-body">
                                            <div className="row justify-content-between align-items-center">
                                                <div className="col-md-5">
                                                    <div className="box">
                                                        <h3>{event.eventName}</h3>
                                                        <img src={event.eventImage.url} alt={event.eventName} className="event-image" />
                                                        <h4 className='text-dark'><sup><i className="bi bi-currency-rupee"></i></sup>{event.eventPrice}<span> / GST</span></h4>
                                                    </div>
                                                </div>
                                                <div className="col-md-7">
                                                    <EventForm eventId={event.eventId} eventName={event.eventName} eventPrice={event.eventPrice} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default EventsBooking;
