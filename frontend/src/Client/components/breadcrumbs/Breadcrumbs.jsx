// Breadcrumbs.js
import React from 'react';

import './Breadcrumbs.css'
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ previousPage, currentPage }) => {

    return (
        <section className="breadcrumbs">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <h2>{currentPage}</h2>
                    <ol>
                        <li><Link to="/">Home</Link></li>
                        {previousPage && <li><Link to={`/${previousPage.toLowerCase()}`}>{previousPage}</Link></li>}
                        <li>{currentPage}</li>
                    </ol>

                </div>

            </div>
        </section>
    );
};

export default Breadcrumbs;
