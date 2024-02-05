// Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext'; // Update the path

// add css
import './Navbar.css';

const Navbar = ({ navItems, isOpen, toggleButton }) => {
    const { user } = useAuth();


    return (
        <nav id="navbar" className="navbar">
            <ul>
                {navItems.map((item, index) => (
                    <li key={index}>
                        <NavLink
                            to={item.path}
                            className="nav-link"
                            onClick={isOpen ? toggleButton : null}
                        >
                            {item.label}
                        </NavLink>
                    </li>
                ))}
                {user ? ( // Check if the user is logged in
                    <li>
                        <NavLink
                            to={'/cart'}
                            className={'nav-link'}
                            onClick={isOpen ? toggleButton : null}
                        >
                            <i className="bi bi-cart" style={{ fontSize: '20px' }}></i>
                        </NavLink>
                    </li>
                ) : null}
            </ul>
        </nav>
    );
};

export default Navbar;
