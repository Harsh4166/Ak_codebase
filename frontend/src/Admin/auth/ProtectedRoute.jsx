import Cookies from 'universal-cookie'
import { Navigate } from 'react-router-dom'



const ProtectedRoute = ({ children }) => {
    const cookies = new Cookies()
    const tokenAdmin = cookies.get("tokenAdmin")
    return (
        <>
            {tokenAdmin ? children : <Navigate to="/adminAuth" />}
        </>
    )
}


export default ProtectedRoute