// Footer.js
import React, { useEffect } from 'react';

import './Footer.css'

const Footer = () => {

    useEffect(() => {
        const scrollTop = document.querySelector('.scroll-top');

        if (scrollTop) {
            const toggleScrollTop = () => {
                window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
            };

            window.addEventListener('load', toggleScrollTop);
            document.addEventListener('scroll', toggleScrollTop);

            scrollTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            });

            // Cleanup the event listeners on component unmount
            return () => {
                window.removeEventListener('load', toggleScrollTop);
                document.removeEventListener('scroll', toggleScrollTop);
            };
        }
    }, []);

    return (
        <>
            <footer id="footer" className="footer section-bg">
                <div className="container">
                    <div className="row gy-3">
                        {/* Address Section */}
                        <div className="col-lg-3 col-md-6 d-flex">
                            <i className="bi bi-geo-alt icon"></i>
                            <div>
                                <h4>Address</h4>
                                <p>
                                    A108 Adam Street <br />
                                    New York, NY 535022 - US<br />
                                </p>
                            </div>
                        </div>

                        {/* Reservations Section */}
                        <div className="col-lg-3 col-md-6 footer-links d-flex">
                            <i className="bi bi-telephone icon"></i>
                            <div>
                                <h4>Reservations</h4>
                                <p>
                                    <strong>Phone:</strong> +1 5589 55488 55<br />
                                    <strong>Email:</strong> info@example.com<br />
                                </p>
                            </div>
                        </div>

                        {/* Opening Hours Section */}
                        <div className="col-lg-3 col-md-6 footer-links d-flex">
                            <i className="bi bi-clock icon"></i>
                            <div>
                                <h4>Opening Hours</h4>
                                <p>
                                    <strong>Mon-Sat:</strong> 11AM - 23PM<br />
                                    Sunday: Closed
                                </p>
                            </div>
                        </div>

                        {/* Follow Us Section */}
                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4>Follow Us</h4>
                            <div className="social-links d-flex">
                                <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                                <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                                <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                                <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="copyright">
                        &copy; Copyright <strong><span>Sarpale Flower Merchant</span></strong>. All Rights Reserved
                    </div>
                    <div className="credits">
                        Designed by <a href="https://bootstrapmade.com/">Harsh Patel</a>
                    </div>
                </div>
            </footer>

            <a href="#" className="scroll-top d-flex align-items-center justify-content-center">
                <i className="bi bi-arrow-up-short"></i>
            </a>
        </>
    );
}

export default Footer;
