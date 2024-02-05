import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink from React Router

import './sidebar.css';

const AdminSidebar = () => {
    const navItems = [
        { icon: 'bi bi-grid', text: 'Dashboard', link: '/admin/' },
        { icon: 'bi bi-cassette', text: 'Banner', link: '/admin/banner' },
        { icon: 'bi bi-journal-text', text: 'Products', link: '/admin/product' },
        { icon: 'bi bi-images', text: 'Gallery', link: '/admin/gallery' },
        // events
        {
            icon: 'bi bi-calendar-event',
            text: 'Events',
            subItems: [
                { icon: 'bi bi-circle', text: 'Events', link: '/admin/events' },
                { icon: 'bi bi-circle', text: 'Events Booking', link: '/admin/events-booking' },
                // Add more sub-items as needed
            ],
        },
        // { icon: 'bi bi-calendar-event', text: 'Events', link: '/admin/events' },
        // drop down menu 
        // order
        {
            icon: 'bi bi-menu-button-wide',
            text: 'Orders',
            subItems: [
                { icon: 'bi bi-circle', text: 'Orders', link: '/admin/orders' },
                { icon: 'bi bi-circle', text: 'Order Complited', link: '/admin/orders-complited' },
                // Add more sub-items as needed
            ],
        },

    ];

    return (
        <aside id="sidebar" className="admin-sidebar">
            <ul className="admin-sidebar-nav" id="admin-sidebar-nav">
                {navItems.map((item, index) => (
                    <li key={index} className="admin-nav-item">
                        {item.subItems ? (
                            <NavLink
                                to={item.link}
                                className="admin-nav-link collapsed"
                                data-bs-target={`#${item.text.toLowerCase()}-nav`}
                                data-bs-toggle="collapse"
                            >
                                <i className={item.icon}></i>
                                <span>{item.text}</span>
                                {item.subItems && <i className="bi bi-chevron-down ms-auto"></i>}
                            </NavLink>
                        ) : (
                            <NavLink to={item.link} className="admin-nav-link ">
                                <i className={item.icon}></i>
                                <span>{item.text}</span>
                            </NavLink>
                        )}

                        {item.subItems && (
                            <ul
                                id={`${item.text.toLowerCase()}-nav`}
                                className="admin-nav-content collapse"
                                data-bs-parent="#admin-sidebar-nav"
                            >
                                {item.subItems.map((subItem, subIndex) => (
                                    <li key={subIndex}>
                                        <NavLink to={subItem.link}>
                                            <i className={subItem.icon}></i>
                                            <span>{subItem.text}</span>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default AdminSidebar;
