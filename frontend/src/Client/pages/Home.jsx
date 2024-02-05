import React from 'react'
import Banner from '../components/banner/Banner'
import About from '../components/about/About'
import FeedBack from '../components/feedback/FeedBack'
import Gallery from '../components/gallery/Gallery'


const Home = () => {

    return (
        <div>
            <Banner />
            <About />
            <FeedBack />
            <Gallery />
        </div>
    )
}

export default Home