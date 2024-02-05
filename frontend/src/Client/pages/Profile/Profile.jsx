import React, { useState, useEffect } from 'react'
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs'
import { useAuth } from '../../auth/AuthContext'; // Update the path

import './Profile.css'

const Profile = () => {
    const { userData, decodedToken } = useAuth();
    const [udserData, setUserData] = useState(null);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:3000/api/user/fetch/${decodedToken.userId}`);
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! Status: ${response.status}`);
    //             }
    //             const userData = await response.json();
    //             setUserData(userData);
    //         } catch (error) {
    //             console.error('Error fetching user data:', error);
    //         }
    //     };

    //     fetchUserData();
    // }, [decodedToken.userId]);
    return (
        <>
            <Breadcrumbs currentPage={'Profile'} />

            <section className="section profile">
                <div className="container">
                    <div className="card ">
                        <div className="card-body pt-3">
                            <div className="row">
                                <div className="col-xl-4">
                                    {userData ? (
                                        <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                                            <img src="./logo/Logo.png" alt="Profile" className="rounded-circle" />
                                            <h2>{(userData.first_name + ' ' + userData.last_name)}</h2>
                                            <h3>{userData.username}</h3>
                                        </div>
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                </div>
                                <div className="col-xl-8">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                                        </li>
                                        <li className="nav-item">
                                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                                        </li>
                                        <li className="nav-item">
                                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content pt-2">
                                        <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                            {userData ? (
                                                <div>
                                                    <h5 className="card-title">Profile Details</h5>
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-4 label">User Name</div>
                                                        <div className="col-lg-9 col-md-8">{userData.username}</div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-4 label">Full Name</div>
                                                        <div className="col-lg-9 col-md-8">{userData.first_name + ' ' + userData.last_name}</div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-4 label">Email</div>
                                                        <div className="col-lg-9 col-md-8">{userData.email}</div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-4 label">Phone</div>
                                                        <div className="col-lg-9 col-md-8">{userData.phone}</div>
                                                    </div>
                                                    <div className="row">
                                                        {userData.address && userData.address.length > 0 && (
                                                            <>
                                                                <div className="row">
                                                                    <div className="col-lg-3 col-md-4 label">Address</div>
                                                                    <div className="col-lg-9 col-md-8">
                                                                        {userData.address.map((address, index) => (
                                                                            <div key={index}>
                                                                                <p>Street: {address.street}</p>
                                                                                <p>Country: {address.country}</p>
                                                                                <p>State: {address.state}</p>
                                                                                <p>City: {address.city}</p>
                                                                                <p>Pincode: {address.pinCode}</p>
                                                                                {/* Add more address fields as needed */}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}                                                    </div>
                                                    {/* Add more profile details */}
                                                </div>
                                            ) : (
                                                <p>Loading...</p>
                                            )}
                                        </div>

                                        <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                                            <form>
                                                <div className="row mb-3">
                                                    <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <img src="assets/img/profile-img.jpg" alt="Profile" />
                                                        <div className="pt-2">
                                                            <a href="#" className="btn btn-primary btn-sm" title="Upload new profile image"><i className="bi bi-upload"></i></a>
                                                            <a href="#" className="btn btn-danger btn-sm" title="Remove my profile image"><i className="bi bi-trash"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Add more form fields */}
                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                                </div>
                                            </form>
                                        </div>

                                        <div className="tab-pane fade pt-3" id="profile-change-password">
                                            <form>
                                                <div className="row mb-3">
                                                    <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="password" type="password" className="form-control" id="currentPassword" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">New Password</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="password" type="password" className="form-control" id="newPassword" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="conformePassword" className="col-md-4 col-lg-3 col-form-label">Conforme Password</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="password" type="password" className="form-control" id="conformePassword" />
                                                    </div>
                                                </div>
                                                {/* Add more password change form fields */}
                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary">Change Password</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Profile