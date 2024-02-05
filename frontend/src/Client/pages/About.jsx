import React from 'react'
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs'

import Aboutus from '../components/about/About'

const pageTitle = 'About'
const About = () => {

    return (
        <div>
            <Breadcrumbs currentPage={pageTitle} />
            <Aboutus />
        </div>
    )
}

export default About