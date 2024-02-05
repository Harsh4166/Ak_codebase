import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';



import AdminHeader from './src/components/header/Header'
import AdminSidebar from './src/components/sidebar/Sidebar'

import AdminRoutes from './src/routes/Routes'

const indexEmployee = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        // Clear the token from cookies or localStorage
        const cookies = new Cookies();
        cookies.remove(`tokenEmployee`);

        // Navigate to the logout or login page
        navigate(`/employeeAuth`); // Update the route as needed
    };
    return (
        <>
            <div className={`${isSidebarOpen ? 'toggle-sidebar' : ''}`}>
                <AdminHeader toggleSidebar={toggleSidebar} logout={handleLogout} />
                <AdminSidebar />
                <main id="admin-main" className="admin-main">
                    <AdminRoutes />
                </main>

            </div>
        </>
    )
}

export default indexEmployee