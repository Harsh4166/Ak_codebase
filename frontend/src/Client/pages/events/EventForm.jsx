import React, { useState } from 'react';

const EventForm = ({ eventId, eventName, eventPrice }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        // eventdata
        eventId: eventId,
        eventName: eventName,
        eventPrice: eventPrice,
        address: '',
        startDate: '',
        endDate: '',
        decorationIdea: '',
        // paymentdata
        paymentMethod: '',
        upiID: '',
        cardPaymentId: '',
        advancePayment: '',
        totalPayment: '',
        remainingPayment: '',

    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        if (name === 'paymentMethod') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                cardPaymentId: value === 'card' ? 'generatedCardPaymentId' : '',
            }));
        }

        if (name === 'upiID' && formData.paymentMethod === 'upi') {
            // Add UPI ID validation if needed
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            totalPayment: calculateTotalPayment(),
        }));
    };

    const calculateTotalPayment = () => {
        const gstAmount = 0.18 * parseFloat(formData.eventPrice);
        return (parseFloat(formData.eventPrice) + gstAmount).toFixed(2);

    };
    const calculateRemainingPayment = () => {
        const remainingPayment = calculateTotalPayment() - formData.advancePayment;
        return (parseFloat(formData.remainingPayment = remainingPayment)).toFixed(2);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send the form data to the server
        try {
            const response = await fetch('http://localhost:3000/api/events/booking/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Handle success, maybe redirect or show a success message
                console.log('Booking created successfully');
            } else {
                // Handle errors
                console.error('Failed to create booking');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const stepTitles = {
        1: 'Contact Details',
        2: 'Event Details',
        3: 'Final Data Check',
        4: 'Payment',
    };


    const renderContactDetails = () => (
        <>
            <div className="section-header">
                <h2>Contact Details</h2>
            </div>
            <div className="row">
                <div className="mb-3 col-md-6">
                    <label htmlFor="inputName" className="form-label">Your Name</label>
                    <input
                        type="text"
                        className="form-control shadow-none"
                        id="inputName"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 col-md-6">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control shadow-none"
                        id="inputEmail"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="inputPhone" className="form-label">Phone Number</label>
                <input
                    type="tel"
                    className="form-control shadow-none"
                    id="inputPhone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>
        </>
    );

    const renderEventDetails = () => (
        <>
            <div className="section-header">
                <h2>Event Details</h2>
            </div>
            <div className="mb-3">
                <div>
                    <strong className='d-flex justify-content-between '>
                        <p>Event Name: {formData.eventName}</p>
                        <p>Event Price: {formData.eventPrice}</p>
                    </strong>
                    <p>Event Address <input
                        type="text"
                        className="form-control shadow-none"
                        id="inputAddress"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    /></p>

                    <div className="row">
                        <p className='col-md-6'>Start Date <input
                            type="date"
                            className="form-control shadow-none"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                        /></p>
                        <p className='col-md-6'>End Date <input
                            type="date"
                            className="form-control shadow-none"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                        /></p>
                    </div>
                    <p>Decoration Idea
                        <textarea
                            className="form-control shadow-none"
                            name="decorationIdea"
                            rows="3"
                            value={formData.decorationIdea}
                            onChange={handleChange}
                        ></textarea>
                    </p>
                </div>
            </div>
        </>
    );

    const renderFinalDataCheck = () => (
        <>
            <div className="section-header">
                <h2>Final Data Check</h2>
            </div>
            <div className="row">
                <strong className="col-md-6">
                    <p>Name: {formData.name}</p>
                    <p>Email: {formData.email}</p>
                    <p>Phone: {formData.phone}</p>
                </strong>
                <strong className="col-md-6">
                    <p>Event Name: {formData.eventName}</p>
                    <p>Event Price: {formData.eventPrice}</p>
                    <p>Event Address: {formData.address}</p>
                    <p>Event Start Date: {formData.startDate}</p>
                    <p>Event End Date: {formData.endDate}</p>
                    <p>Event Description: {formData.decorationIdea}</p>
                </strong>
            </div>
        </>
    );

    const renderPayment = () => (
        <>
            <div className="section-header">
                <h2>Payment</h2>
            </div>

            <div className="row">
                <div className='col-md-6'>
                    Total Amount (including GST)
                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="bi bi-currency-rupee"></i></span>
                        <input
                            type="number"
                            className="form-control shadow-none"
                            name="totalPayment"
                            aria-label="Total Amount INR"
                            value={calculateTotalPayment()}
                            readOnly
                        />
                        <span className="input-group-text">.00</span>
                    </div>
                </div>
                <div className='col-md-6'>
                    Advance Payment
                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="bi bi-currency-rupee"></i></span>
                        <input
                            type="number"
                            className="form-control shadow-none"
                            aria-label="Advance Amount INR"
                            name="advancePayment"
                            value={formData.advancePayment}
                            onChange={handleChange}
                        />
                        <span className="input-group-text">.00</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className='col-md-6'>
                    Total Payable Amount (including GST)
                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="bi bi-currency-rupee"></i></span>
                        <input
                            type="number"
                            className="form-control shadow-none"
                            name="totalPayablePayment"
                            aria-label="Total Payable Amount INR"
                            value={formData.advancePayment || calculateTotalPayment()}
                            readOnly
                        />
                        <span className="input-group-text">.00</span>
                    </div>
                </div>

                <div className='col-md-6'>
                    Remaining Payment
                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="bi bi-currency-rupee"></i></span>
                        <input
                            type="number"
                            className="form-control shadow-none"
                            aria-label="Remaining Amount INR"
                            name="remainingPayment"
                            value={calculateRemainingPayment()}
                            onChange={handleChange}
                        />
                        <span className="input-group-text">.00</span>
                    </div>
                </div>
            </div>

            {/* card and upi */}
            <div>
                <div className="mb-3 d-flex justify-content-around">
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input shadow-none"
                            id="upiPayment"
                            name="paymentMethod"
                            value="upi"
                            checked={formData.paymentMethod === 'upi'}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="upiPayment">
                            UPI Payment
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input shadow-none"
                            id="cardPayment"
                            name="paymentMethod"
                            value="card"
                            checked={formData.paymentMethod === 'card'}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="cardPayment">
                            Credit/Debit Card Payment
                        </label>
                    </div>
                </div>

                {formData.paymentMethod === 'upi' && (
                    <div className="mb-3">
                        <label htmlFor="UpiID" className="form-label">UPI ID</label>
                        <input
                            type="text"
                            className="form-control shadow-none"
                            id="UpiID"
                            name="upiID"
                            placeholder='Your UPI ID'
                            value={formData.upiID}
                            onChange={handleChange}
                        />
                    </div>
                )}
                {formData.paymentMethod === 'card' && (
                    <div>
                        <div className="mb-3">
                            <label htmlFor="cardNumber" className="form-label">Card Number</label>
                            <input
                                type="text"
                                className="form-control shadow-none"
                                id="cardNumber"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                                <input
                                    type="text"
                                    className="form-control shadow-none"
                                    id="expiryDate"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label htmlFor="cvv" className="form-label">CVV</label>
                                <input
                                    type="text"
                                    className="form-control shadow-none"
                                    id="cvv"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );


    return (
        <>
            <form className="booking-form" onSubmit={handleSubmit}>
                <div className="form-header d-flex mb-4 text-center">
                    {[1, 2, 3, 4].map((stepNumber) => (
                        <span
                            key={stepNumber}
                            className={`stepIndicator ${step >= stepNumber ? 'active' : ''}`}
                            style={{ width: step >= stepNumber ? '25%' : '0%' }}
                        >
                            {stepTitles[stepNumber]}
                        </span>
                    ))}
                </div>

                {step === 1 && renderContactDetails()}
                {step === 2 && renderEventDetails()}
                {step === 3 && renderFinalDataCheck()}
                {step === 4 && renderPayment()}

                <div className="col-md-12 d-flex justify-content-between">
                    {step > 1 && (
                        <button type="button" className="btn btn-back" onClick={() => setStep(step - 1)}>
                            Back
                        </button>
                    )}
                    {step < 4 ? (
                        <button type="button" className="btn btn-next" onClick={() => setStep(step + 1)}>
                            Next
                        </button>
                    ) : (
                        <button type="button" className="btn btn-pay" onClick={handleSubmit}>
                            Pay Now
                        </button>
                    )}
                </div>
            </form>
        </>
    );
};

export default EventForm;
