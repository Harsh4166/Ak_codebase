// FeedBack.js

import React, { useState, useEffect } from 'react';

import './FeedBack.css'

const FeedBack = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    const handlePrevSlide = () => {
        setActiveSlide((prevSlide) => (prevSlide - 1 + testimonials.length) % testimonials.length);
    };

    const handleNextSlide = () => {
        setActiveSlide((prevSlide) => (prevSlide + 1) % testimonials.length);
    };

    useEffect(() => {
        // Auto-change slide every 5000ms (5 seconds)
        const interval = setInterval(() => {
            handleNextSlide();
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []); // Empty dependency array to run the effect once on mount

    const testimonials = [
        {
            quote: "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.",
            author: "Saul Goodman",
            role: "Ceo & Founder",
            image: "./logo/Logo.png"
        },
        {
            quote: "Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.",
            author: "Sara Wilsson",
            role: "Designer",
            image: "./logo/Logo.png"
        },
        // Add more testimonials as needed
    ];
    return (
        <section id="testimonials" className="testimonials ">
            <div className="container" data-aos="fade-up">
                <div className="section-header">
                    <h2>Feedback</h2>
                    <p>What the people <span>Saying About Us</span></p>
                </div>

                <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel" data-aos="fade-up" data-aos-delay="100">
                    <div className="carousel-inner">

                        {testimonials.map((testimonial, index) => (
                            <div key={index} className={`carousel-item ${index === activeSlide ? 'active' : ''}`}>
                                <div className="testimonial-item">
                                    <div className="row gy-4 justify-content-center">
                                        <div className="col-lg-6">
                                            <div className="testimonial-content">
                                                <p>
                                                    <i className="bi bi-quote quote-icon-left"></i>
                                                    {testimonial.quote}
                                                    <i className="bi bi-quote quote-icon-right"></i>
                                                </p>
                                                <h3>{testimonial.author}</h3>
                                                <h4>{testimonial.role}</h4>
                                            </div>
                                        </div>
                                        <div className="col-lg-2 text-center">
                                            <img src={testimonial.image} className="img-fluid testimonial-img" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="prev" onClick={handlePrevSlide}>
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="next" onClick={handleNextSlide}>
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeedBack;
