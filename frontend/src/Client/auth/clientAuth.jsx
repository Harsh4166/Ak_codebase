import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// auth css
import './Auth.css'

const clientAuth = () => {
    const navigate = useNavigate();
    const { login } = useAuth();


    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });


            const data = await response.json();


            if (response.ok) {
                console.log('Login successful', data.token);

                login({ token: data.token, user: data.user });
                navigate('/');

            } else {
                console.error('Login failed', data.error);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div className='auth'>
            <main className="container min-vh-100 d-flex align-items-center justify-content-center overflow-hidden">
                <div className="row w-100 align-items-center p-4 justifu-content-between">
                    <div className="col-md-12 col-lg-6 text-left">
                        <div className="auth-container">
                            <div className="back-link position-absolute top-0 pt-5 d-flex align-items-center" >
                                <NavLink to={`/`} className="text-decoration-none ms-2 text-sm text-gray-600">
                                    <i className="bi bi-chevron-left"></i> Back to Home</NavLink>
                            </div>
                            <div className="form-container">
                                <h3 className="mb-3 text-4xl font-bold text-navy-700 text-capitalize">User Login</h3>
                                <p className="mb-4 text-base text-gray-600">Enter your username and password to sign in!</p>
                                <hr className="mb-4" />
                                <form onSubmit={handleLogin}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label text-navy-700">Username*</label>
                                        <input
                                            type="text"
                                            id="username"
                                            name='username'
                                            className="form-control"
                                            placeholder="Enter Username"
                                            style={{ marginBottom: '12px', padding: '10px', borderRadius: '10px' }}
                                            value={formData.username}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label text-navy-700">Password*</label>
                                        <input
                                            type="password"
                                            id="password"
                                            name='password'
                                            className="form-control"
                                            placeholder="Enter Password"
                                            style={{ marginBottom: '12px', padding: '10px', borderRadius: '10px' }}
                                            value={formData.password}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-pay w-100">Sign In</button>
                                </form>
                                <p className="mt-3">Don't have an account ?<NavLink to="/clientRegs"> Register here</NavLink></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-0 col-lg-6 vector-image d-md-none d-lg-block text-center">
                        {/* Vector image will be hidden on medium and smaller screens */}
                        <img
                            src="./logo/Logo.png"
                            alt="Vector Image"
                            className="w-100 h-auto"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default clientAuth;
