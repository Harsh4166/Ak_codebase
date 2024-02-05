// About.jsx
import React from 'react';

import './About.css'

const About = () => {
    return (
        <section id="about" className="about">
            <div className="container" data-aos="fade-up">
                <div className="section-header">
                    <h2>About Us</h2>
                    <p>About <span>Sarpale Flower Merchant</span></p>
                </div>
                <div className="row gy-4 ">
                    <div className="col-lg-7 position-relative about-img" style={{ backgroundImage: 'url(./about/Aboutus.png)' }} data-aos="fade-up" data-aos-delay="150">
                    </div>
                    <div className="col-lg-5 d-flex align-items-center" data-aos="fade-up" data-aos-delay="300">
                        <div className="content ps-0 ps-lg-5">
                            <p className="fst-italic">
                                Established in the year 1962, Sarpale Flower Merchant in Guruwar Peth,Pune is an acknowledged flower decorators.This brand of florists specialises in designing exquisite flower arrangements that are made up of exotic,beautiful and fresh flowers. On board its item,is a group of floral design experts and artists ,who are masters in the art of flower arrangements and customised bouquets.Each arrangements is an arresting display created using a combination of fresh and exotic flowers.This florists in Guruwar Peth has been delighting citizens to a beautiful display of flowers and designs.Find this shop with ease at Survey No.551, Shop No.1/2,Kasturi Chowk Near Jain Mandir. Undoubtedly it is one of the best florists in Guruwar Peth,Pune.                            </p>
                            <ul>
                                <li><strong><i className="bi bi-user"></i> Services Offered At The Sarpale Flower Merchant</strong>
                                </li>
                            </ul>
                            <p>
                                Sarpale Flower Merchant in Guruwar Peth in Pune offers is customers a wide range of services. The beautiful flowers are hand-delivered by their uniformed representatives,it is also into floral decor of offices, home decor for various festive occasions like ganpati,diwali,makar-sankrant and many other festivals,wedding decor, floral decor for corporate events and other such event related to decor activities.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
