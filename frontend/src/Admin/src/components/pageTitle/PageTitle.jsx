import React from 'react';

import '../../pages/css/Dashbord.css'

import './PageTitle.css'
const AdminPageTitle = ({ CurrentPage, showButton, buttonId, buttonName }) => {
    return (
        <div className="admin-pagetitle d-flex justify-content-between align-items-center"> {/* Updated class name */}
            <div>
                <h1>{CurrentPage}</h1>
                <nav>
                    <ol className="breadcrumb admin-breadcrumb"> {/* Updated class name */}
                        <li className="breadcrumb-item admin-breadcrumb-item"><a href="">Home</a></li> {/* Updated class name */}
                        <li className="breadcrumb-item admin-breadcrumb-item active">{CurrentPage}</li> {/* Updated class name */}
                    </ol>

                </nav>
            </div>
            {showButton && (
                <div>
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target={buttonId}>
                        <i className="bi bi-plus"></i> {buttonName}
                    </button>
                </div>
            )}

        </div>
    );
};

export default AdminPageTitle;
