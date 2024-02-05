import React from 'react'
import AdminPageTitle from '../components/pageTitle/PageTitle'

import InfoCard from '../components/card/InfoCard';
const DashBoard = () => {

    // Sample data for each card
    const salesData = {
        title: 'Sales',
        filterOptions: ['Today', 'This Month', 'This Year'],
        value: '145',
        increasePercentage: '12%',
        period: 'Today',
    };

    const revenueData = {
        title: 'Revenue',
        filterOptions: ['Today', 'This Month', 'This Year'],
        value: '$3,264',
        increasePercentage: '8%',
        period: 'This Month',
    };

    const customersData = {
        title: 'Customers',
        filterOptions: ['Today', 'This Month', 'This Year'],
        value: '1244',
        increasePercentage: '12%',
        period: 'This Year',
    };



    const productsData = [
        {
            preview: "./logo/Logo.png",
            product: "Ut inventore ipsa voluptas nulla",
            price: "$64",
            sold: "124",
            revenue: "$5,828",
        },
        {
            preview: "assets/img/product-2.jpg",
            product: "Exercitationem similique doloremque",
            price: "$46",
            sold: "98",
            revenue: "$4,508",
        },
        {
            preview: "assets/img/product-3.jpg",
            product: "Doloribus nisi exercitationem",
            price: "$59",
            sold: "74",
            revenue: "$4,366",
        },
        {
            preview: "assets/img/product-4.jpg",
            product: "Officiis quaerat sint rerum error",
            price: "$32",
            sold: "63",
            revenue: "$2,016",
        },
        {
            preview: "assets/img/product-5.jpg",
            product: "Sit unde debitis delectus repellendus",
            price: "$79",
            sold: "41",
            revenue: "$3,239",
        },
    ];

    return (
        <>
            <AdminPageTitle CurrentPage={'Dashbord'} showButton={false} />
            <div className="dashboard">
                <div className="row">
                    {/* Sales Card */}
                    <InfoCard {...salesData} />

                    {/* Revenue Card */}
                    <InfoCard {...revenueData} />
                    {/* customerdata */}
                    <InfoCard {...customersData} />

                </div>
                {/* Customers Card */}
                <div className="card top-selling overflow-auto">
                    <div className="filter">
                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li className="dropdown-header text-start">
                                <h6>Filter</h6>
                            </li>
                            <li><a className="dropdown-item" href="#">Today</a></li>
                            <li><a className="dropdown-item" href="#">This Month</a></li>
                            <li><a className="dropdown-item" href="#">This Year</a></li>
                        </ul>
                    </div>
                    <div className="card-body pb-0">
                        <h5 className="card-title">Top Selling <span>| Today</span></h5>
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">Preview</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Sold</th>
                                    <th scope="col">Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productsData.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row"><a href="#"><img src={item.preview} alt="" /></a></th>
                                        <td><a href="#" className="text-primary fw-bold">{item.product}</a></td>
                                        <td>{item.price}</td>
                                        <td className="fw-bold">{item.sold}</td>
                                        <td>{item.revenue}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashBoard