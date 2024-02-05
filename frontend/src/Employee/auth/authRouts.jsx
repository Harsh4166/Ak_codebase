import Cookies from 'universal-cookie'
import { Navigate } from 'react-router-dom'

const AuthEmployeeRoute = ({ children }) => {
    const cookies = new Cookies()
    const tokenEmployee = cookies.get("tokenEmployee")

    console.log("Token in AuthRoute:", tokenEmployee);

    return (
        <>
            {tokenEmployee ? <Navigate to="/employee" /> : children}
        </>
    );
}

export default AuthEmployeeRoute