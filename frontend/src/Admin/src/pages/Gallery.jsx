import React, { useState, useEffect } from 'react'
import AdminPageTitle from '../components/pageTitle/PageTitle'
import Modal from '../components/modal/Modal'

const Gallery = () => {
    const [galleryData, setGalleryData] = useState([]);

    useEffect(() => {
        // Fetch gallery data from your API
        fetch('http://localhost:3000/api/gallery/fetch/') // Replace with your actual API endpoint
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setGalleryData(data);
            })
            .catch((error) => {
                console.error('Error fetching gallery data:', error);
            });
    }, []); // Empty dependency array means this effect runs once when the component mounts



    // gallery form filds
    const formFields = [
        { name: 'galleryName', type: 'text', value: '', label: 'Gallery Name' },
        { name: 'galleryCategories', type: 'text', value: '', label: 'Gallery Categories' },
        { name: 'file', type: 'file', label: 'Select Event Image' },
        // Add more fields as needed
    ];
    return (
        <>
            <AdminPageTitle CurrentPage={'Gallery'} showButton={true} buttonId={'#gallery'} buttonName={'New Gallery Image'} />

            {/* Customers Card */}
            <div className="card top-selling overflow-auto">
                <div className="card-body pb-0">
                    <h5 className="card-title">Gallery <span>| Data</span></h5>
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Preview</th>
                                <th scope="col">Gallery Name</th>
                                <th scope="col">Gallery Categorie</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {galleryData.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row"><a href="#"><img src={item.galleryImage.url} alt="" /></a></th>
                                    <td><a href="#" className="text-primary fw-bold">{item.galleryName}</a></td>
                                    <td><a href="#" className="text-primary fw-bold">{item.galleryCategories}</a></td>
                                    <td>
                                        <span className='p-2'>
                                            <button className='btn btn-success'><i className='bi bi-pen'></i></button>
                                        </span>
                                        <span className='p-2'>
                                            <button className='btn btn-danger'><i className='bi bi-trash2'></i></button>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal modalTitel={'New Image'} modalId={'gallery'} formFields={formFields} />
        </>

    )
}

export default Gallery