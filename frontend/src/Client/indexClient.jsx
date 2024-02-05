import React, { useState } from 'react'
import Header from './components/header/Header'
import ClientRoutes from './routes/Routes'
import Footer from './components/footer/Footer'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

const indexClient = () => {
    const navigate = useNavigate();

    const [isOpen, setisOpen] = useState(false);

    const toggleMobileNav = () => {
        setisOpen(!isOpen);
    };

    const handleLogout = () => {
        // Clear the token from cookies or localStorage
        const cookies = new Cookies();
        cookies.remove(`tokenClient`);

        // Navigate to the logout or login page
        navigate(`/clientAuth`); // Update the route as needed
    };
    return (
        <div className={`mobile-nav ${isOpen ? 'mobile-nav-active' : ''}`}>
            <Header isOpen={isOpen} toggleButton={toggleMobileNav} />
            <main>
                <ClientRoutes />
            </main>
            <Footer />
        </div>
    )
}

export default indexClient