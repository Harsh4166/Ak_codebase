import React, { useState, useEffect } from 'react';
import './Gallery.css';

const Gallery = () => {
    const [galleryData, setGalleryData] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        // Fetch gallery data from your API
        fetch('http://localhost:3000/api/gallery/fetch') // Replace with your actual API endpoint
            .then(response => response.json())
            .then(data => setGalleryData(data))
            .catch(error => console.error('Error fetching gallery data:', error));
    }, []);

    // Extract unique categories
    const galleryCategories = [...new Set(galleryData.map(item => item.galleryCategories))];

    // Filter gallery items based on the active category
    const filteredGalleryItems = activeCategory === 'All'
        ? galleryData
        : galleryData.filter(item => item.galleryCategories === activeCategory);

    // Handle category change
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

    return (
        <section id="gallery" className="gallery">
            <div className="container" data-aos="fade-up">
                <div className="section-header">
                    <h2>Gallery</h2>
                    <p>Check Our <span>Gallery</span></p>
                </div>

                {/* Gallery category navigation */}
                <ul className="nav nav-tabs d-flex justify-content-center" data-aos="fade-up" data-aos-delay="200">
                    {['All', ...galleryCategories].map((category, index) => (
                        <li className="nav-item" key={index}>
                            <a
                                className={`nav-link ${category === activeCategory ? 'active show' : ''}`}
                                onClick={() => handleCategoryChange(category)}
                            >
                                <h4>{category}</h4>
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Display filtered gallery items */}
                <div className="tab-content mt-3" data-aos="fade-up" data-aos-delay="300">
                    <div className="tab-pane fade active show" id="gallery-starters">
                        <div className="tab-header text-center">
                            <div className="row gy-5">
                                {filteredGalleryItems.map((item) => (
                                    <div key={item._id} className="col-lg-3 gallery-item">
                                        <a href={item.galleryImage.url} className="glightbox">
                                            <img src={item.galleryImage.url} className="gallery-img img-fluid" alt="" />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Gallery;
