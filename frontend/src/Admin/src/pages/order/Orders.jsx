import React from 'react'
import AdminPageTitle from '../../components/pageTitle/PageTitle'
import { NavLink } from 'react-router-dom'

const Orders = () => {
    return (
        <>
            <AdminPageTitle CurrentPage={'Orders'} showButton={false} />
            <div className="card top-selling overflow-auto">
                <div className="card-body pb-0">
                    <h5 className="card-title">Orders <span>| Data</span></h5>
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope='col'>Order no</th>
                                <th scope='col'>Order name</th>
                                <th scope="col">Action</th>
                                {/* Add more table headers as needed */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>120</td>
                                <td>rose</td>
                                <td className='fw-bold'>
                                    <span className='p-2'>
                                        <NavLink className='btn btn-success' to={'/admin/orders_details'}> <i className="bi bi-eye"></i></NavLink>
                                    </span>
                                    <span className='p-2'>
                                        <button className='btn btn-success'> <i className="bi bi-pen"></i></button>
                                    </span>
                                    <span className='p-2'>
                                        <button className='btn btn-danger'>
                                            <i className="bi bi-trash2"></i>
                                        </button>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Orders