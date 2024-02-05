import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { useAuth } from '../auth/AuthContext'; // Update the path



// page import
import Home from '../pages/Home'
import About from '../pages/About'
import Gallery from '../pages/Gallery'
import Product from '../pages/Product'
import Events from '../pages/events/Events'
import Contact from '../pages/Contact'
import EventsBooking from '../pages/events/EventsBooking'
import Cart from '../pages/Cart'
import Profile from '../pages/Profile/Profile';


const ClientRoutes = () => {

    const { decodedToken } = useAuth();
    return (
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/about" exact element={<About />} />
            <Route path="/events" exact element={<Events />} />
            <Route path="/products" exact element={<Product />} />
            <Route path="/gallery" exact element={<Gallery />} />
            <Route path="/contact" exact element={<Contact />} />
            {/* without login no route */}
            {decodedToken ? (
                <>
                    <Route path="/profile" exact element={<Profile />} />
                    <Route path="/events/event-booking/:eventId" exact element={<EventsBooking />} />
                    <Route path='/cart' exact element={<Cart />} />
                </>
            ) : (
                <Route path="/clientAuth" exact element={<clientAut />} />
            )
            }

        </Routes>

    )
}

export default ClientRoutes