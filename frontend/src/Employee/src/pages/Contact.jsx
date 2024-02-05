import React from 'react'
import AdminPageTitle from '../components/pageTitle/PageTitle'

const Contact = () => {
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
            <AdminPageTitle CurrentPage={'Contact data'} showButton={false} />

            {/* Customers Card */}
            <div className="card top-selling overflow-auto">
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
                                    <th scope="row">
                                        <a href="#"><img src={item.preview} alt="" /></a>
                                    </th>
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
        </>
    )
}

export default Contact