import React, { useEffect, useState } from 'react';
import './Banner.css'
const Banner = () => {
    const [bannersDatas, setbannersDatas] = useState([]);
    const [activeSlide, setActiveSlide] = useState(0);

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
                setbannersDatas(data);
            })
            .catch((error) => {
                console.error('Error fetching banner data:', error);
            });
    }, []); // Empty dependency array means this effect runs once when the component mounts

    useEffect(() => {
        if (bannersDatas.length > 1) {
            const interval = setInterval(() => {
                setActiveSlide((prevSlide) => (prevSlide + 1) % bannersDatas.length);
            }, 5000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [bannersDatas]); // Dependency on bannersDatas


    const handlePrevSlide = () => {
        setActiveSlide((prevSlide) => (prevSlide - 1 + bannersDatas.length) % bannersDatas.length);
    };

    const handleNextSlide = () => {
        setActiveSlide((prevSlide) => (prevSlide + 1) % bannersDatas.length);
    };
    // styles 






    return (
        <section id="hero" className="d-flex flex-column justify-content-end align-items-center">
            <div id="heroCarousel" data-bs-interval="5000" className="container-fluid carousel carousel-fade" data-bs-ride="carousel">

                {bannersDatas.map((bannersData, index) => (
                    <div key={index} className={`carousel-item  ${activeSlide === index ? 'active' : ''}`}>
                        <div className="carousel-container  " style={{ backgroundImage: `url('${bannersData.bannerImage.url}')`, borderRadius: '10px' }}>
                            {/* Your content goes here */}
                        </div>
                    </div>
                ))}

                <button className="carousel-control-prev" onClick={handlePrevSlide}>
                    <span className="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
                </button>

                <button className="carousel-control-next" onClick={handleNextSlide}>
                    <span className="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
                </button>

            </div>

            {/* <svg className="hero-waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none">
                <defs>
                    <path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className="wave1">
                    <use xlinkHref="#wave-path" x="50" y="3" fill="rgba(255,255,255, .1)" />
                </g>
                <g className="wave2">
                    <use xlinkHref="#wave-path" x="50" y="0" fill="rgba(255,255,255, .2)" />
                </g>
                <g className="wave3">
                    <use xlinkHref="#wave-path" x="50" y="9" fill="#fff" />
                </g>
            </svg> */}

        </section>
    );
};

export default Banner;
