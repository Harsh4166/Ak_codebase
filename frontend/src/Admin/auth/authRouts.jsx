import Cookies from 'universal-cookie'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({ children }) => {
    const cookies = new Cookies()
    const tokenAdmin = cookies.get("tokenAdmin")

    console.log("Token in AuthRoute:", tokenAdmin);

    return (
        <>
            {tokenAdmin ? <Navigate to="/admin" /> : children}
        </>
    );
}

export default AuthRoute