import React from 'react'
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs'

const Cart = () => {
    return (
        <>
            <Breadcrumbs currentPage={'Cart'} />

            <section id="event" className="event">
                <div className="container">
                    <div className="section-header">
                        <h2>Cart</h2>
                        <p>Your Product to<span> Purchas </span></p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart