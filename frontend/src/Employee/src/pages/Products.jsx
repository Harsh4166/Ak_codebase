import React, { useState, useEffect } from 'react'
import AdminPageTitle from '../components/pageTitle/PageTitle'
import Modal from '../components/modal/Modal';

const Products = () => {
    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        // Fetch product data from your API
        fetch('http://localhost:3000/api/product/fetch') // Replace with your actual API endpoint
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setProductsData(data);
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });
    }, []); // Empty dependency array means this effect runs once when the component mounts

    const handleDelete = async (productId) => {
        try {
            // Send a request to delete the product on the backend
            const response = await fetch(`http://localhost:3000/api/product/delete/${productId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Update the state to reflect the deletion
            setProductsData((prevData) => prevData.filter((product) => product._id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const formFields = [
        { name: 'productName', type: 'text', label: 'Product Name' },
        { name: 'productPrice', type: 'text', label: 'Product price' },
        { name: 'productDescription', type: 'text', label: 'Product Description' },
        { name: 'unit', type: 'text', label: 'unit of mager' },
        { name: 'file', type: 'file', label: 'Select Product Image' },
        // Add more fields as needed
    ];
    return (
        <>
            <AdminPageTitle CurrentPage={"Products"} showButton={true} buttonName={'New Product'} buttonId={'#product'} />
            {/* Customers Card */}
            <div className="card top-selling overflow-auto">
                <div className="card-body pb-0">
                    <h5 className="card-title">Product <span>| Data</span></h5>
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Preview</th>
                                <th scope="col">Product</th>
                                <th scope="col">Price</th>
                                <th scope="col">unit</th>
                                <th scope="col">Description</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsData.map((item) => (
                                <tr key={item._id}>
                                    <th scope="row">
                                        <img className='border rounded-2' src={item.productImage.url} alt="" />
                                    </th>
                                    <td className='fw-bold'>{item.productName}</td>
                                    <td className='fw-bold'>{item.productPrice}</td>
                                    <td className="fw-bold">{item.unit}</td>
                                    <td className="fw-bold">{item.productDescription}</td>
                                    <td className='fw-bold'>
                                        <span className='p-2'>
                                            <button className='btn btn-success'> <i className="bi bi-pen"></i></button>
                                        </span>
                                        <span className='p-2'>
                                            <button className='btn btn-danger' onClick={() => handleDelete(item._id)}>
                                                <i className="bi bi-trash2"></i>
                                            </button>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal modalId={'product'} modalTitel={'New product'} formFields={formFields} />
        </>
    )
}

export default Products