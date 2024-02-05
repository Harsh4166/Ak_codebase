import React, { createContext, useContext, useState, useEffect } from 'react';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken library
import { useAuth } from './AuthContext';

const UserDataContext = createContext();

export const useUserData = () => {
    return useContext(UserDataContext);
};

export const UserDataProvider = ({ children }) => {
    const { token } = useAuth(); // Use the token from the AuthContext
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Replace 'YOUR_SECRET_KEY' with the actual secret key used to sign your JWT
                const decodedToken = jwt.verify(token, process.env.REACT_APP_SECRET_KEY);

                const response = await fetch(`http://localhost:3000/api/user/fetch/${decodedToken.userId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const userData = await response.json();
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (token) {
            fetchUserData();
        }
    }, [token]);

    return (
        <UserDataContext.Provider value={userData}>
            {children}
        </UserDataContext.Provider>
    );
};
