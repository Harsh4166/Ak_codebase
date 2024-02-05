import React from 'react'
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs'


import Gallerys from '../components/gallery/Gallery'
const pageTitle = 'Gallery'

const Gallery = () => {
    return (
        <>
            <Breadcrumbs currentPage={pageTitle} />
            <Gallerys />
        </>
    )
}

export default Gallery