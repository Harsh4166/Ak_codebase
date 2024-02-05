import Cookies from 'universal-cookie'
import { Navigate } from 'react-router-dom'



const ProtectedEmployeeRoute = ({ children }) => {
    const cookies = new Cookies()
    const tokenEmployee = cookies.get("tokenEmployee")
    return (
        <>
            {tokenEmployee ? children : <Navigate to="/employeeAuth" />}
        </>
    )
}


export default ProtectedEmployeeRoute