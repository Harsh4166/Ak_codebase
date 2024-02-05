import React from 'react';

const InfoCard = ({ title, filterOptions, value, increasePercentage, period }) => {
    return (
        <div className="col-xxl-4 col-md-6">
            <div className="card info-card">
                <div className="card-body">
                    <h5 className="card-title">
                        {title} <span>| {period}</span>
                    </h5>
                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            {/* Assuming you have specific icons for each card type */}
                            {title === 'Sales' && <i className="bi bi-cart"></i>}
                            {title === 'Revenue' && <i className="bi bi-currency-dollar"></i>}
                            {title === 'Customers' && <i className="bi bi-people"></i>}
                        </div>
                        <div className="ps-3">
                            <h6>{value}</h6>
                            <span className="text-success small pt-1 fw-bold">{increasePercentage}</span>{' '}
                            <span className="text-muted small pt-2 ps-1">increase</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;
