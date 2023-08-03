import React from 'react'
import Header from '../parts/Header'
import Hero from '../parts/Home/Hero'
import Categories from '../parts/Home/Categories'
import AnimeList from '../parts/Home/AnimeList'

const Home = () => {
    return (
        <>
            <Header theme="white" position="absolute" />
            <Hero />
            <Categories />
            <AnimeList />
        </>
    )
}

export default Home