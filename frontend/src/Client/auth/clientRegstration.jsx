import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';

const clientRegstration = () => {

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: {
            street: '',
            city: '',
            state: '',
            pinCode: '',
            country: '',
        },
        username: '',
        password: '',
        confirm_password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update the state based on the input name
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
            address: {
                ...prevFormData.address,
                [name]: value,
            },
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send the form data to the server
        try {
            const response = await fetch('http://localhost:3000/api/user/sign_up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Handle success, maybe redirect or show a success message
                console.log('SignUp successfully');
            } else {
                // Handle errors
                console.error('Failed to Signup');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const stepTitles = {
        1: 'Contact Details',
        2: 'Address Details',
        3: 'Account Details',

    };

    const contactInfo = () => (
        <>
            {/* contact information */}
            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="first_name" className="form-label">First Name:</label>
                    <input type="text" className="form-control" id="first_name" name="first_name" onChange={handleInputChange} value={formData.first_name} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="last_name" className="form-label">Last Name:</label>
                    <input type="text" className="form-control" id="last_name" name="last_name" onChange={handleInputChange} value={formData.last_name} required />
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address:</label>
                <input type="email" className="form-control" id="email" name="email" onChange={handleInputChange} value={formData.email} required />
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number:</label>
                <input type="tel" className="form-control" id="phone" name="phone" onChange={handleInputChange} value={formData.phone} />
            </div>


        </>
    )


    const accountInfo = () => (
        <>
            {/* Account Information */}
            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input type="text" className="form-control" id="username" name="username" onChange={handleInputChange} value={formData.username} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handleInputChange} value={formData.password} required />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="confirm_password" className="form-label">Confirm Password:</label>
                <input type="password" className="form-control" id="confirm_password" name="confirm_password" onChange={handleInputChange} value={formData.confirm_password} required />
            </div>

        </>
    )

    const addressInfo = () => (
        <>
            <div className="mb-3">
                <label htmlFor="street" className="form-label">Street Address:</label>
                <input type="text" className="form-control" id="street" name="street" onChange={handleInputChange} value={formData.address.street} required />
            </div>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="state" className="form-label">State:</label>
                    <input type="text" className="form-control" id="state" name="state" onChange={handleInputChange} value={formData.address.state} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="city" className="form-label">City:</label>
                    <input type="text" className="form-control" id="city" name="city" onChange={handleInputChange} value={formData.address.city} required />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="pinCode" className="form-label">pinCode Code:</label>
                    <input type="text" className="form-control" id="pinCode" name="pinCode" onChange={handleInputChange} value={formData.address.pinCode} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="country" className="form-label">Country:</label>
                    <input type="text" className="form-control" id="country" name="country" onChange={handleInputChange} value={formData.address.country} required />
                </div>
            </div>
        </>
    )


    return (
        <>
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
                                    <h3 className="mb-3 text-4xl font-bold text-navy-700 text-capitalize">{'user Registration'}</h3>
                                    {/* <p className="mb-4 text-base text-gray-600">Enter your username and password to sign in!</p> */}
                                    <hr className="mb-4" />
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-header d-flex mb-4 text-center">
                                            {[1, 2, 3].map((stepNumber) => (
                                                <span
                                                    key={stepNumber}
                                                    className={`stepIndicator ${step >= stepNumber ? 'active' : ''}`}
                                                    style={{ width: step >= stepNumber ? '25%' : '0%' }}
                                                >
                                                    {stepTitles[stepNumber]}
                                                </span>
                                            ))}
                                        </div>


                                        {step === 1 && contactInfo()}
                                        {step === 2 && addressInfo()}
                                        {step === 3 && accountInfo()}

                                        <div className="d-flex justify-content-between">
                                            {step > 1 && (
                                                <button type="button" className="btn btn-back" onClick={() => setStep(step - 1)}>
                                                    Back
                                                </button>
                                            )}
                                            {step < 3 && (
                                                <button type="button" className="btn btn-next" onClick={() => setStep(step + 1)}>
                                                    Next
                                                </button>
                                            )}
                                            {step === 3 && (
                                                <button type="submit" className="btn btn-pay">
                                                    Sign Up
                                                </button>
                                            )}
                                        </div>
                                    </form>
                                    <p className='mt-4'>
                                        Already have an account? <NavLink to={`/clientAuth`} >Login </NavLink>
                                    </p>


                                </div>
                            </div>
                        </div>
                        <div className="col-md-0 col-lg-6 vector-image d-md-none d-lg-block   text-center">
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

        </>
    )
}

export default clientRegstration