import React, { useState, useEffect } from 'react';
import AdminPageTitle from '../components/pageTitle/PageTitle'
import Modal from '../components/modal/Modal'


const Banners = () => {
    const [bannersData, setBannersData] = useState([]);

    useEffect(() => {
        // Fetch banner data from your API
        fetch('http://localhost:3000/api/banner/fetch') // Replace with your actual API endpoint
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setBannersData(data);
            })
            .catch((error) => {
                console.error('Error fetching banner data:', error);
            });
    }, []); // Empty dependency array means this effect runs once when the component mounts


    const handleDelete = async (bannerId) => {
        try {
            // Send a request to delete the banner on the backend
            const response = await fetch(`http://localhost:3000/api/banner/delete/${bannerId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Update the state to reflect the deletion
            setBannersData((prevData) => prevData.filter((banner) => banner._id !== bannerId));
        } catch (error) {
            console.error('Error deleting banner:', error);
        }
    };

    // banner form fild
    const formFields = [
        { name: 'bannerName', type: 'text', label: 'Banner Name' },
        { name: 'file', type: 'file', label: 'Select Event Image' },
        // Add more fields as needed
    ];
    return (
        <>
            <AdminPageTitle CurrentPage={'Banner'} showButton={true} buttonId={'#banner'} buttonName={'New Banner'} />

            <div className="card top-selling overflow-auto">
                <div className="card-body pb-0">
                    <h5 className="card-title">Banner <span>| Data</span></h5>
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Preview</th>
                                <th scope="col">Banner</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bannersData.map((item) => (
                                <tr key={item._id}>
                                    <th scope="row">
                                        <a href="#">
                                            <img className='border rounded-2' src={item.bannerImage.url} alt={item.bannerName} />
                                        </a>
                                    </th>
                                    <td>{item.bannerName}</td>
                                    <td className='fw-bold'>
                                        <span className='p-2'>
                                            <button className='btn btn-success'> <i className="bi bi-pen"></i></button>
                                        </span>
                                        <span className='p-2'>
                                            <button className='btn btn-danger' onClick={() => handleDelete(item._id)}>
                                                <i className="bi bi-trash2"></i>
                                            </button>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal modalId={'banner'} modalTitel={'New Banner'} formFields={formFields} />
        </>
    )
}

export default Banners