import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashBoard from '../pages/DashBoard'
import Events from '../pages/Events'
import Contact from '../pages/Contact'
import Banners from '../pages/Banners'
import Products from '../pages/Products'
import Gallery from '../pages/Gallery'
import Feedback from '../pages/Feedback'
import Orders from '../pages/order/Orders'
import OrderDetails from '../pages/order/OrderDetails'


const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" exact element={<DashBoard />} />
            <Route path="/banner" exact element={<Banners />} />
            <Route path="/product" exact element={<Products />} />
            <Route path="/gallery" exact element={<Gallery />} />
            {/* events routes */}
            <Route path="/events" exact element={<Events />} />
            <Route path="/events-booking" exact element={<Events />} />



            <Route path="/feedback" exact element={<Feedback />} />
            <Route path="/contact" exact element={<Contact />} />

            {/* oredr routes */}
            <Route path="/orders" exact element={<Orders />} />
            <Route path="/orders_details" exact element={<OrderDetails />} />

        </Routes>

    )
}

export default AdminRoutes