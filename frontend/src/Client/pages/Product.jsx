import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import { useAuth } from '../auth/AuthContext'; // Update the path
import { NavLink } from 'react-router-dom';
import './css/Product.css';

const pageTitle = 'Product';

const Product = () => {
    const { decodedToken } = useAuth();

    const [productsData, setProductsData] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Fetch product data from your API
        fetch('http://localhost:3000/api/product/fetch') // Replace with your actual API endpoint
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setProductsData(data);
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });
    }, []); // Empty dependency array means this effect runs once when the component mounts

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    return (
        <>
            <Breadcrumbs currentPage={pageTitle} />

            <section id="product" className="product">
                <div className="container">
                    <div className="section-header">
                        <h2>Products</h2>
                        <p>Our valuable <span>Product </span></p>
                    </div>
                    <div className="row">
                        {productsData.map((product, index) => (
                            <div key={index} className={`col-lg-3 col-md-6 `}>
                                <div className="box">
                                    <h3>{product.productName}</h3>
                                    <img src={product.productImage.url} alt={product.productName} className="product-image" />

                                    <h4><sup><i className="bi bi-currency-rupee"></i></sup>{product.productPrice}<span> / {product.unit}</span></h4>
                                    <ul>
                                        <li>{product.productDescription}</li>
                                    </ul>
                                    <div className="btn-wrap d-flex justify-content-between">
                                        {decodedToken ? (
                                            <>
                                                <button onClick={() => addToCart(product)} className="btn-buy">
                                                    Add Cart
                                                </button>
                                                <a href="#" className="btn-buy">
                                                    Buy Now
                                                </a>
                                            </>
                                        ) : (
                                            <>
                                                <NavLink to="/clientAuth" className="btn-buy">
                                                    Buy Now
                                                </NavLink>
                                                <NavLink to="/clientAuth" className="btn-buy">
                                                    Buy Now
                                                </NavLink>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Product;
