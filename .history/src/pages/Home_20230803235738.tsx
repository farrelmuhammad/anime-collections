import React from 'react'
import Header from '../parts/Header'
import Hero from '../parts/Home/Hero'
import Categories from '../parts/Home/Categories'

const Home = () => {
    return (
        <>
            <Header theme="white" position="absolute" />
            <Hero />
            <Categories />
        </>
    )
}

export default Home