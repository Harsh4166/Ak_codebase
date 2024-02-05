import React, { useState, useEffect } from 'react'
import AdminPageTitle from '../components/pageTitle/PageTitle'
import Modal from '../components/modal/Modal'

const Events = () => {

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





    // event form filds
    const formFields = [
        { name: 'eventName', type: 'text', value: '', label: 'Event Name' },
        { name: 'eventPrice', type: 'number', value: '', label: 'EventPrice' },
        { name: 'file', type: 'file', label: 'Select Event Image' },
        // Add more fields as needed
    ];
    return (
        <>
            <AdminPageTitle CurrentPage={'Events'} showButton={true} buttonId={'#events'} buttonName={'New Event'} />
            {/* Customers Card */}
            <div className="card top-selling overflow-auto">
                <div className="card-body pb-0">
                    <h5 className="card-title">Event <span>| Data</span></h5>
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope='col'>Preview</th>
                                <th scope="col">Event Name</th>
                                <th scope="col">Action</th>
                                {/* Add more table headers as needed */}
                            </tr>
                        </thead>
                        <tbody>
                            {eventsData.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row"><a href="#"><img src={item.eventImage.url} alt="" /></a></th>
                                    <td>{item.eventName}</td>
                                    <td>
                                        <span className='p-2'>
                                            <button className='btn btn-success'><i className='bi bi-pen'></i></button>
                                        </span>
                                        <span className='p-2'>
                                            <button className='btn btn-danger'><i className='bi bi-trash2'></i></button>
                                        </span>
                                    </td>
                                    {/* Add more table cells as needed */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal modalTitel={'New Event'} modalId={'events'} formFields={formFields} />
        </>
    )
}

export default Events