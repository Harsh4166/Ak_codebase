import React from 'react';

import './Header.css'
import { NavLink } from 'react-router-dom';

const AdminHeader = ({ toggleSidebar, logout }) => {

    return (
        <header id="admin-header" className="admin-header fixed-top d-flex align-items-center">

            <div className="d-flex align-items-center justify-content-between">
                <a href="index.html" className="admin-logo d-flex align-items-center">
                    <img src="assets/img/logo.png" alt="" />
                    <span className="d-none d-lg-block">NiceAdmin</span>
                </a>
                <i className="bi bi-list admin-toggle-sidebar-btn" onClick={toggleSidebar}></i>
            </div>

            <div className="admin-search-bar">
                <form className="admin-search-form d-flex align-items-center" method="POST" action="#">
                    <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
                    <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                </form>
            </div>

            <nav className="admin-header-nav ms-auto">
                <ul className="d-flex align-items-center">
                    <li className="nav-item d-block d-lg-none">
                        <a className="nav-link admin-icon admin-search-bar-toggle" href="#">
                            <i className="bi bi-search"></i>
                        </a>
                    </li>


                    <li className="nav-item dropdown pe-3">
                        <NavLink className="nav-link admin-profile d-flex align-items-center pe-0" onClick={logout}>
                            <i className="bi bi-box-arrow-right"></i>
                        </NavLink>
                    </li>

                </ul>
            </nav>
        </header>
    );
};

export default AdminHeader;
