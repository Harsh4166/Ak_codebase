// AuthContext.js
import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                token: null,
            };
        default:
            return state;
    }
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null, token: null });
    const [decodedToken, setDecodedToken] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = JSON.parse(localStorage.getItem('authUser'));

        if (storedToken) {
            dispatch({
                type: 'LOGIN',
                payload: {
                    user: storedUser,
                    token: storedToken,
                },
            });

            // Decode the token and update the state
            const decoded = jwtDecode(storedToken);
            setDecodedToken(decoded);

            // Fetch user data based on the decoded token
            const fetchUserData = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/api/user/fetch/${decoded.userId}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const fetchedUserData = await response.json();
                    setUserData(fetchedUserData);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };

            fetchUserData();
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem('authToken', userData.token);
        localStorage.setItem('authUser', JSON.stringify(userData.user));

        dispatch({
            type: 'LOGIN',
            payload: {
                user: userData.user,
                token: userData.token,
            },
        });

        // Decode the token and update the state
        const decoded = jwtDecode(userData.token);
        setDecodedToken(decoded);

        // Fetch user data based on the decoded token
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/user/fetch/${decoded.userId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const fetchedUserData = await response.json();
                setUserData(fetchedUserData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');

        dispatch({ type: 'LOGOUT' });

        // Clear the decoded token and user data
        setDecodedToken(null);
        setUserData(null);
    };

    return (
        <AuthContext.Provider value={{ user: state.user, token: state.token, login, logout, decodedToken, userData }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };
