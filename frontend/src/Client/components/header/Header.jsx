// Header.jsx
import React, { useState } from 'react';
// header css
import './Header.css'
import './Profile.css'

import { Link, NavLink, useNavigate } from 'react-router-dom';
import Navbar from '../navBar/NavBar';
import { useAuth } from '../../auth/AuthContext'; // Update the path



const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Events', path: '/events' },
    { label: 'Products', path: '/products' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
];


const Header = ({ isOpen, toggleButton }) => {
    const { token, decodedToken, userData, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to the home page after logout
    };

    return (
        <>
            <header id="header" className="header fixed-top d-flex align-items-center section-bg">
                <div className="container d-flex align-items-center justify-content-between">

                    <NavLink href="/" className="logo d-flex align-items-center me-auto me-lg-0">
                        {/* Uncomment the line below if you also wish to use an image logo */}
                        <img src="./logo/Logo.png" alt="" />
                        {/* <h1>Yummy<span>.</span></h1> */}
                    </NavLink>

                    <Navbar navItems={navigationItems} isOpen={isOpen} toggleButton={toggleButton} />

                    <div>
                        {token ? (
                            <li className="nav-link dropdown">
                                <Link className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                                    <img src="./logo/Logo.png" alt="Profile" className="rounded-circle" />
                                    <span className="d-none d-md-block dropdown-toggle ps-2">{userData ? ((userData.first_name) + " " + (userData.last_name)) : ('')}</span>
                                </Link>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                    <li className="dropdown-header">
                                        {
                                            userData && (
                                                <>
                                                    <h6>{(userData.first_name + ' ' + userData.last_name)}</h6>
                                                    <span>{userData.username}</span>
                                                </>)
                                        }
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <Link className="dropdown-item d-flex align-items-center" to="/profile">
                                            <i className="bi bi-person"></i>
                                            <span>My Profile</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <Link className="dropdown-item d-flex align-items-center" href="#" onClick={logout}>
                                            <i className="bi bi-box-arrow-right"></i>
                                            <span>Sign Out</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <>
                                <NavLink className="btn-login-signup" to="/clientAuth">
                                    Login
                                </NavLink>
                                <NavLink className="btn-login-signup" to="/clientRegs">
                                    Sign up
                                </NavLink>
                            </>
                        )}
                    </div>
                    {isOpen ? (
                        <i className={`mobile-nav-toggle ${isOpen ? "mobile-nav-show" : "mobile-nav-hide d-none"} bi bi-x`} onClick={toggleButton}></i>
                    ) : (
                        <i className="mobile-nav-toggle mobile-nav-show bi bi-list" onClick={toggleButton}></i>

                    )}
                </div>
            </header>
        </>
    );
};

export default Header;
